import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Surah } from '../utils/quranData';
import analytics from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';
import { 
  getCurrentTranslation,
  setCurrentTranslation,
  getVerseTranslation
} from '../utils/quranTranslationService';
import QuranTranslationSelector from './QuranTranslationSelector';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

interface QuranTextViewProps {
  surah: Surah;
}

export default function QuranTextView() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { surah: Surah } }, 'params'>>();

  const handleBack = () => {
    navigation.goBack();
  };
  
  if (!route.params?.surah) {
    return (
      <View style={[styles.container, { backgroundColor: '#f8f9fa' }]}>
        <View style={[styles.header, { backgroundColor: 'white' }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[styles.surahTitle, { color: '#333' }]}>Error</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons name="alert-circle-outline" size={60} color="#FF4444" />
          <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginTop: 16, marginBottom: 24 }}>Failed to load Surah data.</Text>
          <TouchableOpacity 
            style={{ backgroundColor: '#2A8C4A', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { surah } = route.params;
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showOptions, setShowOptions] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [translations, setTranslations] = useState<{[key: number]: string}>({});
  const [currentTranslation, setCurrentTranslation] = useState('en.sahih');
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const verseRefs = useRef<{[key: number]: number}>({});
  const arabicFontSize = fontSize === 'small' ? 20 : fontSize === 'medium' ? 26 : 34;
  const translationFontSize = fontSize === 'small' ? 12 : fontSize === 'medium' ? 16 : 20;
  
  // Skip Bismillah for Surah Al-Fatiha (already included) and Surah At-Tawbah (doesn't start with it)
  const showBismillah = surah.number !== 1 && surah.number !== 9;
  
  // Load the current translation and translations on mount
  useEffect(() => {
    const loadCurrentTranslation = async () => {
      const savedTranslation = await getCurrentTranslation();
      setCurrentTranslation(savedTranslation);
    };
    
    loadCurrentTranslation();
  }, []);
  
  // Load translation for verses when current translation changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoadingTranslation(true);
      
      try {
        // Create an object to store translations
        const newTranslations: {[key: number]: string} = {};
        
        // Load translations for each verse
        for (const verse of surah.verses) {
          const translation = await getVerseTranslation(
            surah.number,
            verse.number,
            currentTranslation
          );
          
          // If we got a translation, store it
          if (translation) {
            newTranslations[verse.number] = translation;
          } else {
            // Otherwise use the default translation
            newTranslations[verse.number] = verse.translation;
          }
        }
        
        setTranslations(newTranslations);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fall back to default translations
        const defaultTranslations = Object.fromEntries(
          surah.verses.map(verse => [verse.number, verse.translation])
        );
        setTranslations(defaultTranslations);
      } finally {
        setIsLoadingTranslation(false);
      }
    };
    
    loadTranslations();
  }, [currentTranslation, surah]);
  
  // Handle translation change
  const handleTranslationChange = async (translationId: string) => {
    setCurrentTranslation(translationId);
    await setCurrentTranslation(translationId);
    analytics.trackFeatureUsage(`Changed Translation: ${translationId}`);
  };
  
  // Update currentVerse based on scroll position
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    
    // Find the verse that is currently most visible
    let closestVerse = 1;
    let minDistance = Number.MAX_VALUE;
    
    for (const [verseNum, position] of Object.entries(verseRefs.current)) {
      const distance = Math.abs(offsetY - position);
      if (distance < minDistance) {
        minDistance = distance;
        closestVerse = parseInt(verseNum);
      }
    }
    
    if (currentVerse !== closestVerse) {
      setCurrentVerse(closestVerse);
    }
  };
  
  // Save position when a verse comes into view
  const handleVerseLayout = (verseNumber: number, event: any) => {
    const layout = event.nativeEvent.layout;
    verseRefs.current[verseNumber] = layout.y;
  };
  
  // Share functionality
  const handleShareVerse = async (verse: number) => {
    try {
      const verseObj = surah.verses.find((v: any) => v.number === verse);
      if (!verseObj) return;
      const translation = translations[verse] || verseObj.translation;
      await Share.share({
        message: `${verseObj.arabic}\n\n"${translation}"\n\nSurah ${surah.englishName} (${surah.number}:${verse})\nShared from Al-Bayan Quran App`,
      });
      analytics.trackFeatureUsage('Share Verse');
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
  };
  
  // Navigate to a specific verse
  const goToVerse = (verseNumber: number) => {
    if (verseNumber < 1 || verseNumber > surah.numberOfAyahs) {
      return;
    }
    
    setIsScrolling(true);
    
    // Use scrollTo to navigate to the verse
    if (verseRefs.current[verseNumber] !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ 
        y: verseRefs.current[verseNumber] - 100, // Subtract header height
        animated: true 
      });
    }
    
    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };
  
  // Previous and next verse navigation
  const goToPreviousVerse = () => {
    if (currentVerse > 1) {
      goToVerse(currentVerse - 1);
    }
  };
  
  const goToNextVerse = () => {
    if (currentVerse < surah.numberOfAyahs) {
      goToVerse(currentVerse + 1);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.header, { 
        borderBottomColor: theme.colors.divider,
        backgroundColor: theme.colors.surface
      }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.surahTitle, { color: theme.colors.primaryText }]}>
            {surah.englishName || ''}
          </Text>
          <Text style={[styles.surahSubtitle, { color: theme.colors.secondaryText }]}>
            {surah.englishNameTranslation || ''}
          </Text>
        </View>
        <View style={styles.headerControls}>
          <TouchableOpacity 
            onPress={() => setShowOptions(!showOptions)}
            style={styles.optionsButton}
          >
            <MaterialCommunityIcons 
              name={showOptions ? "close" : "dots-vertical"} 
              size={24} 
              color={theme.colors.primaryText}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {showOptions && (
        <View style={[styles.optionsPanel, { 
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.divider
        }]}>
          <QuranTranslationSelector
            currentTranslation={currentTranslation}
            onTranslationChange={handleTranslationChange}
          />
          
          <View style={styles.fontSizeControls}>
            <Text style={[styles.optionsLabel, { color: theme.colors.secondaryText }]}>
              Font Size:
            </Text>
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
          
          <View style={styles.verseNavigation}>
            <Text style={[styles.optionsLabel, { color: theme.colors.secondaryText }]}>
              Go to verse:
            </Text>
            <View style={styles.verseNavigationControls}>
              <TouchableOpacity 
                onPress={goToPreviousVerse} 
                style={[
                  styles.verseNavButton, 
                  { borderColor: theme.colors.divider },
                  currentVerse <= 1 && styles.disabledButton
                ]}
                disabled={currentVerse <= 1}
              >
                <MaterialCommunityIcons 
                  name="chevron-left" 
                  size={24} 
                  color={currentVerse <= 1 ? theme.colors.tertiaryText : theme.colors.primary}
                />
              </TouchableOpacity>
              
              <Text style={[styles.verseCounter, { color: theme.colors.primaryText }]}>
                {currentVerse} / {surah.numberOfAyahs}
              </Text>
              
              <TouchableOpacity 
                onPress={goToNextVerse} 
                style={[
                  styles.verseNavButton, 
                  { borderColor: theme.colors.divider },
                  currentVerse >= surah.numberOfAyahs && styles.disabledButton
                ]}
                disabled={currentVerse >= surah.numberOfAyahs}
              >
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color={currentVerse >= surah.numberOfAyahs ? theme.colors.tertiaryText : theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleShareVerse(currentVerse)}
          >
            <MaterialCommunityIcons name="share-variant" size={20} color="white" />
            <Text style={styles.shareButtonText}>Share Current Verse</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView 
        ref={scrollViewRef}
        style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
        onScroll={!isScrolling ? handleScroll : undefined}
        scrollEventThrottle={300}
      >
        {showBismillah ? (
          <View style={styles.bismillahContainer}>
            <Text style={[styles.bismillah, { color: theme.colors.primary }]}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          </View>
        ) : null}
        
        {surah.verses.map((verse: any) => {
          if (!verse) return null;
          return (
            <View 
              key={verse.number} 
              style={[
                styles.verseContainer,
                { backgroundColor: theme.colors.surface },
                currentVerse === verse.number && [
                  styles.currentVerseContainer,
                  { 
                    backgroundColor: theme.colors.primaryLight,
                    borderLeftColor: theme.colors.primary
                  }
                ]
              ]}
              onLayout={(event) => handleVerseLayout(verse.number, event)}
            >
              <View style={styles.verseHeader}>
                <View style={[
                  styles.verseNumberContainer, 
                  { backgroundColor: theme.colors.primaryLight }
                ]}>
                  <Text style={[styles.verseNumber, { color: theme.colors.primary }]}> 
                    {verse.number?.toString() || ''}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.verseShareButton}
                  onPress={() => handleShareVerse(verse.number)}
                >
                  <MaterialCommunityIcons 
                    name="share-variant" 
                    size={16} 
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[
                styles.arabicText, 
                { 
                  fontSize: arabicFontSize,
                  color: theme.colors.primaryText 
                }
              ]}>
                {verse.arabic || ''}
              </Text>
              {isLoadingTranslation ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
              ) : (
                <Text style={[
                  styles.translationText, 
                  { 
                    fontSize: translationFontSize,
                    color: theme.colors.secondaryText 
                  }
                ]}>
                  {translations[verse.number] || verse.translation || ''}
                </Text>
              )}
            </View>
          );
        })}
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.secondaryText }]}>
            {`End of Surah ${surah.englishName || ''}`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  surahTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  surahSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsButton: {
    padding: 8,
  },
  optionsPanel: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  fontSizeControls: {
    marginBottom: 12,
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
  activeFontSizeText: {
    color: '#2A8C4A',
    fontWeight: 'bold',
  },
  verseNavigation: {
    marginBottom: 12,
  },
  verseNavigationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verseNavButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  verseCounter: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A8C4A',
    padding: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  bismillahContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bismillah: {
    fontSize: 28,
    color: '#2A8C4A',
    textAlign: 'center',
  },  verseContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentVerseContainer: {
    backgroundColor: 'rgba(42, 140, 74, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#2A8C4A',
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  verseNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2A8C4A',
  },
  verseShareButton: {
    padding: 6,
  },  arabicContainer: {
    backgroundColor: 'rgba(42, 140, 74, 0.08)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 12,
    alignItems: 'stretch',
  },  arabicText: {
    fontSize: 26,
    textAlign: 'right',
    color: '#333',
    fontFamily: 'System',
    lineHeight: 60,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
    writingDirection: 'rtl',
  },
  translationContainer: {
    padding: 10,
    backgroundColor: 'white',
  },  translationText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 26,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2A8C4A',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 24,
    paddingBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});