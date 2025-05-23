import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the location data structure
export interface LocationData {
  error: string | null;
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  city: string;
  country: string;
  loading: boolean;
  isCustomLocation?: boolean;
}

// Keys for storing custom location
const CUSTOM_LOCATION_KEY = 'custom_location';

// Default location (fallback for Karachi, Pakistan if location service fails)
const DEFAULT_LOCATION: LocationData = {
  error: null,
  latitude: 24.8607,
  longitude: 67.0011,
  altitude: null,
  accuracy: 0,
  city: 'Unknown',
  country: 'Unknown',
  loading: false
};

/**
 * Get the user's current location or custom location if set
 */
export async function getCurrentLocation(): Promise<LocationData> {
  try {
    // Check if there's a custom location stored
    const customLocationJson = await AsyncStorage.getItem(CUSTOM_LOCATION_KEY);
    if (customLocationJson) {
      const customLocation = JSON.parse(customLocationJson);
      return {
        ...customLocation,
        loading: false,
        isCustomLocation: true
      };
    }
    
    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      return {
        ...DEFAULT_LOCATION, 
        loading: false,
        error: 'Location permission denied'
      };
    }
    
    // Get current position with a timeout
    let location;
    try {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000
      });
    } catch (error) {
      console.log('Error getting precise location, using last known location');
      location = await Location.getLastKnownPositionAsync();
      
      if (!location) {
        throw new Error('Could not get location');
      }
    }
    
    // Extract relevant location data
    const { latitude, longitude, altitude, accuracy } = location.coords;
    
    // Perform reverse geocoding to get city and country
    const geocode = await reverseGeocode(latitude, longitude);
    
    return {
      error: null,
      latitude,
      longitude,
      altitude,
      accuracy,
      city: geocode.city,
      country: geocode.country,
      loading: false
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      ...DEFAULT_LOCATION,
      loading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Save a custom location
 */
export async function saveCustomLocation(location: Partial<LocationData>): Promise<void> {
  try {
    const locationToSave = {
      ...location,
      error: null,
      loading: false,
    };
    await AsyncStorage.setItem(CUSTOM_LOCATION_KEY, JSON.stringify(locationToSave));
  } catch (error) {
    console.error('Error saving custom location:', error);
    throw error;
  }
}

/**
 * Clear the custom location and use device location
 */
export async function clearCustomLocation(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CUSTOM_LOCATION_KEY);
  } catch (error) {
    console.error('Error clearing custom location:', error);
    throw error;
  }
}

/**
 * Get location by searching a city name
 */
export async function searchLocation(query: string): Promise<LocationData[]> {  try {
    // Return pre-defined major cities for offline use
    const offlineCities = [
      {
        error: null,
        latitude: 21.4225,
        longitude: 39.8262,
        altitude: null,
        accuracy: 0,
        city: "Makkah",
        country: "Saudi Arabia",
        loading: false
      },
      {
        error: null,
        latitude: 24.7136,
        longitude: 46.6753,
        altitude: null,
        accuracy: 0,
        city: "Riyadh",
        country: "Saudi Arabia",
        loading: false
      },
      {
        error: null,
        latitude: 24.8607,
        longitude: 67.0011,
        altitude: null,
        accuracy: 0,
        city: "Karachi",
        country: "Pakistan",
        loading: false
      },
      // Add more major Islamic cities as needed
    ];

    // Filter cities based on search query
    const filteredCities = offlineCities.filter(city => 
      city.city.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    );
    
    return data.map((item: any) => ({
      error: null,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      altitude: null,
      accuracy: 0,
      city: item.name,
      country: item.display_name.split(', ').pop() || 'Unknown',
      loading: false
    }));
  } catch (error) {
    console.error('Error in location search:', error);
    return [];
  }
}

/**
 * Convert coordinates to a readable address using Nominatim (OpenStreetMap)
 */
async function reverseGeocode(latitude: number, longitude: number): Promise<{city: string, country: string}> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
      {
        headers: {
          'User-Agent': 'DawateislamiPrayerTimesApp'
        }
      }
    );
    
    const data = await response.json();
    
    return {
      city: data.address?.city || 
            data.address?.town || 
            data.address?.village || 
            data.address?.county ||
            'Unknown',
      country: data.address?.country || 'Unknown'
    };
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return {
      city: 'Unknown',
      country: 'Unknown'
    };
  }
}