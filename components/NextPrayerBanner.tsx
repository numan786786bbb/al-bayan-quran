import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NextPrayerBannerProps {
  nextPrayer?: {
    name?: string;
    time?: string;
    remaining?: string;
  };
}

export default function NextPrayerBanner({ nextPrayer }: NextPrayerBannerProps) {
  if (!nextPrayer || !nextPrayer.name || !nextPrayer.time || !nextPrayer.remaining) {
    return null;
  }
  return (
    <LinearGradient
      colors={['#2A8C4A', '#1C704A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="clock-outline" size={28} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nextPrayerText}>Next Prayer</Text>
          <Text style={styles.prayerName}>{nextPrayer.name}</Text>
          <View style={styles.remainingContainer}>
            <MaterialCommunityIcons name="timer-outline" size={16} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.timeRemaining}>{nextPrayer.remaining}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{nextPrayer.time}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nextPrayerText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  prayerName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeRemaining: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginLeft: 4,
  },
  timeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  time: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});