import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface BottomNavigationProps {
  currentRoute: string;
  onChangeRoute: (route: string) => void;
}

export default function BottomNavigation({ currentRoute, onChangeRoute }: BottomNavigationProps) {
  const routes = [
    { name: 'home', icon: 'home', label: 'Home' },
    { name: 'prayerTimes', icon: 'mosque', label: 'Prayer Times' },
    { name: 'duas', icon: 'hands-pray', label: 'Duas' },
    { name: 'allahNames', icon: 'star', label: 'Allah Names' },
    { name: 'muhammadNames', icon: 'star-crescent', label: 'Prophet ﷺ' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {routes.map((route) => (
          <TouchableOpacity
            key={route.name}
            style={[
              styles.tab,
              currentRoute === route.name && styles.activeTab
            ]}
            onPress={() => onChangeRoute(route.name)}
          >
            <MaterialCommunityIcons
              name={route.icon as any}
              size={24}
              color={currentRoute === route.name ? '#2A8C4A' : '#666'}
            />
            <Text style={[
              styles.label,
              { color: currentRoute === route.name ? '#2A8C4A' : '#666' }
            ]}>
              {route.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  activeTab: {
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});