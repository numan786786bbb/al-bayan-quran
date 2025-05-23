import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import analytics from '../utils/analytics';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';
import BottomNavigation from '../components/BottomNavigation';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import allahNamesData, { AllahName } from '../utils/allahNamesData';
import AllahNamesList from '../components/AllahNamesList';
import { useSettings } from '../context/SettingsContext';

export default function AllahNamesScreen() {
  const navigation = useNavigation();
  const { settings } = useSettings();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNames, setFilteredNames] = useState<AllahName[]>(allahNamesData);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Track screen view
  useEffect(() => {
    analytics.trackScreenView('Allah Names');
    analytics.trackFeatureUsage('Asmaul Husna Browser');
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter names based on search and favorites
  useEffect(() => {
    let filtered = allahNamesData;
    
    // Apply favorites filter if enabled
    if (showFavorites) {
      filtered = filtered.filter(name => favorites.includes(name.id));
    }
    
    // Apply search filter if there is a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(name => 
        name.transliteration.toLowerCase().includes(query) ||
        name.englishMeaning.toLowerCase().includes(query)
      );
    }
    
    setFilteredNames(filtered);
  }, [searchQuery, favorites, showFavorites]);

  // Toggle favorite status for a name
  const toggleFavorite = (nameId: string) => {
    setFavorites(prev => {
      if (prev.includes(nameId)) {
        return prev.filter(id => id !== nameId);
      } else {
        return [...prev, nameId];
      }
    });
  };

  // Calculate Hijri date
  const hijriDateObj = getHijriDate(currentTime);
  const hijriDate = formatHijriDate(hijriDateObj);
  const gregorianDate = format(currentTime, 'MMMM d, yyyy');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2A8C4A', '#206238']}
        style={styles.header}
      >
        <Image
          source={{ uri: 'https://api.a0.dev/assets/image?text=islamic%20geometric%20pattern%20with%20arabesques%20in%20green%20and%20gold&aspect=16:9' }}
          style={styles.headerImage}
        />
        
        <View style={styles.headerControls}>
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={() => navigation.navigate('Calendar' as never)}
          >
            <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=dawateislami%20logo%20with%20green%20color%20islamic%20symbol&aspect=1:1' }}
            style={styles.logo}
          />
          <Text style={styles.appTitle}>Al-Bayan Quran</Text>
        </View>
        
        <IslamicDateDisplay 
          hijriDate={hijriDate}
          gregorianDate={gregorianDate}
        />
        
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="star" size={24} color="white" />
          <Text style={styles.screenTitle}>Asmaul Husna</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <MaterialCommunityIcons name="cog" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>The 99 Beautiful Names of Allah</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or meaning..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            showFavorites && styles.activeFilterButton
          ]}
          onPress={() => setShowFavorites(!showFavorites)}
        >
          <MaterialCommunityIcons 
            name="heart" 
            size={16} 
            color={showFavorites ? "white" : "#2A8C4A"} 
          />
          <Text 
            style={[
              styles.filterText,
              showFavorites && styles.activeFilterText
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {filteredNames.length > 0 ? (
          <AllahNamesList 
            names={filteredNames} 
            onSelectName={(name) => {
              navigation.navigate('AllahNameDetail' as never, { name } as never);
              analytics.trackFeatureUsage(`View Name: ${name.transliteration}`);
            }}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <MaterialCommunityIcons name="star-off" size={80} color="#2A8C4A" opacity={0.5} />
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? `No names found matching "${searchQuery}"`
                : showFavorites
                  ? "You haven't added any names to favorites yet"
                  : "No names found"}
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setShowFavorites(false);
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <BottomNavigation
        currentRoute="allahNames"
        onChangeRoute={(route) => {
          if (route === 'home') {
            navigation.navigate('Home' as never);
          } else if (route === 'prayerTimes') {
            navigation.navigate('PrayerTimes' as never);
          } else if (route === 'quran') {
            navigation.navigate('Quran' as never);
          } else if (route === 'muhammadNames') {
            navigation.navigate('MuhammadNames' as never);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  headerControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  appTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2A8C4A',
  },
  activeFilterButton: {
    backgroundColor: '#2A8C4A',
  },
  filterText: {
    fontSize: 14,
    color: '#2A8C4A',
    marginLeft: 4,
  },
  activeFilterText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#2A8C4A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});