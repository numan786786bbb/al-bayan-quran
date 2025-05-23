/**
 * Calculate Qibla direction based on user's location
 * 
 * This function calculates the direction to the Kaaba (Qibla) in Mecca
 * from the user's current location using spherical trigonometry.
 * 
 * @param userLat User's latitude in decimal degrees
 * @param userLng User's longitude in decimal degrees
 * @returns Qibla direction in degrees from true north (0-360)
 */
export function calculateQiblaDirection(userLat: number, userLng: number): number {
  // Coordinates of the Kaaba in Mecca
  const kaabaLat = 21.4225; // latitude in decimal degrees
  const kaabaLng = 39.8262; // longitude in decimal degrees
  
  // Convert all angles from degrees to radians for trigonometric functions
  const userLatRad = (userLat * Math.PI) / 180;
  const kaabaLatRad = (kaabaLat * Math.PI) / 180;
  const longDiffRad = ((kaabaLng - userLng) * Math.PI) / 180;
  
  // Calculate Qibla direction using the spherical law of cosines
  const y = Math.sin(longDiffRad);
  const x = Math.cos(userLatRad) * Math.tan(kaabaLatRad) - 
            Math.sin(userLatRad) * Math.cos(longDiffRad);
  
  // Calculate the angle in radians
  let qiblaRad = Math.atan2(y, x);
  
  // Convert radians to degrees
  let qiblaDeg = (qiblaRad * 180) / Math.PI;
  
  // Normalize to 0-360 degrees
  if (qiblaDeg < 0) {
    qiblaDeg += 360;
  }
  
  // Apply magnetic declination correction if available
  // In a production app, you would get this from an API or calculate it
  // const magneticDeclination = getMagneticDeclination(userLat, userLng);
  // return (qiblaDeg + magneticDeclination) % 360;
  
  return qiblaDeg;
}

/**
 * Calculate the distance to Kaaba in kilometers
 * 
 * Uses the Haversine formula to calculate great-circle distance
 * between two points on a sphere (Earth)
 * 
 * @param userLat User's latitude in decimal degrees
 * @param userLng User's longitude in decimal degrees
 * @returns Distance in kilometers
 */
export function calculateDistanceToKaaba(userLat: number, userLng: number): number {
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  const earthRadius = 6371; // Earth's radius in kilometers
  
  const dLat = ((kaabaLat - userLat) * Math.PI) / 180;
  const dLng = ((kaabaLng - userLng) * Math.PI) / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) * 
    Math.cos((kaabaLat * Math.PI) / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  
  return distance;
}