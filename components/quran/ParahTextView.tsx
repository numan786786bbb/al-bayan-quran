import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Share, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { fetchSurahWithVerses } from '../../utils/quranAPI';
import analytics from '../../utils/analytics';
import { useTheme } from '../../context/ThemeContext';
import { Parah } from '../../utils/quranData';

type RootStackParamList = {
  ParahTextView: { parah: Parah };
};

type ParahTextViewRouteProp = RouteProp<RootStackParamList, 'ParahTextView'>;

export default function ParahTextView() {
  const navigation = useNavigation();
  const route = useRoute<ParahTextViewRouteProp>();
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<any[]>([]);

  const arabicFontSize = fontSize === 'small' ? 24 : fontSize === 'medium' ? 28 : 32;
  const translationFontSize = fontSize === 'small' ? 14 : fontSize === 'medium' ? 16 : 18;

  useEffect(() => {
    if (route.params?.parah) {
      loadParahContent();
      analytics.trackFeatureUsage('View Parah');
    }
  }, [route.params?.parah]);

  // Add error boundary effect
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!route.params?.parah) {
        navigation.goBack();
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);

  const loadParahContent = async () => {
    try {
      setLoading(true);
      const { parah } = route.params;
      const allVerses = [];

      // Parse each surah range in the parah
      for (const surahRange of parah.surahs) {
        // Parse the range string (e.g., "Al-Baqarah 1-141")
        const [surahName, verseRange] = surahRange.split(' ');
        const [startVerse, endVerse] = verseRange.split('-').map(Number);
        
        // Get surah number using mapping
        const surahMap: { [key: string]: number } = {
          'Al-Baqarah': 2,
          'Al-Imran': 3,
          'An-Nisa': 4,
          "Al-Ma'idah": 5,
          "Al-An'am": 6,
          "Al-A'raf": 7,
          // Add more mappings as needed
        };
        
        const surahNumber = surahMap[surahName] || 1;
        
        // Fetch surah content
        const surah = await fetchSurahWithVerses(surahNumber);
        
        if (surah) {
          // Filter verses based on range
          const relevantVerses = surah.verses.filter(
            verse => verse.number >= startVerse && verse.number <= endVerse
          );
          
          allVerses.push({
            surahNumber,
            surahName: surah.englishName,
            verses: relevantVerses
          });
        }
      }
      
      setVerses(allVerses);
    } catch (error) {
      console.error('Error loading Parah content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (verse: any, surahName: string) => {
    try {
      await Share.share({
        message: `${verse.arabic}\n\n${verse.translation}\n\nSurah ${surahName} (${verse.number})\nShared from Al-Bayan Quran App`,
      });
      analytics.trackFeatureUsage('Share Verse');
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
  };

  if (!route.params?.parah) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primaryText} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.primaryText }]}>Error</Text>
        </View>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={60} color="#FF4444" />
          <Text style={[styles.errorText, { color: theme.colors.secondaryText }]}>Failed to load Parah data.</Text>
          <TouchableOpacity 
            style={[styles.errorButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.errorButtonText, { color: theme.colors.surface }]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { parah } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            {parah.name || ''}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            {parah.arabicName || ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <MaterialCommunityIcons 
            name={showOptions ? "close" : "dots-vertical"} 
            size={24} 
            color={theme.colors.primaryText} 
          />
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View style={[styles.optionsPanel, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.fontSizeControls}>
            <Text style={[styles.optionsLabel, { color: theme.colors.secondaryText }]}>Font Size:</Text>
            <View style={styles.fontSizeButtons}>
              <TouchableOpacity 
                onPress={() => setFontSize('small')}
                style={[
                  styles.fontSizeButton, 
                  { borderColor: theme.colors.divider },
                  fontSize === 'small' && [
                    styles.activeFontSize,
                    { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary }
                  ]
                ]}
              >
                <Text style={[
                  styles.fontSizeText, 
                  { color: theme.colors.secondaryText },
                  fontSize === 'small' && { color: theme.colors.primary }
                ]}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setFontSize('medium')}
                style={[
                  styles.fontSizeButton, 
                  { borderColor: theme.colors.divider },
                  fontSize === 'medium' && [
                    styles.activeFontSize,
                    { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary }
                  ]
                ]}
              >
                <Text style={[
                  styles.fontSizeText, 
                  { color: theme.colors.secondaryText },
                  fontSize === 'medium' && { color: theme.colors.primary }
                ]}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setFontSize('large')}
                style={[
                  styles.fontSizeButton, 
                  { borderColor: theme.colors.divider },
                  fontSize === 'large' && [
                    styles.activeFontSize,
                    { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary }
                  ]
                ]}
              >
                <Text style={[
                  styles.fontSizeText, 
                  { color: theme.colors.secondaryText },
                  fontSize === 'large' && { color: theme.colors.primary }
                ]}>A</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <ScrollView style={styles.scrollView}>
        <View style={styles.parahInfoContainer}>
          <Text style={[styles.parahInfoTitle, { color: theme.colors.primary }]}>Verses Range:</Text>
          <Text style={[styles.parahInfoText, { color: theme.colors.secondaryText }]}>
            {parah.versesRange}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
              Loading verses...
            </Text>
          </View>
        ) : (
          verses.map((surahContent, index) => (
            <View key={index} style={styles.surahContainer}>
              <View style={styles.surahHeader}>
                <Text style={[styles.surahTitle, { color: theme.colors.primaryText }]}>
                  Surah {surahContent.surahName}
                </Text>
              </View>
              {surahContent.verses.map((verse: any) => (
                <View key={verse.number} style={styles.verseContainer}>
                  <View style={styles.verseHeader}>
                    <View style={styles.verseNumberContainer}>
                      <Text style={styles.verseNumber}>{verse.number}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.shareButton}
                      onPress={() => handleShare(verse, surahContent.surahName)}
                    >
                      <MaterialCommunityIcons name="share-variant" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.arabicText, { fontSize: arabicFontSize }]}>
                    {verse.arabic}
                  </Text>
                  <Text style={[styles.translationText, { fontSize: translationFontSize }]}>
                    {verse.translation}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  optionsButton: {
    padding: 8,
  },
  optionsPanel: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fontSizeControls: {
    marginBottom: 12,
  },
  optionsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  fontSizeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFontSize: {
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    borderColor: '#2A8C4A',
  },
  fontSizeText: {
    color: '#666',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  parahInfoContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(42, 140, 74, 0.05)',
    borderRadius: 8,
  },
  parahInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  parahInfoText: {
    fontSize: 14,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  surahContainer: {
    marginBottom: 24,
    padding: 16,
  },
  surahHeader: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  surahTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  verseContainer: {
    marginVertical: 8,
    backgroundColor: '#f0f9f0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  verseNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2A8C4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  shareButton: {
    padding: 4,
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    color: '#333',
    fontFamily: 'System',
    padding: 16,
    backgroundColor: 'white',
  },
  translationText: {
    color: '#555',
    textAlign: 'left',
    lineHeight: 24,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: '#2A8C4A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  errorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});