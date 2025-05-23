import { format, addMinutes, isBefore, differenceInMinutes, isAfter } from 'date-fns';
import { getCurrentLocation, LocationData } from './locationService';

// Calculate prayer times based on location and other parameters
export async function calculatePrayerTimes(
  date: Date, 
  latitude?: number, 
  longitude?: number,
  calculationMethod: string = 'Karachi',
  asrJuristic: string = 'Hanafi'
): Promise<Record<string, Date>> {
  let lat = latitude;
  let lng = longitude;
  
  // If latitude and longitude are not provided, get them from location service
  if (lat === undefined || lng === undefined) {
    try {
      const location = await getCurrentLocation();
      lat = location.latitude;
      lng = location.longitude;
    } catch (error) {
      console.error('Failed to get location for prayer times calculation:', error);
      // Use default coordinates for Karachi
      lat = 24.8607;
      lng = 67.0011;
    }
  }
  
  // Attempt to use Aladhan API for accurate prayer times
  try {
    const prayerTimes = await fetchPrayerTimesFromAPI(date, lat, lng, calculationMethod, asrJuristic);
    return prayerTimes;
  } catch (error) {
    console.error('Failed to fetch prayer times from API, using local calculation:', error);
    // Fall back to local calculation method
    return calculatePrayerTimesLocally(date, lat, lng, calculationMethod, asrJuristic);
  }
}

// Fetch prayer times from Aladhan API
async function fetchPrayerTimesFromAPI(
  date: Date,
  latitude: number,
  longitude: number,
  calculationMethod: string,
  asrJuristic: string
): Promise<Record<string, Date>> {
  // Map our calculationMethod to Aladhan API method
  const methodMap: Record<string, number> = {
    'Karachi': 1,      // Karachi
    'ISNA': 2,         // ISNA
    'MWL': 3,          // Muslim World League
    'Makkah': 4,       // Umm al-Qura, Makkah
    'Egyptian': 5,     // Egyptian General Authority
    'Tehran': 7,       // Institute of Geophysics, Tehran
    'Jafari': 0,       // Shia Ithna-Ashari, Leva Research Institute, Qum
    'Kuwait': 9,       // Kuwait
    'Qatar': 10,       // Qatar
    'Singapore': 11,   // Singapore
  };
  
  // Map asrJuristic to Aladhan API format
  const asrJuristicMap: Record<string, number> = {
    'Shafii': 0,       // Shafii, Maliki, Hambali (Standard, shadow = 1x object)
    'Maliki': 0,       // Same as Shafii
    'Hanbali': 0,      // Same as Shafii
    'Hanafi': 1        // Hanafi (shadow = 2x object)
  };
  
  const method = methodMap[calculationMethod] || 1; // Default to Karachi method
  const school = asrJuristicMap[asrJuristic] || 0;  // Default to Shafii
  
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  
  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`
  );
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.code !== 200 || data.status !== 'OK') {
    throw new Error('Invalid response from API');
  }
  
  const timings = data.data.timings;
  
  // Parse times from API (format: "HH:MM" in 24-hour format)
  return {
    fajr: parseTimeString(timings.Fajr, date),
    sunrise: parseTimeString(timings.Sunrise, date),
    dhuhr: parseTimeString(timings.Dhuhr, date),
    asr: parseTimeString(timings.Asr, date),
    maghrib: parseTimeString(timings.Maghrib, date),
    isha: parseTimeString(timings.Isha, date),
  };
}

// Parse time string from Aladhan API (format: "HH:MM" or "HH:MM (GMT+X)")
function parseTimeString(timeString: string, date: Date): Date {
  // Extract just the time part (remove timezone info if present)
  const timePart = timeString.split(' ')[0];
  const [hours, minutes] = timePart.split(':').map(Number);
  
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

// Fallback calculation method if API fails
function calculatePrayerTimesLocally(
  date: Date, 
  latitude: number, 
  longitude: number,
  calculationMethod: string = 'Karachi',
  asrJuristic: string = 'Hanafi'
): Record<string, Date> {
  const baseDate = new Date(date);
  baseDate.setHours(0, 0, 0, 0);
  
  // Apply adjustments based on calculation method
  let fajrAdjustment = 0;
  let asrAdjustment = 0;
  let ishaAdjustment = 0;
  
  // Different calculation methods have different angles for Fajr and Isha
  switch(calculationMethod) {
    case 'ISNA':
      fajrAdjustment = -15;  // earlier
      ishaAdjustment = -15;  // earlier
      break;
    case 'MWL':
      fajrAdjustment = 5;    // later
      ishaAdjustment = -10;  // earlier
      break;
    case 'Egyptian':
      fajrAdjustment = 10;   // later
      ishaAdjustment = 5;    // later
      break;
    case 'Jafari':
      fajrAdjustment = 15;   // later
      ishaAdjustment = 15;   // later
      break;
    case 'Makkah':
      fajrAdjustment = 5;    // Using 18.5° for Fajr, 90 min after Maghrib for Isha
      ishaAdjustment = 20;   // later (fixed time after Maghrib)
      break;
    case 'Kuwait':
      fajrAdjustment = 10;   // Using 18° for Fajr, 17.5° for Isha
      ishaAdjustment = -5;   // earlier
      break;
    case 'Qatar':
      fajrAdjustment = 15;   // later
      ishaAdjustment = 10;   // later
      break;
    case 'Singapore':
      fajrAdjustment = -10;  // earlier (20° for Fajr)
      ishaAdjustment = -10;  // earlier (18° for Isha)
      break;
    case 'Tehran':
      fajrAdjustment = 12;   // Using 17.7° for Fajr, 14° for Isha
      ishaAdjustment = 8;    // later
      break;
    // Default is Karachi method (18° for Fajr, 18° for Isha)
  }
  
  // Asr juristic method affects Asr time calculation
  switch(asrJuristic) {
    case 'Shafii':
    case 'Maliki':
    case 'Hanbali':
      asrAdjustment = -30;  // Earlier for Shafii, Maliki and Hanbali (shadow = 1x object height)
      break;
    case 'Hanafi':
      asrAdjustment = 0;    // Later for Hanafi (shadow = 2x object height)
      break;
  }
  
  // Apply latitude-based adjustments (simplistic)
  const latitudeAdjustment = Math.abs(latitude) > 45 ? 30 : 0; // Adjust for high latitudes
  
  return {
    fajr: addMinutes(baseDate, 5 * 60 + 30 + fajrAdjustment - latitudeAdjustment),     
    sunrise: addMinutes(baseDate, 6 * 60 + 45),    
    dhuhr: addMinutes(baseDate, 13 * 60 + 30),     
    asr: addMinutes(baseDate, 16 * 60 + 45 + asrAdjustment),      
    maghrib: addMinutes(baseDate, 19 * 60 + 15),   
    isha: addMinutes(baseDate, 20 * 60 + 45 + ishaAdjustment + latitudeAdjustment),    
  };
}

export function getNextPrayer(prayerTimes: Record<string, Date>, currentTime: Date) {
  const prayers = Object.entries(prayerTimes);
  
  for (const [name, time] of prayers) {
    if (isBefore(currentTime, time)) {
      const timeRemaining = differenceInMinutes(time, currentTime);
      const hours = Math.floor(timeRemaining / 60);
      const minutes = timeRemaining % 60;
      
      let remainingText;
      if (hours > 0) {
        remainingText = `${hours}h ${minutes}m remaining`;
      } else {
        remainingText = `${minutes} minutes remaining`;
      }
      
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        time: format(time, 'hh:mm a'),
        remaining: remainingText
      };
    }
  }
  
  // If no next prayer found today, return first prayer of next day
  return {
    name: 'Fajr',
    time: format(prayerTimes.fajr, 'hh:mm a'),
    remaining: 'Tomorrow'
  };
}

export function getCurrentPrayer(prayerTimes: Record<string, Date>, currentTime: Date) {
  const prayers = Object.entries(prayerTimes);
  
  // Sort prayers by time
  prayers.sort((a, b) => a[1].getTime() - b[1].getTime());
  
  // Find the current prayer - the prayer whose time has passed but the next one hasn't yet
  for (let i = 0; i < prayers.length - 1; i++) {
    const [currentName, currentPrayerTime] = prayers[i];
    const [nextName, nextTime] = prayers[i + 1];
    
    if (isAfter(currentTime, currentPrayerTime) && isBefore(currentTime, nextTime)) {
      return {
        name: currentName.charAt(0).toUpperCase() + currentName.slice(1),
        time: format(currentPrayerTime, 'hh:mm a')
      };
    }
  }
  
  // Check if the current time is after the last prayer of the day
  const lastPrayer = prayers[prayers.length - 1];
  if (isAfter(currentTime, lastPrayer[1])) {
    return {
      name: lastPrayer[0].charAt(0).toUpperCase() + lastPrayer[0].slice(1),
      time: format(lastPrayer[1], 'hh:mm a')
    };
  }
  
  // Check if the current time is before the first prayer of the day
  const firstPrayer = prayers[0];
  if (isBefore(currentTime, firstPrayer[1])) {
    return {
      name: prayers[prayers.length - 1][0].charAt(0).toUpperCase() + prayers[prayers.length - 1][0].slice(1),
      time: format(prayers[prayers.length - 1][1], 'hh:mm a')
    };
  }
  
  return null;
}