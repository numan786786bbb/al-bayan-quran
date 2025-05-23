import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

interface SearchResult {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  arabic: string;
  translation: string;
}

const QuranSearchView: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement actual search functionality
      // For now, just simulate a search
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResults([]);
    } catch (err) {
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResultPress = (result: SearchResult) => {
    // TODO: Navigate to the specific verse
    console.log('Navigate to verse:', result);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primaryText }]}>Search Quran</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <TextInput
          style={[styles.searchInput, { 
            color: theme.colors.primaryText,
            backgroundColor: theme.colors.background
          }]}
          placeholder="Search in Quran..."
          placeholderTextColor={theme.colors.tertiaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={[styles.searchButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSearch}
        >
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
            Searching...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={60} color="#FF4444" />
          <Text style={[styles.errorText, { color: theme.colors.secondaryText }]}>
            {error}
          </Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.surahNumber}-${item.verseNumber}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.resultItem, { backgroundColor: theme.colors.surface }]}
              onPress={() => handleResultPress(item)}
            >
              <View style={styles.resultHeader}>
                <Text style={[styles.surahName, { color: theme.colors.primaryText }]}>
                  {item.surahName}
                </Text>
                <Text style={[styles.verseNumber, { color: theme.colors.secondaryText }]}>
                  Verse {item.verseNumber}
                </Text>
              </View>
              <Text style={[styles.arabicText, { color: theme.colors.primaryText }]}>
                {item.arabic}
              </Text>
              <Text style={[styles.translationText, { color: theme.colors.secondaryText }]}>
                {item.translation}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons 
                name="text-search" 
                size={60} 
                color={theme.colors.tertiaryText} 
              />
              <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
                No results found
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons 
            name="text-search" 
            size={60} 
            color={theme.colors.tertiaryText} 
          />
          <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
            Enter a search term to find verses
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(239, 239, 239, 0.8)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 50,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 16,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verseNumber: {
    fontSize: 14,
    color: '#666',
  },
  arabicText: {
    fontSize: 16,
  },
  translationText: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
  },
});

export default QuranSearchView;