import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import PrayerTimeCard from '../components/PrayerTimeCard';
import NextPrayerBanner from '../components/NextPrayerBanner';
import BottomNavigation from '../components/BottomNavigation';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import LocationDisplay from '../components/LocationDisplay';
import { format } from 'date-fns';
import { calculatePrayerTimes, getNextPrayer, getCurrentPrayer } from '../utils/prayerTimes';
import { getCurrentLocation, LocationData } from '../utils/locationService';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';
import analytics from '../utils/analytics';

export default function PrayerTimesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { settings } = useSettings();
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRoute, setCurrentRoute] = useState('prayers');
  const [prayerTimes, setPrayerTimes] = useState<Record<string, Date>>({
    fajr: new Date(),
    sunrise: new Date(),
    dhuhr: new Date(),
    asr: new Date(),
    maghrib: new Date(),
    isha: new Date(),
  });
  const [location, setLocation] = useState<LocationData>({
    error: null,
    latitude: 0,
    longitude: 0,
    altitude: null,
    accuracy: 0,
    city: 'Unknown',
    country: 'Unknown',
    loading: true
  });
  const [refreshing, setRefreshing] = useState(false);

  // Track screen view
  useEffect(() => {
    analytics.trackScreenView('Prayer Times');
  }, []);

  // Track prayer time views
  const trackPrayerView = useCallback((prayerName: string) => {
    analytics.trackPrayerTime(prayerName);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Load prayer times and location
  const loadPrayerTimes = useCallback(async () => {
    try {
      // Get location
      const locationData = await getCurrentLocation();
      setLocation(locationData);
      
      // Calculate prayer times based on location
      const times = await calculatePrayerTimes(
        currentTime, 
        locationData.latitude, 
        locationData.longitude, 
        settings.prayerTimes.calculationMethod,
        settings.prayerTimes.asrJuristic
      );
      
      setPrayerTimes(times);
    } catch (error) {
      console.error('Error fetching location or prayer times:', error);
      Alert.alert(
        'Error',
        'Failed to update prayer times. Using default values.'
      );
      
      // Fall back to default calculation without location
      const times = await calculatePrayerTimes(
        currentTime, 
        undefined, 
        undefined, 
        settings.prayerTimes.calculationMethod,
        settings.prayerTimes.asrJuristic
      );
      
      setPrayerTimes(times);
    } finally {
      setRefreshing(false);
    }
  }, [currentTime, settings.prayerTimes.calculationMethod, settings.prayerTimes.asrJuristic]);

  // Load prayer times on component mount and when settings change
  useEffect(() => {
    loadPrayerTimes();
  }, [loadPrayerTimes]);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPrayerTimes();
  }, [loadPrayerTimes]);

  // Calculate next prayer
  const nextPrayer = getNextPrayer(prayerTimes, currentTime);
  const currentPrayer = getCurrentPrayer(prayerTimes, currentTime);

  // Calculate Hijri date
  const hijriDateObj = getHijriDate(currentTime);
  const hijriDate = formatHijriDate(hijriDateObj);
  const gregorianDate = format(currentTime, 'MMMM d, yyyy');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LinearGradient
          colors={[theme.colors.headerGradientStart, theme.colors.headerGradientEnd]}
          style={styles.header}
        >
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=islamic%20geometric%20pattern%20with%20arabesques%20in%20green%20and%20gold&aspect=16:9' }}
            style={styles.headerImage}
          />
          
          <View style={styles.headerControls}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings' as never)}
            >
              <MaterialCommunityIcons name="cog" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="white" />
            <Text style={styles.screenTitle}>Prayer Times</Text>
          </View>
          
          <IslamicDateDisplay 
            hijriDate={hijriDate}
            gregorianDate={gregorianDate}
          />
          <LocationDisplay 
            location={location}
            isLoading={location.loading}
            onLocationUpdated={loadPrayerTimes}
          />
          
          <Text style={styles.time}>
            {format(currentTime, 'hh:mm a')}
          </Text>
        </LinearGradient>

        <NextPrayerBanner nextPrayer={nextPrayer} />
        <View style={styles.prayerTimesContainer}>
          <Text style={styles.sectionTitle}>Daily Prayer Times</Text>
          {Object.entries(prayerTimes).map(([name, time]) => {
            const isCurrentPrayer = currentPrayer && currentPrayer.name.toLowerCase() === name;
            return (
              <PrayerTimeCard
                key={name}
                name={name.charAt(0).toUpperCase() + name.slice(1)}
                time={format(time, 'hh:mm a')}
                icon={
                  name === 'fajr' ? 'weather-night' :
                  name === 'sunrise' ? 'weather-sunny' :
                  name === 'dhuhr' ? 'white-balance-sunny' :
                  name === 'asr' ? 'weather-partly-cloudy' :
                  name === 'maghrib' ? 'weather-sunset' :
                  'weather-night'
                }
                isActive={isCurrentPrayer}
              />
            );
          })}

          <View style={styles.dawahSection}>
            <Text style={styles.sectionTitle}>Dawah e Kubra</Text>
            <View style={styles.dawahCard}>
              <View style={styles.dawahIconContainer}>
                <MaterialCommunityIcons name="account-group" size={32} color="#2A8C4A" />
              </View>
              <View style={styles.dawahContent}>
                <Text style={styles.dawahTitle}>Daily Islamic Reminder</Text>
                <Text style={styles.dawahDescription}>
                  Spread the message of Islam by sharing a daily reminder with friends and family.
                  The Prophet ﷺ said: "Convey from me, even if it is one verse."
                </Text>
                <TouchableOpacity 
                  style={styles.dawahButton}
                  onPress={() => {
                    Alert.alert(
                      'Success',
                      'Started Dawah e Kubra activity!'
                    );
                    analytics.trackFeatureUsage('Dawah e Kubra');
                  }}
                >
                  <Text style={styles.dawahButtonText}>Start Dawah Activity</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation
        currentRoute="prayerTimes"
        onChangeRoute={(route) => {
          if (route === 'home') {
            navigation.navigate('Home');
          } else if (route === 'quran') {
            navigation.navigate('Quran' as never);          
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
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  time: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  prayerTimesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A8C4A',
    marginBottom: 16,
  },
  dawahSection: {
    marginTop: 24,
  },
  dawahCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2A8C4A',
  },
  dawahIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dawahContent: {
    flex: 1,
  },
  dawahTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dawahDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  dawahButton: {
    backgroundColor: '#2A8C4A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  dawahButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});