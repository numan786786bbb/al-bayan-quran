import React, { useState, useEffect, useCallback } from 'react';
import analytics from '../utils/analytics';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import PrayerTimeCard from '../components/PrayerTimeCard';
import { WebView } from 'react-native-webview'; // ensure WebView is available
import NextPrayerBanner from '../components/NextPrayerBanner';
import BottomNavigation from '../components/BottomNavigation';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import LocationDisplay from '../components/LocationDisplay';
import FeedbackModal from '../components/FeedbackModal';
import { format } from 'date-fns';
import { calculatePrayerTimes, getNextPrayer, getCurrentPrayer } from '../utils/prayerTimes';
import { getCurrentLocation, LocationData } from '../utils/locationService';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { settings } = useSettings();
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRoute, setCurrentRoute] = useState('prayers');
  const [showFeedback, setShowFeedback] = useState(false);
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
    analytics.trackScreenView('Home');
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
              style={styles.calendarButton}
              onPress={() => navigation.navigate('Calendar')}
            >
              <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <MaterialCommunityIcons name="cog" size={24} color="white" />
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
            onAdjustmentChange={() => {
              // Refresh date calculations when adjustment changes
              setCurrentTime(new Date());
            }}
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

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('PrayerTimes')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="clock-outline" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Prayer Times</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('Quran')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="book-open-variant" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Quran</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('Qibla')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="compass" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Qibla</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('Duas')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="hands-pray" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Duas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('AllahNames')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="star" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Allah Names</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('MuhammadNames')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="star-crescent" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Muhammad ﷺ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('Calendar')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="calendar-month" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => navigation.navigate('Tasbih')}
            >
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="counter" size={24} color="#2A8C4A" />
              </View>
              <Text style={styles.featureText}>Tasbih</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <FeedbackModal visible={showFeedback} 
        onClose={() => setShowFeedback(false)} 
      />
      <BottomNavigation        currentRoute="home"        onChangeRoute={(route) => {
          if (route === 'prayerTimes') {
            navigation.navigate('PrayerTimes');
          } else if (route === 'quran') {
            navigation.navigate('Quran');          
          } else if (route === 'allahNames') {
            navigation.navigate('AllahNames');
          } else if (route === 'muhammadNames') {
            navigation.navigate('MuhammadNames');
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  calendarButton: {
    marginRight: 10,
  },
  settingsButton: {
    marginLeft: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});