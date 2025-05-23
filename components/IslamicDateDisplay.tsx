import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HijriAdjustmentDialog from './HijriAdjustmentDialog';
import { useTheme } from '../context/ThemeContext';

interface IslamicDateDisplayProps {
  hijriDate: string;
  gregorianDate: string;
  onAdjustmentChange?: () => void;
}

export default function IslamicDateDisplay({ 
  hijriDate, 
  gregorianDate,
  onAdjustmentChange 
}: IslamicDateDisplayProps) {
  const { theme } = useTheme();
  const [adjustmentDialogVisible, setAdjustmentDialogVisible] = useState(false);
  
  const handleAdjustmentChange = () => {
    if (onAdjustmentChange) {
      onAdjustmentChange();
    }
  };
  
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.hijriDate}>{hijriDate}</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.gregorianDate}>{gregorianDate}</Text>
        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => setAdjustmentDialogVisible(true)}
        >
          <MaterialCommunityIcons name="calendar-edit" size={16} color="white" />
        </TouchableOpacity>
      </View>
      
      <HijriAdjustmentDialog
        visible={adjustmentDialogVisible}
        onClose={() => setAdjustmentDialogVisible(false)}
        onAdjustmentChange={handleAdjustmentChange}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
    position: 'relative',
  },
  hijriDate: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    color: 'white',
    marginHorizontal: 8,
    opacity: 0.7,
  },
  gregorianDate: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  adjustButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  }
});