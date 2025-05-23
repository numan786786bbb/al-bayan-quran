import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IslamicEvent } from '../../utils/islamicEvents';
import { ISLAMIC_MONTHS_LIST } from '../../utils/hijriDate';

interface IslamicEventsListProps {
  events: IslamicEvent[];
}

export default function IslamicEventsList({ events }: IslamicEventsListProps) {
  // Sort events by month and day
  const sortedEvents = [...events].sort((a, b) => {
    if (a.hijriMonth === b.hijriMonth) {
      return a.hijriDay - b.hijriDay;
    }
    return a.hijriMonth - b.hijriMonth;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'holiday':
        return 'star-circle';
      case 'night':
        return 'moon-full';
      default:
        return 'calendar';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Islamic Events</Text>
      
      {sortedEvents.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <MaterialCommunityIcons
              name={getEventIcon(event.type)}
              size={24}
              color="#2A8C4A"
            />
            <Text style={styles.eventName}>{event.name}</Text>
          </View>
          
          <Text style={styles.date}>
            {event.hijriDay} {ISLAMIC_MONTHS_LIST[event.hijriMonth - 1]}
          </Text>
          
          {event.description && (
            <Text style={styles.description}>{event.description}</Text>
          )}
          
          <View style={[
            styles.typeBadge,
            { 
              backgroundColor: 
                event.type === 'holiday' ? '#e8f5e9' :
                event.type === 'night' ? '#e3f2fd' :
                '#f5f5f5'
            }
          ]}>
            <Text style={[
              styles.typeText,
              {
                color:
                  event.type === 'holiday' ? '#2A8C4A' :
                  event.type === 'night' ? '#1976d2' :
                  '#666'
              }
            ]}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});