import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import analytics from '../utils/analytics';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';
import BottomNavigation from '../components/BottomNavigation';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import duasData, { Dua, DUA_CATEGORIES, DuaCategory } from '../utils/duasData';
import DuaList from '../components/DuaList';
import { useSettings } from '../context/SettingsContext';

const { width } = Dimensions.get('window');

export default function DuasScreen() {
  const navigation = useNavigation();
  const { settings } = useSettings();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredDuas, setFilteredDuas] = useState<Dua[]>(duasData);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Track screen view
  useEffect(() => {
    analytics.trackScreenView('Duas');
    analytics.trackFeatureUsage('Duas Browser');
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter duas based on search and category
  useEffect(() => {
    let filtered = duasData;
    
    // Apply category filter if selected
    if (selectedCategory) {
      filtered = filtered.filter(dua => 
        selectedCategory === 'favorites' 
          ? favorites.includes(dua.id)
          : dua.category === selectedCategory
      );
    }
    
    // Apply search filter if there is a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dua => 
        dua.name.toLowerCase().includes(query) ||
        dua.translation_en.toLowerCase().includes(query)
      );
    }
    
    setFilteredDuas(filtered);
  }, [searchQuery, selectedCategory, favorites]);

  // Toggle favorite status for a dua
  const toggleFavorite = useCallback((duaId: string) => {
    setFavorites(prev => {
      if (prev.includes(duaId)) {
        return prev.filter(id => id !== duaId);
      } else {
        return [...prev, duaId];
      }
    });
  }, []);

  // Calculate Hijri date
  const hijriDateObj = getHijriDate(currentTime);
  const hijriDate = formatHijriDate(hijriDateObj);
  const gregorianDate = format(currentTime, 'MMMM d, yyyy');

  const renderCategoryItem = ({ item }: { item: DuaCategory | { id: string; name: string; icon: string; description: string } }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item.id === selectedCategory ? null : item.id)}
    >
      <MaterialCommunityIcons
        name={item.icon as any}
        size={24}
        color={selectedCategory === item.id ? 'white' : '#2A8C4A'}
      />
      <Text style={[
        styles.categoryName,
        selectedCategory === item.id && styles.selectedCategoryName
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const favoritesCategory = {
    id: 'favorites',
    name: 'Favorites',
    icon: 'heart',
    description: 'Your favorite duas'
  };

  const allCategories = [favoritesCategory, ...DUA_CATEGORIES];

  return (
    <View style={styles.container}>
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
          <MaterialCommunityIcons name="hands-pray" size={24} color="white" />
          <Text style={styles.screenTitle}>Duas Collection</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <MaterialCommunityIcons name="cog" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search duas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <View style={{ opacity: 0.6 }}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={allCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.contentContainer}>
        {filteredDuas.length > 0 ? (
          <DuaList 
            duas={filteredDuas} 
            onPressDua={(dua) => {
              navigation.navigate('DuaDetail' as never, { dua } as never);
              analytics.trackFeatureUsage(`View Dua: ${dua.name}`);
            }} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={{ opacity: 0.5 }}>
              <MaterialCommunityIcons name="book-search" size={80} color="#2A8C4A" />
            </View>
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? `No duas found matching "${searchQuery}"`
                : selectedCategory === 'favorites'
                  ? "You haven't added any duas to favorites yet"
                  : "No duas found in this category"}
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <BottomNavigation
        currentRoute="duas"
        onChangeRoute={(route) => {
          if (route === 'home') {
            navigation.navigate('Home' as never);
          } else if (route === 'prayerTimes') {
            navigation.navigate('PrayerTimes' as never);
          } else if (route === 'duas') {
            navigation.navigate('Duas' as never);
          } else if (route === 'allahNames') {
            navigation.navigate('AllahNames' as never);
          } else if (route === 'muhammadNames') {
            navigation.navigate('MuhammadNames' as never);
          }
        }}
      />
    </View>
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
    marginTop: 16,
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
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedCategoryItem: {
    backgroundColor: '#2A8C4A',
  },
  categoryName: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedCategoryName: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
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