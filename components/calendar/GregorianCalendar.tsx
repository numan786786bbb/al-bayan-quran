import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, addMonths, subMonths } from 'date-fns';

interface GregorianCalendarProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  markedDates?: Record<string, { marked: boolean; type?: string }>;
}

export default function GregorianCalendar({ 
  currentDate,
  onMonthChange,
  markedDates = {}
}: GregorianCalendarProps) {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    onMonthChange(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentDate, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getDayKey = (day: number) => {
    return format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      'yyyy-MM-dd'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#2A8C4A" />
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>
          {format(currentDate, 'MMMM yyyy')}
        </Text>
        
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#2A8C4A" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            {day && (
              <View style={styles.dayContainer}>
                <Text
                  style={[
                    styles.day,
                    isToday(day) && styles.today,
                  ]}
                >
                  {day}
                </Text>
                {markedDates[getDayKey(day)]?.marked && (
                  <View 
                    style={[
                      styles.eventDot,
                      { backgroundColor: markedDates[getDayKey(day)]?.type === 'holiday' ? '#2A8C4A' : '#666' }
                    ]} 
                  />
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 4,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
    color: '#333',
  },
  today: {
    color: '#2A8C4A',
    fontWeight: 'bold',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
});