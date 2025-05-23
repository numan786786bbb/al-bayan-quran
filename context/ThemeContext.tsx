import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme, StatusBar, ColorSchemeName } from 'react-native';
import { ThemeDefinition, lightTheme, darkTheme, getThemeByScheme } from '../utils/theme';
import { useSettings } from './SettingsContext';

interface ThemeContextType {
  theme: ThemeDefinition;
  isDark: boolean;
}

// Create Context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false
});

// Hook for using theme in components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { settings } = useSettings();
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState(lightTheme);
  
  // Update theme when settings or device theme changes
  useEffect(() => {
    let selectedTheme: ThemeDefinition;
    
    switch (settings.appearance.theme) {
      case 'dark':
        selectedTheme = darkTheme;
        break;
      case 'light':
        selectedTheme = lightTheme;
        break;
      case 'system':
      default:
        selectedTheme = getThemeByScheme(deviceColorScheme);
        break;
    }
    
    setTheme(selectedTheme);
    
    // Update StatusBar
    StatusBar.setBarStyle(selectedTheme.isDark ? 'light-content' : 'dark-content');
    
  }, [settings.appearance.theme, deviceColorScheme]);
  
  const contextValue = {
    theme,
    isDark: theme.isDark
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};