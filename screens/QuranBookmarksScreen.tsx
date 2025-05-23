import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getSurahBookmarks, getAyahBookmarks, SurahBookmark, AyahBookmark, clearAllBookmarks } from '../utils/bookmarkService';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';
import { fetchSurahWithVerses } from '../utils/quranAPI';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function QuranBookmarksScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'surahs' | 'verses'>('surahs');
  const [surahBookmarks, setSurahBookmarks] = useState<SurahBookmark[]>([]);
  const [ayahBookmarks, setAyahBookmarks] = useState<AyahBookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadBookmarks = useCallback(async () => {
    setIsLoading(true);
    try {
      const surahs = await getSurahBookmarks();
      const ayahs = await getAyahBookmarks();
      
      // Sort by newest first
      setSurahBookmarks(surahs.sort((a, b) => b.timestamp - a.timestamp));
      setAyahBookmarks(ayahs.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);
  
  const handleClearBookmarks = async () => {
    try {
      await clearAllBookmarks();
      setSurahBookmarks([]);
      setAyahBookmarks([]);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
    }
  };  const handleSurahPress = async (bookmark: SurahBookmark) => {
    try {
      setIsLoading(true);
      const surah = await fetchSurahWithVerses(bookmark.surahNumber);      if (surah) {
        // Navigate directly to QuranTextView with the surah data
        navigation.navigate('QuranTextView', {
          surah
        });
      } else {
        console.error('سورت لوڈ کرنے میں ناکام');
      }
    } catch (error) {
      console.error('Error navigating to Surah:', error);
      console.error('سورت کھولنے میں ناکام');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAyahPress = async (bookmark: AyahBookmark) => {
    try {
      const surah = await fetchSurahWithVerses(bookmark.surahNumber);
      if (surah) {
        navigation.navigate('QuranTextView', { 
          surah, 
          initialAyah: bookmark.ayahNumber
        });
      } else {
        console.error('Failed to load Surah');
      }
    } catch (error) {
      console.error('Error navigating to Ayah:', error);
      console.error('Failed to open Ayah');
    }
  };
  
  const renderSurahItem = ({ item }: { item: SurahBookmark }) => (
    <TouchableOpacity 
      style={[
        styles.bookmarkItem, 
        { backgroundColor: theme.colors.surface }
      ]}
      onPress={() => handleSurahPress(item)}
    >
      <View style={styles.bookmarkIconContainer}>
        <MaterialCommunityIcons name="book-open-variant" size={24} color="#2A8C4A" />
      </View>
      <View style={styles.bookmarkContent}>
        <Text style={[styles.bookmarkTitle, { color: theme.colors.primaryText }]}>
          Surah {item.englishName}
        </Text>
        <Text style={[styles.bookmarkSubtitle, { color: theme.colors.secondaryText }]}>
          Chapter {item.surahNumber}
        </Text>
        <Text style={[styles.bookmarkTimestamp, { color: theme.colors.tertiaryText }]}>
          Saved {format(new Date(item.timestamp), 'MMM d, yyyy • h:mm a')}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#2A8C4A" />
    </TouchableOpacity>
  );
  
  const renderAyahItem = ({ item }: { item: AyahBookmark }) => (
    <TouchableOpacity 
      style={[
        styles.bookmarkItem, 
        { backgroundColor: theme.colors.surface }
      ]}
      onPress={() => handleAyahPress(item)}
    >
      <View style={styles.bookmarkIconContainer}>
        <MaterialCommunityIcons name="bookmark" size={24} color="#2A8C4A" />
      </View>
      <View style={styles.bookmarkContent}>
        <Text style={[styles.bookmarkTitle, { color: theme.colors.primaryText }]}>
          {item.surahName || `Surah ${item.surahNumber}`} : {item.ayahNumber}
        </Text>
        <Text 
          style={[styles.arabicText, { color: theme.colors.primaryText }]}
          numberOfLines={1}
        >
          {item.ayahText}
        </Text>
        <Text style={[styles.bookmarkTimestamp, { color: theme.colors.tertiaryText }]}>
          Saved {format(new Date(item.timestamp), 'MMM d, yyyy • h:mm a')}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#2A8C4A" />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primaryText }]}>
          Quran Bookmarks
        </Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearBookmarks}
          disabled={surahBookmarks.length === 0 && ayahBookmarks.length === 0}
        >
          <MaterialCommunityIcons 
            name="delete-sweep" 
            size={24} 
            color={
              surahBookmarks.length === 0 && ayahBookmarks.length === 0
                ? theme.colors.tertiaryText
                : theme.colors.error
            } 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'surahs' && [
              styles.activeTabButton,
              { backgroundColor: theme.colors.primaryLight }
            ]
          ]}
          onPress={() => setActiveTab('surahs')}
        >
          <Text 
            style={[
              styles.tabButtonText,
              activeTab === 'surahs' && { color: theme.colors.primary }
            ]}
          >
            Surah Bookmarks ({surahBookmarks.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'verses' && [
              styles.activeTabButton,
              { backgroundColor: theme.colors.primaryLight }
            ]
          ]}
          onPress={() => setActiveTab('verses')}
        >
          <Text 
            style={[
              styles.tabButtonText,
              activeTab === 'verses' && { color: theme.colors.primary }
            ]}
          >
            Verse Bookmarks ({ayahBookmarks.length})
          </Text>
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
            Loading bookmarks...
          </Text>
        </View>
      ) : (
        activeTab === 'surahs' ? (
          surahBookmarks.length > 0 ? (
            <FlatList
              data={surahBookmarks}
              renderItem={renderSurahItem}
              keyExtractor={(item) => `surah-${item.surahNumber}-${item.timestamp}`}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons 
                name="bookmark-off" 
                size={80} 
                color={theme.colors.tertiaryText} 
              />
              <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
                No surah bookmarks yet
              </Text>
              <TouchableOpacity
                style={[styles.browseButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('Quran' as never)}
              >
                <Text style={styles.browseButtonText}>Browse Quran</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          ayahBookmarks.length > 0 ? (
            <FlatList
              data={ayahBookmarks}
              renderItem={renderAyahItem}
              keyExtractor={(item) => `ayah-${item.surahNumber}-${item.ayahNumber}-${item.timestamp}`}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons 
                name="bookmark-off" 
                size={80} 
                color={theme.colors.tertiaryText} 
              />
              <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
                No verse bookmarks yet
              </Text>
              <TouchableOpacity
                style={[styles.browseButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('Quran' as never)}
              >
                <Text style={styles.browseButtonText}>Browse Quran</Text>
              </TouchableOpacity>
            </View>
          )
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
  },
  tabButtonText: {
    fontWeight: '600',
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookmarkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookmarkContent: {
    flex: 1,
    marginRight: 8,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookmarkSubtitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  arabicText: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'left',
    fontFamily: 'System',
  },
  bookmarkTimestamp: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#2A8C4A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});