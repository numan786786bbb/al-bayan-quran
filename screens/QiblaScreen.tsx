import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import analytics from '../utils/analytics';
import QiblaCompass from '../components/QiblaCompass';
import BottomNavigation from '../components/BottomNavigation';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import { useSettings } from '../context/SettingsContext';
import { format } from 'date-fns';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';

export default function QiblaScreen({ navigation }: any) {
  const { settings } = useSettings();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Track screen view
  useEffect(() => {
    analytics.trackScreenView('Qibla');
    analytics.trackFeatureUsage('Qibla Compass');

    // Simulate loading for 1 second (in real app, you'd get actual location)
    const timer = setTimeout(() => {
      setLocationPermission(true);
      setLocation({
        latitude: 37.7749, // San Francisco (mock location)
        longitude: -122.4194
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Hijri date
  const hijriDateObj = getHijriDate(currentTime);
  const hijriDate = formatHijriDate(hijriDateObj);
  const gregorianDate = format(currentTime, 'MMMM d, yyyy');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#2A8C4A', '#206238']}
          style={styles.header}
        >
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=islamic%20geometric%20pattern%20with%20arabesques%20in%20green%20and%20gold&aspect=16:9' }}
            style={styles.headerImage}
          />
          
          <View style={styles.headerControls}>
            <TouchableOpacity 
              style={styles.calendarButton}
              onPress={() => navigation.navigate('Calendar')}
            >
              <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=dawateislami%20logo%20with%20green%20color%20islamic%20symbol&aspect=1:1' }}
              style={styles.logo}
            /><Text style={styles.appTitle}>Al-Bayan Quran</Text>
          </View>
          
          <IslamicDateDisplay 
            hijriDate={hijriDate}
            gregorianDate={gregorianDate}
          />
          
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="compass" size={24} color="white" />
            <Text style={styles.screenTitle}>Qibla Direction</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <MaterialCommunityIcons name="cog" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.compassContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2A8C4A" />
              <Text style={styles.loadingText}>Locating your position...</Text>
            </View>
          ) : !locationPermission ? (
            <View style={styles.permissionContainer}>
              <MaterialCommunityIcons name="map-marker-off" size={60} color="#2A8C4A" />
              <Text style={styles.permissionTitle}>Location Access Required</Text>
              <Text style={styles.permissionText}>
                Please grant location permission to find Qibla direction accurately.
              </Text>
              <TouchableOpacity style={styles.permissionButton}>
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <QiblaCompass location={location} />
              
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionsTitle}>How to Use the Qibla Compass</Text>
                <View style={styles.instructionRow}>
                  <MaterialCommunityIcons name="gesture-swipe" size={24} color="#2A8C4A" />
                  <Text style={styles.instructionText}>
                    Hold your phone flat and level for the most accurate reading
                  </Text>
                </View>
                <View style={styles.instructionRow}>
                  <MaterialCommunityIcons name="gesture-two-double-tap" size={24} color="#2A8C4A" />
                  <Text style={styles.instructionText}>
                    Move your phone in a figure 8 pattern to calibrate if needed
                  </Text>
                </View>
                <View style={styles.instructionRow}>
                  <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#2A8C4A" />
                  <Text style={styles.instructionText}>
                    Stay away from electronic devices or metal objects for better accuracy
                  </Text>
                </View>
              </View>

              <View style={styles.kabaInfoCard}>
                <Image
                  source={{ uri: 'https://api.a0.dev/assets/image?text=kaaba%20in%20mecca%20at%20night%20with%20pilgrims&aspect=16:9' }}
                  style={styles.kabaImage}
                />
                <View style={styles.kabaTextContainer}>
                  <Text style={styles.kabaTitle}>The Holy Kaaba</Text>
                  <Text style={styles.kabaText}>
                    Located in Mecca, Saudi Arabia, the Kaaba is the most sacred site in Islam. Muslims around the world face the Kaaba during prayer.
                  </Text>
                  <Text style={styles.kabaCoordinates}>
                    Coordinates: 21.4225° N, 39.8262° E
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <BottomNavigation
        currentRoute="qibla"
        onChangeRoute={(route) => {
          if (route === 'home') {
            navigation.navigate('Home' as never);
          } else if (route === 'prayerTimes') {
            navigation.navigate('PrayerTimes' as never);
          } else if (route === 'quran') {
            navigation.navigate('Quran' as never);
          } else if (route === 'duas') {
            navigation.navigate('Duas' as never);
          } else if (route === 'allahNames') {
            navigation.navigate('AllahNames' as never);
          } else if (route === 'muhammadNames') {
            navigation.navigate('MuhammadNames' as never);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  headerControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  appTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassContainer: {
    padding: 16,
  },
  loadingContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  permissionContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2A8C4A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
    flex: 1,
  },
  kabaInfoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kabaImage: {
    width: '100%',
    height: 180,
  },
  kabaTextContainer: {
    padding: 16,
  },
  kabaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  kabaText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  kabaCoordinates: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A8C4A',
  },
});