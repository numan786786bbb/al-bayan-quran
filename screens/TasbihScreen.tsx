import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Vibration,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
import analytics from '../utils/analytics';
import { getHijriDate, formatHijriDate } from '../utils/hijriDate';
import TasbihCounter from '../components/tasbih/TasbihCounter';
import AddTasbihModal from '../components/tasbih/AddTasbihModal';
import { Tasbih, getStoredTasbihat, addTasbih } from '../utils/tasbihService';
import IslamicDateDisplay from '../components/IslamicDateDisplay';
import BottomNavigation from '../components/BottomNavigation';

export default function TasbihScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTasbih, setSelectedTasbih] = useState<Tasbih | null>(null);
  const [tasbihat, setTasbihat] = useState<Tasbih[]>([]);

  // Track screen view
  useEffect(() => {
    analytics.trackScreenView('Tasbih');
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Load saved tasbihat
  useEffect(() => {
    loadTasbihat();
  }, []);

  const loadTasbihat = async () => {
    const stored = await getStoredTasbihat();
    setTasbihat(stored);
  };

  const handleAddTasbih = async (newTasbih: Tasbih) => {
    try {
      await addTasbih(newTasbih);
      await loadTasbihat();
      setShowAddModal(false);
      analytics.trackFeatureUsage('Add Tasbih');
    } catch (error) {
      console.error('Error adding tasbih:', error);
    }
  };

  // Calculate Hijri date
  const hijriDateObj = getHijriDate(currentTime);
  const hijriDate = formatHijriDate(hijriDateObj);
  const gregorianDate = format(currentTime, 'MMMM d, yyyy');

  const renderTasbihItem = ({ item }: { item: Tasbih }) => (
    <TouchableOpacity
      style={[
        styles.tasbihCard,
        selectedTasbih?.id === item.id && styles.selectedTasbihCard
      ]}
      onPress={() => setSelectedTasbih(item)}
    >
      <View style={styles.tasbihCardContent}>
        <Text style={styles.tasbihArabic}>{item.arabic}</Text>
        <Text style={styles.tasbihTransliteration}>{item.transliteration}</Text>
        <Text style={styles.tasbihTranslation}>{item.translation}</Text>
        <View style={styles.tasbihProgress}>
          <Text style={styles.tasbihCount}>
            {item.count}/{item.target}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.headerGradientStart, theme.colors.headerGradientEnd]}
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
        
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="counter" size={24} color="white" />
          <Text style={styles.screenTitle}>Digital Tasbih</Text>
        </View>
        
        <IslamicDateDisplay 
          hijriDate={hijriDate}
          gregorianDate={gregorianDate}
        />
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <MaterialCommunityIcons name="cog" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.content}>
        {selectedTasbih ? (
          <TasbihCounter
            tasbih={selectedTasbih}
            onClose={() => setSelectedTasbih(null)}
            onUpdate={loadTasbihat}
          />
        ) : (
          <>
            <View style={styles.tasbihatHeader}>
              <Text style={styles.sectionTitle}>Your Tasbihat</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddModal(true)}
              >
                <MaterialCommunityIcons name="plus" size={24} color="#2A8C4A" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={tasbihat}
              renderItem={renderTasbihItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.tasbihatList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons
                    name="gesture-tap-button"
                    size={60}
                    color="#2A8C4A"
                    style={styles.emptyStateIcon}
                  />
                  <Text style={styles.emptyStateText}>
                    Tap the + button to add your first tasbih
                  </Text>
                </View>
              )}
            />
          </>
        )}
      </View>

      <AddTasbihModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTasbih}
      />

      <BottomNavigation
        currentRoute="tasbih"
        onChangeRoute={(route) => {
          if (route === 'home') {
            navigation.navigate('Home' as never);
          } else if (route === 'prayerTimes') {
            navigation.navigate('PrayerTimes' as never);
          } else if (route === 'quran') {
            navigation.navigate('Quran' as never);
          } else if (route === 'duas') {
            navigation.navigate('Duas' as never);
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
  content: {
    flex: 1,
    padding: 16,
  },
  tasbihatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A8C4A',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasbihatList: {
    paddingBottom: 20,
  },
  tasbihCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedTasbihCard: {
    borderWidth: 2,
    borderColor: '#2A8C4A',
  },
  tasbihCardContent: {
    alignItems: 'center',
  },
  tasbihArabic: {
    fontSize: 24,
    color: '#2A8C4A',
    marginBottom: 8,
    fontFamily: 'System',
    textAlign: 'center',
  },
  tasbihTransliteration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  tasbihTranslation: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  tasbihProgress: {
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tasbihCount: {
    color: '#2A8C4A',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});