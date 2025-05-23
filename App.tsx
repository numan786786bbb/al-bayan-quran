import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TasbihScreen from "./screens/TasbihScreen";
import YoutubeFeedScreen from "./screens/YoutubeFeedScreen";
import PrayerTimesScreen from "./screens/PrayerTimesScreen";
import QiblaScreen from "./screens/QiblaScreen";
import QuranScreen from "./screens/QuranScreen";
import QuranTextView from "./components/QuranTextView";
import ParahTextView from "./components/quran/ParahTextView";

import CalendarScreen from "./screens/CalendarScreen";
import DuasScreen from "./screens/DuasScreen";
import DuaDetailScreen from "./screens/DuaDetailScreen";
import AllahNamesScreen from "./screens/AllahNamesScreen";
import AllahNameDetailScreen from "./screens/AllahNameDetailScreen";
import MuhammadNamesScreen from "./screens/MuhammadNamesScreen";
import MuhammadNameDetailScreen from "./screens/MuhammadNameDetailScreen";
import AudioQuranScreen from "./screens/AudioQuranScreen";
import AudioPlayerScreen from "./screens/AudioPlayerScreen";
import QuranBookmarksScreen from "./screens/QuranBookmarksScreen";
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const { theme } = useTheme();

  // Configure navigation theme based on our app theme
  const navigationTheme = {
    ...(theme.isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme.isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.primaryText,
      border: theme.colors.divider,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PrayerTimes" component={PrayerTimesScreen} />
        <Stack.Screen name="Qibla" component={QiblaScreen} />
        <Stack.Screen name="Quran" component={QuranScreen} />
        <Stack.Screen 
          name="QuranTextView" 
          component={QuranTextView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ParahTextView"
          component={ParahTextView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Duas" component={DuasScreen} />
        <Stack.Screen name="DuaDetail" component={DuaDetailScreen} />
        <Stack.Screen name="AllahNames" component={AllahNamesScreen} />
        <Stack.Screen name="AllahNameDetail" component={AllahNameDetailScreen} />
        <Stack.Screen name="MuhammadNames" component={MuhammadNamesScreen} />
        <Stack.Screen name="MuhammadNameDetail" component={MuhammadNameDetailScreen} />
        <Stack.Screen name="AudioQuran" component={AudioQuranScreen} />
        <Stack.Screen name="AudioPlayer" component={AudioPlayerScreen} />
        <Stack.Screen name="QuranBookmarks" component={QuranBookmarksScreen} />
        <Stack.Screen name="Tasbih" component={TasbihScreen} />
        <Stack.Screen name="YoutubeFeed" component={YoutubeFeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ThemedApp() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SettingsProvider>
        <ThemedApp />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});