import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import BottomNavigation from '../components/BottomNavigation';
import GregorianCalendar from '../components/calendar/GregorianCalendar';
import IslamicCalendar from '../components/calendar/IslamicCalendar';
import IslamicEventsList from '../components/calendar/IslamicEventsList';
import islamicEvents from '../utils/islamicEvents';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';
import analytics from '../utils/analytics';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; type?: string }>>({});

  // Track screen view
  useEffect(() => {
    analytics.trackScreenView('Calendar');
    analytics.trackFeatureUsage('Islamic Calendar');
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const hijriDate = getHijriDate(currentTime);
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
          
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=dawateislami%20logo%20with%20green%20color%20islamic%20symbol&aspect=1:1' }}
              style={styles.logo}
            />
            <Text style={styles.appTitle}>Al-Bayan Quran</Text>
          </View>
          
          <IslamicDateDisplay 
            hijriDate={formatHijriDate(hijriDate)}
            gregorianDate={gregorianDate}
            onAdjustmentChange={() => {
              // Refresh date calculations when adjustment changes
              setCurrentTime(new Date());
            }}
          />
          
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
            <Text style={styles.screenTitle}>Islamic Calendar</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings' as never)}
          >
            <MaterialCommunityIcons name="cog" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Gregorian Calendar</Text>
          <GregorianCalendar
            currentDate={currentDate}
            onMonthChange={setCurrentDate}
            markedDates={markedDates}
          />

          <Text style={styles.sectionTitle}>Islamic Calendar</Text>
          <IslamicCalendar
            currentDate={currentDate}
            onMonthChange={setCurrentDate}
            markedDates={markedDates}
          />

          <IslamicEventsList events={islamicEvents} />
        </View>
      </ScrollView>
      <BottomNavigation
        currentRoute="calendar"
        onChangeRoute={(route) => {
          if (route === 'home') {
            navigation.navigate('Home' as never);
          } else if (route === 'prayerTimes') {
            navigation.navigate('PrayerTimes' as never);
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A8C4A',
    marginBottom: 12,
  },
});