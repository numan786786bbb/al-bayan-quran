import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import surahListData from '../utils/surahData';
import { fetchSurahWithVerses } from '../utils/quranAPI';
import QuranTabs from '../components/quran/QuranTabs';
import SurahListView from '../components/quran/SurahListView';
import ParahGridView from '../components/quran/ParahGridView';
import { PARAH_DATA } from '../utils/quranData';
import { Parah } from '../utils/quranData';

export default function QuranScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'parah'>('surah');

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleParahPress = (parah: Parah) => {
    navigation.navigate('ParahTextView', { parah });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSurahPress = async (surah: any) => {
    try {
      setIsLoading(true);
      // Get complete surah data including verses
      const completeSurah = await fetchSurahWithVerses(parseInt(surah.number));
      
      if (!completeSurah) {
        throw new Error('Failed to load surah data');
      }

      navigation.navigate('QuranTextView', {
        surah: completeSurah
      });

    } catch (error) {
      console.error('Error navigating to Surah:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Al-Quran</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder={activeTab === 'surah' ? "Search Surah" : "Search Parah"}
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <QuranTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as 'surah' | 'parah')}
      />
      <View style={styles.content}>
        {activeTab === 'surah' ? (
          <>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('AudioQuran')}
              >
                <MaterialCommunityIcons name="headphones" size={20} color="#2A8C4A" />
                <Text style={styles.actionButtonText}>Audio</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('QuranBookmarks')}
              >
                <MaterialCommunityIcons name="bookmark-multiple" size={20} color="#2A8C4A" />
                <Text style={styles.actionButtonText}>Bookmarks</Text>
              </TouchableOpacity>
            </View>
            <SurahListView onSurahPress={handleSurahPress} />
          </>
        ) : (
          <ParahGridView onParahPress={handleParahPress} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  actionButtonText: {
    color: '#2A8C4A',
    marginLeft: 8,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
});