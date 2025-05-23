import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { calculateQiblaDirection } from '../utils/qiblaCalculation';

interface QiblaCompassProps {
  location: { latitude: number; longitude: number } | null;
}

export default function QiblaCompass({ location }: QiblaCompassProps) {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [accuracy, setAccuracy] = useState<'high' | 'medium' | 'low'>('medium');
  const [sensorAvailable, setSensorAvailable] = useState(true);
  
  const compassRotation = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;
  
  // Effect to calculate Qibla direction when location changes
  useEffect(() => {
    if (location) {
      const qiblaAngle = calculateQiblaDirection(location.latitude, location.longitude);
      setQiblaDirection(qiblaAngle);
    }
  }, [location]);
  
  // Effect to simulate compass sensor data (in a real app, you'd use expo-sensors)
  useEffect(() => {
    let lastHeading = 0;
    
    // In a real app, you'd use something like:
    // import { Magnetometer } from 'expo-sensors';
    // Magnetometer.setUpdateInterval(100);
    // const subscription = Magnetometer.addListener(data => {
    //   // Calculate heading from magnetometer data
    // });
    
    // For demo purposes, we'll simulate compass movement
    const simulateHeadingChanges = () => {
      // Simulate small random movements in the compass to make it look realistic
      const randomChange = (Math.random() - 0.5) * 5;
      const newHeading = (lastHeading + randomChange) % 360;
      lastHeading = newHeading;
      
      setHeading(newHeading);
      
      // Determine compass accuracy based on "stability" of readings
      // In a real app, this would be based on actual sensor confidence levels
      setAccuracy(
        Math.abs(randomChange) < 1 ? 'high' : 
        Math.abs(randomChange) < 3 ? 'medium' : 'low'
      );
      
      // Animate the compass rotation
      Animated.timing(compassRotation, {
        toValue: -newHeading,
        duration: 150,
        useNativeDriver: true,
      }).start();
      
      // Animate the Qibla arrow rotation (compass heading + qibla angle)
      Animated.timing(arrowRotation, {
        toValue: -newHeading + qiblaDirection,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };
    
    const interval = setInterval(simulateHeadingChanges, 200);
    
    return () => {
      clearInterval(interval);
      // In a real app: subscription.remove();
    };
  }, [qiblaDirection]);
  
  const compassRotationDegree = compassRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  
  const arrowRotationDegree = arrowRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  
  // Get accuracy color
  const getAccuracyColor = () => {
    switch (accuracy) {
      case 'high': return '#2A8C4A';
      case 'medium': return '#FFA500';
      case 'low': return '#FF4500';
      default: return '#FFA500';
    }
  };
  
  return (
    <View style={styles.container}>
      {!sensorAvailable ? (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="compass-off" size={50} color="#FF4500" />
          <Text style={styles.errorText}>
            Compass sensor not available on your device.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.compassHeaderContainer}>
            <View style={[styles.accuracyIndicator, { backgroundColor: getAccuracyColor() }]} />
            <Text style={styles.accuracyText}>
              Accuracy: {accuracy.charAt(0).toUpperCase() + accuracy.slice(1)}
            </Text>
            <Text style={styles.headingText}>{Math.round(heading)}°</Text>
          </View>
          
          <View style={styles.compassContainer}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=islamic%20style%20compass%20rose%20with%20intricate%20patterns&aspect=1:1' }}
              style={styles.compassBackground}
            />
            
            <Animated.View
              style={[
                styles.compassRoseContainer,
                { transform: [{ rotate: compassRotationDegree }] }
              ]}
            >
              <Image
                source={{ uri: 'https://api.a0.dev/assets/image?text=compass%20rose%20with%20cardinal%20directions%20N%20S%20E%20W%20transparent%20background&aspect=1:1' }}
                style={styles.compassRose}
              />
            </Animated.View>
            
            <View style={styles.centerDot} />
            
            <Animated.View
              style={[
                styles.qiblaArrowContainer,
                { transform: [{ rotate: arrowRotationDegree }] }
              ]}
            >
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={60}
                color="#2A8C4A"
                style={styles.qiblaArrow}
              />
              <Text style={styles.qiblaText}>Kaaba</Text>
            </Animated.View>
            
            <View style={styles.northIndicatorContainer}>
              <Text style={styles.northIndicator}>N</Text>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Qibla Direction: {Math.round(qiblaDirection)}° from North
            </Text>
            {location && (
              <Text style={styles.locationText}>
                Your Location: {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const compassSize = width - 80;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  compassHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  accuracyIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  accuracyText: {
    fontSize: 14,
    color: '#666',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  compassContainer: {
    width: compassSize,
    height: compassSize,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  compassBackground: {
    position: 'absolute',
    width: compassSize,
    height: compassSize,
    borderRadius: compassSize / 2,
    opacity: 0.1,
  },
  compassRoseContainer: {
    position: 'absolute',
    width: compassSize,
    height: compassSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassRose: {
    width: compassSize - 20,
    height: compassSize - 20,
    opacity: 0.85,
  },
  centerDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2A8C4A',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  qiblaArrowContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: compassSize,
    height: compassSize,
  },
  qiblaArrow: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: -10,
  },
  qiblaText: {
    color: '#2A8C4A',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 12,
    marginTop: -5,
  },
  northIndicatorContainer: {
    position: 'absolute',
    top: 5,
    alignItems: 'center',
  },
  northIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A8C4A',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});