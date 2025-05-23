import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import SettingsSection from '../components/settings/SettingsSection';
import SwitchSettingItem from '../components/settings/SwitchSettingItem';
import SelectionSettingItem from '../components/settings/SelectionSettingItem';
import analytics from '../utils/analytics';

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { 
    settings, 
    updatePrayerTimeSettings, 
    updateNotificationSettings, 
    updateAppearanceSettings, 
    updateLanguageSettings 
  } = useSettings();
  const { theme } = useTheme();

  useEffect(() => {
    analytics.trackScreenView('Settings');
  }, []);  // Prayer calculation methods
  const calculationMethods = [
    { label: 'Karachi', value: 'Karachi' },
    { label: 'ISNA (North America)', value: 'ISNA' },
    { label: 'Muslim World League', value: 'MWL' },
    { label: 'Egyptian General Authority', value: 'Egyptian' },
    { label: 'Jafari', value: 'Jafari' },
    { label: 'Tehran', value: 'Tehran' },
    { label: 'Makkah (Umm al-Qura)', value: 'Makkah' },
    { label: 'Kuwait', value: 'Kuwait' },
    { label: 'Qatar', value: 'Qatar' },
    { label: 'Singapore', value: 'Singapore' },
  ];

  // Asr juristic methods
  const asrJuristicMethods = [
    { label: 'Hanafi', value: 'Hanafi' },
    { label: 'Shafii', value: 'Shafii' },
    { label: 'Maliki', value: 'Maliki' },
    { label: 'Hanbali', value: 'Hanbali' },
  ];

  // Adhan sounds
  const adhanSounds = [
    { label: 'Makkah', value: 'Makkah' },
    { label: 'Madinah', value: 'Madinah' },
    { label: 'Dawateislami', value: 'Dawateislami' },
  ];

  // Time formats
  const timeFormats = [
    { label: '12-hour (AM/PM)', value: '12h' },
    { label: '24-hour', value: '24h' },
  ];

  // Themes
  const themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System Default', value: 'system' },
  ];

  // Languages
  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Urdu', value: 'Urdu' },
    { label: 'Arabic', value: 'Arabic' },
  ];

  // Before prayer reminder times
  const reminderTimes = [
    { label: '5 minutes', value: '5' },
    { label: '10 minutes', value: '10' },
    { label: '15 minutes', value: '15' },
    { label: '30 minutes', value: '30' },
  ];
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            try {
              navigation.goBack();
            } catch (error) {
              // Fallback if goBack fails
              navigation.navigate('Home');
            }
          }}
          accessibilityLabel="Back button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primaryText }]}>Settings</Text>
        <View style={styles.emptySpace} />
      </View>

      <ScrollView style={styles.scrollView}>
        <SettingsSection title="Prayer Time Settings">
          <SelectionSettingItem
            label="Calculation Method"
            selectedValue={settings.prayerTimes.calculationMethod}
            options={calculationMethods}
            onValueChange={(value) => 
              updatePrayerTimeSettings({ calculationMethod: value as any })
            }
            description="Method used to calculate prayer times"
          />
          <SelectionSettingItem
            label="Asr Juristic Method"
            selectedValue={settings.prayerTimes.asrJuristic}
            options={asrJuristicMethods}
            onValueChange={(value) => 
              updatePrayerTimeSettings({ asrJuristic: value as any })
            }
            description="Hanafi or Shafii"
          />
        </SettingsSection>

        <SettingsSection title="Notification Settings">
          <SwitchSettingItem
            label="Enable Notifications"
            value={settings.notifications.enabled}
            onValueChange={(value) => 
              updateNotificationSettings({ enabled: value })
            }
            description="Master switch for all prayer notifications"
          />
          
          <SwitchSettingItem
            label="Fajr Notification"
            value={settings.notifications.fajr}
            onValueChange={(value) => 
              updateNotificationSettings({ fajr: value })
            }
            disabled={!settings.notifications.enabled}
          />
          
          <SwitchSettingItem
            label="Dhuhr Notification"
            value={settings.notifications.dhuhr}
            onValueChange={(value) => 
              updateNotificationSettings({ dhuhr: value })
            }
            disabled={!settings.notifications.enabled}
          />
          
          <SwitchSettingItem
            label="Asr Notification"
            value={settings.notifications.asr}
            onValueChange={(value) => 
              updateNotificationSettings({ asr: value })
            }
            disabled={!settings.notifications.enabled}
          />
          
          <SwitchSettingItem
            label="Maghrib Notification"
            value={settings.notifications.maghrib}
            onValueChange={(value) => 
              updateNotificationSettings({ maghrib: value })
            }
            disabled={!settings.notifications.enabled}
          />
          
          <SwitchSettingItem
            label="Isha Notification"
            value={settings.notifications.isha}
            onValueChange={(value) => 
              updateNotificationSettings({ isha: value })
            }
            disabled={!settings.notifications.enabled}
          />
          
          <SelectionSettingItem
            label="Adhan Sound"
            selectedValue={settings.notifications.adhanSound}
            options={adhanSounds}
            onValueChange={(value) => 
              updateNotificationSettings({ adhanSound: value as any })
            }
            disabled={!settings.notifications.enabled}
          />
          
          <SwitchSettingItem
            label="Before Adhan Reminder"
            value={settings.notifications.preAdhanReminder}
            onValueChange={(value) => 
              updateNotificationSettings({ preAdhanReminder: value })
            }
            description="Receive a reminder before prayer time"
            disabled={!settings.notifications.enabled}
          />
          
          <SelectionSettingItem
            label="Reminder Time"
            selectedValue={settings.notifications.reminderTime.toString()}
            options={reminderTimes}
            onValueChange={(value) => 
              updateNotificationSettings({ reminderTime: parseInt(value) as any })
            }
            disabled={!settings.notifications.enabled || !settings.notifications.preAdhanReminder}
          />
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SelectionSettingItem
            label="Theme"
            selectedValue={settings.appearance.theme}
            options={themes}
            onValueChange={(value) => 
              updateAppearanceSettings({ theme: value as any })
            }
            description="App color theme"
          />
          
          <SelectionSettingItem
            label="Time Format"
            selectedValue={settings.appearance.timeFormat}
            options={timeFormats}
            onValueChange={(value) => 
              updateAppearanceSettings({ timeFormat: value as any })
            }
            description="12-hour or 24-hour format"
          />
        </SettingsSection>

        <SettingsSection title="Language">
          <SelectionSettingItem
            label="App Language"
            selectedValue={settings.language.language}
            options={languages}
            onValueChange={(value) => 
              updateLanguageSettings({ language: value as any })
            }
            description="Change app display language"
          />
        </SettingsSection>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Al-Bayan Quran</Text>
          <Text style={styles.versionNumber}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  emptySpace: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 14,
    color: '#999',
  },
});