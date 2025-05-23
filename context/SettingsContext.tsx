import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for our settings
export interface PrayerTimeSettings {
  calculationMethod: 'Karachi' | 'ISNA' | 'MWL' | 'Egyptian' | 'Jafari' | 'Tehran' | 'Makkah' | 'Kuwait' | 'Qatar' | 'Singapore';
  asrJuristic: 'Shafii' | 'Hanafi' | 'Maliki' | 'Hanbali';
  adjustments: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

export interface NotificationSettings {
  enabled: boolean;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;  adhanSound: 'Makkah' | 'Madinah' | 'Dawateislami';
  preAdhanReminder: boolean;
  reminderTime: number; // minutes before prayer (5, 10, 15, or 30)
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  timeFormat: '12h' | '24h';
}

export interface LanguageSettings {
  language: 'English' | 'Urdu' | 'Arabic';
}

export interface AppSettings {
  prayerTimes: PrayerTimeSettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  language: LanguageSettings;
}

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  prayerTimes: {
    calculationMethod: 'Karachi',
    asrJuristic: 'Hanafi',
    adjustments: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  notifications: {
    enabled: true,
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    adhanSound: 'Makkah',
    preAdhanReminder: false,
    reminderTime: 15
  },
  appearance: {
    theme: 'light',
    timeFormat: '12h'
  },
  language: {
    language: 'English'
  }
};

// Keys for AsyncStorage
const SETTINGS_STORAGE_KEY = 'dawateislami_app_settings';

// Create context
interface SettingsContextValue {
  settings: AppSettings;
  updatePrayerTimeSettings: (newSettings: Partial<PrayerTimeSettings>) => void;
  updateNotificationSettings: (newSettings: Partial<NotificationSettings>) => void;
  updateAppearanceSettings: (newSettings: Partial<AppearanceSettings>) => void;
  updateLanguageSettings: (newSettings: Partial<LanguageSettings>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// Provider component
export const SettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from AsyncStorage on initial render
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    };

    if (!isLoading) {
      saveSettings();
    }
  }, [settings, isLoading]);

  // Update functions
  const updatePrayerTimeSettings = (newSettings: Partial<PrayerTimeSettings>) => {
    setSettings(prev => ({
      ...prev,
      prayerTimes: {
        ...prev.prayerTimes,
        ...newSettings
      }
    }));
  };

  const updateNotificationSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...newSettings
      }
    }));
  };

  const updateAppearanceSettings = (newSettings: Partial<AppearanceSettings>) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        ...newSettings
      }
    }));
  };

  const updateLanguageSettings = (newSettings: Partial<LanguageSettings>) => {
    setSettings(prev => ({
      ...prev,
      language: {
        ...prev.language,
        ...newSettings
      }
    }));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updatePrayerTimeSettings,
        updateNotificationSettings,
        updateAppearanceSettings,
        updateLanguageSettings,
        resetToDefaults,
        isLoading
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};