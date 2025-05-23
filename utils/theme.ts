import { ColorSchemeName } from 'react-native';

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  card: string;
  
  // Text colors
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  
  // UI element colors
  primary: string; // Main brand color - the green
  primaryLight: string;
  primaryDark: string;
  accent: string;
  error: string;
  
  // Specific component colors
  headerGradientStart: string;
  headerGradientEnd: string;
  divider: string;
  statusBarColor: string;
  shadow: string;
  icon: string;
  prayerCardBg: string;
  prayerCardActiveBg: string;
}

export interface ThemeDefinition {
  colors: ThemeColors;
  isDark: boolean;
}

export const lightTheme: ThemeDefinition = {
  isDark: false,
  colors: {
    // Background colors
    background: '#f8f9fa',
    surface: '#ffffff',
    card: '#ffffff',
    
    // Text colors
    primaryText: '#333333',
    secondaryText: '#666666',
    tertiaryText: '#999999',
    
    // UI element colors
    primary: '#2A8C4A',
    primaryLight: 'rgba(42, 140, 74, 0.1)',
    primaryDark: '#206238',
    accent: '#e74c3c',
    error: '#ff3b30',
    
    // Specific component colors
    headerGradientStart: '#2A8C4A',
    headerGradientEnd: '#206238',
    divider: '#eeeeee',
    statusBarColor: '#2A8C4A',
    shadow: 'rgba(0, 0, 0, 0.1)',
    icon: '#2A8C4A',
    prayerCardBg: '#ffffff',
    prayerCardActiveBg: 'rgba(42, 140, 74, 0.08)'
  }
};

export const darkTheme: ThemeDefinition = {
  isDark: true,
  colors: {
    // Background colors
    background: '#121212',
    surface: '#1e1e1e',
    card: '#2c2c2c',
    
    // Text colors
    primaryText: '#ffffff',
    secondaryText: '#cccccc',
    tertiaryText: '#999999',
    
    // UI element colors
    primary: '#3ca763',
    primaryLight: 'rgba(60, 167, 99, 0.15)',
    primaryDark: '#2A8C4A',
    accent: '#e74c3c',
    error: '#ff453a',
    
    // Specific component colors
    headerGradientStart: '#2A8C4A',
    headerGradientEnd: '#1a462a',
    divider: '#333333',
    statusBarColor: '#121212',
    shadow: 'rgba(0, 0, 0, 0.3)',
    icon: '#3ca763',
    prayerCardBg: '#2c2c2c',
    prayerCardActiveBg: 'rgba(60, 167, 99, 0.15)'
  }
};

export function getThemeByScheme(scheme: ColorSchemeName): ThemeDefinition {
  return scheme === 'dark' ? darkTheme : lightTheme;
}