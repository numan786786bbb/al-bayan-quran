import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SwitchSettingItemProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  description?: string;
  disabled?: boolean;
}

export default function SwitchSettingItem({
  label,
  value,
  onValueChange,
  description,
  disabled = false
}: SwitchSettingItemProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.colors.divider
      },
      disabled && styles.disabled
    ]}>
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: theme.colors.primaryText }]}>{label}</Text>
        {description && <Text style={[styles.description, { color: theme.colors.secondaryText }]}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#D9D9D9', true: `${theme.colors.primary}80` }} // 80 adds 50% opacity
        thumbColor={value ? theme.colors.primary : theme.isDark ? '#888' : '#F4F3F4'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  disabled: {
    opacity: 0.6,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});