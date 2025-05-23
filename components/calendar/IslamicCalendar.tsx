import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHijriDate, ISLAMIC_MONTHS_LIST } from '../../utils/hijriDate';

interface IslamicCalendarProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  markedDates?: Record<string, { marked: boolean; type?: string }>;
}

export default function IslamicCalendar({
  currentDate,
  onMonthChange,
  markedDates = {}
}: IslamicCalendarProps) {
  const hijriDate = getHijriDate(currentDate);
  
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  // In a real app, you would calculate this based on proper Hijri calendar rules
  const daysInMonth = 30;
  const firstDayOfMonth = 5; // Mock value, should be calculated

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day: number) => {
    return day === hijriDate.day;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#2A8C4A" />
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>
          {`${ISLAMIC_MONTHS_LIST[hijriDate.month]} ${hijriDate.year}`}
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
                {markedDates[`${hijriDate.year}-${hijriDate.month + 1}-${day}`]?.marked && (
                  <View 
                    style={[
                      styles.eventDot,
                      { 
                        backgroundColor: markedDates[`${hijriDate.year}-${hijriDate.month + 1}-${day}`]?.type === 'holiday' 
                          ? '#2A8C4A' 
                          : '#666' 
                      }
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