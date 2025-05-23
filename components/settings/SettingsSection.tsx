import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>{title}</Text>
      <View style={[
        styles.content, 
        { 
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow
        }
      ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A8C4A',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});