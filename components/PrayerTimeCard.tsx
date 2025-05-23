import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface PrayerTimeCardProps {
  name: string;
  time: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isActive?: boolean | null;
}

export default function PrayerTimeCard({ name, time, icon, isActive = false }: PrayerTimeCardProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  return (
    <View style={[
      styles.card, 
      { 
        backgroundColor: isActive ? colors.prayerCardActiveBg : colors.surface,
        shadowColor: colors.shadow,
        borderLeftColor: isActive ? colors.primary : 'transparent',
      }
    ]}>
      <View style={[
        styles.iconContainer, 
        { 
          backgroundColor: isActive ? colors.primary : colors.primaryLight 
        }
      ]}>
        <MaterialCommunityIcons 
          name={icon} 
          size={22} 
          color={isActive ? 'white' : colors.primary} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[
          styles.prayerName, 
          { 
            color: isActive ? colors.primary : colors.primaryText 
          }
        ]}>{name}</Text>
        <Text style={[
          styles.time, 
          { 
            color: isActive ? colors.primary : colors.secondaryText 
          }
        ]}>{time}</Text>
      </View>
      {isActive && (
        <View style={[styles.activeIndicator, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.activeText, { color: colors.primary }]}>Current</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 2,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  prayerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    marginTop: 4,
  },
  activeIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '600',
  }
});