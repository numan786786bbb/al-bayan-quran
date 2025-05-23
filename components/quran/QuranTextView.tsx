import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { isSurahBookmarked, addSurahBookmark, removeSurahBookmark, isAyahBookmarked, addAyahBookmark, removeAyahBookmark } from '../../utils/bookmarkService';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Surah } from '../../utils/quranData';
import { fetchSurahWithVerses } from '../../utils/quranAPI';
import analytics from '../../utils/analytics';
import { useRoute, useNavigation } from '@react-navigation/native';

interface QuranTextViewProps {}

interface ExtendedSurah extends Surah {
  revelationType?: 'Meccan' | 'Medinan';
  verseCount?: number;
}

const QuranTextView: React.FC<QuranTextViewProps> = () => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { surah } = route.params as { surah: ExtendedSurah };
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isSurahBookmarked, setIsSurahBookmarked] = useState(false);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<{[key: number]: boolean}>({});
  const [sliderValue, setSliderValue] = useState(26);
  const [showOptions, setShowOptions] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fullSurah, setFullSurah] = useState<ExtendedSurah | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState<number>(1);
  const [showAutoScrollButton, setShowAutoScrollButton] = useState<boolean>(true);

  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const manualScrollY = useRef(0);

  const arabicFontSize = fontSize === 'small' ? 22 : fontSize === 'medium' ? 26 : 30;
  const translationFontSize = fontSize === 'small' ? 14 : fontSize === 'medium' ? 16 : 18;

  useEffect(() => {
    loadSurahContent();
    analytics.trackScreenView(`Quran Surah: ${surah.englishName}`);
  }, [surah]);

  const loadSurahContent = async () => {
    try {
      setLoading(true);
      const surahNumber = typeof surah.number === 'string' ? parseInt(surah.number) : surah.number;
      const completeSurah = await fetchSurahWithVerses(surahNumber);
      
      if (completeSurah) {
        setFullSurah(completeSurah as ExtendedSurah);
      } else {
        setFullSurah(surah);
        console.error('Could not load complete Surah. Showing basic content.');
      }
    } catch (error) {
      console.error('Error loading Surah content:', error);
      setFullSurah(surah);
    } finally {
      setLoading(false);
    }
  };

  const handleShareVerse = async (verse: any) => {
    try {
      await Share.share({
        message: `${verse.arabic}\n\n${verse.translation}\n\nSurah ${surah.englishName} (${surah.number}:${verse.number})\nShared from Al-Bayan Quran App`,
      });
      analytics.trackFeatureUsage('Share Verse');
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
  };

  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollInterval.current = setInterval(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ 
            y: manualScrollY.current + autoScrollSpeed,
            animated: false 
          });
          manualScrollY.current = manualScrollY.current + autoScrollSpeed;
        }
      }, 50);
    } else {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }
    }
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }
    };
  }, [isAutoScrolling, autoScrollSpeed]);

  const showBismillah = String(surah.number) !== "1" && String(surah.number) !== "9";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.surahTitle}>{surah.englishName}</Text>
          <Text style={styles.surahSubtitle}>
            {surah.revelationType || 'Unknown'} • {surah.verseCount || surah.numberOfAyahs} Verses
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => setShowOptions(!showOptions)}
            style={styles.optionsButton}
          >
            <MaterialCommunityIcons 
              name={showOptions ? "close" : "dots-vertical"}
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {showOptions && (
        <View style={styles.optionsPanel}>
          <View style={styles.optionsSection}>
            <Text style={styles.optionsLabel}>Font Size:</Text>
            <View style={styles.fontSizeSliderContainer}>
              <View style={styles.fontSizeRow}>
                <MaterialCommunityIcons name="format-font-size-decrease" size={20} color="#666" />
                <Text style={styles.fontSizeValue}>{arabicFontSize}px</Text>
                <MaterialCommunityIcons name="format-font-size-increase" size={20} color="#666" />
              </View>
              <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={40}
                value={arabicFontSize}
                onValueChange={(value) => {
                  const size = Math.round(value);
                  setFontSize(size <= 22 ? 'small' : size <= 30 ? 'medium' : 'large');
                }}
                minimumTrackTintColor="#2A8C4A"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#2A8C4A"
              />
            </View>
          </View>
          
          <View style={styles.optionsSection}>
            <View style={styles.optionRow}>
              <Text style={styles.optionsLabel}>Show Translation:</Text>
              <TouchableOpacity 
                onPress={() => setShowTranslation(!showTranslation)}
                style={[
                  styles.toggleButton,
                  showTranslation ? styles.toggleButtonActive : styles.toggleButtonInactive
                ]}
              >
                <View style={[
                  styles.toggleKnob, 
                  showTranslation ? styles.toggleKnobActive : styles.toggleKnobInactive
                ]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={(event) => {
          manualScrollY.current = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2A8C4A" />
            <Text style={styles.loadingText}>Loading Surah content...</Text>
          </View>
        ) : (
          <>
            {showBismillah && (
              <View style={styles.bismillahContainer}>
                <Text style={[styles.bismillah, { fontSize: arabicFontSize }]}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </Text>
              </View>
            )}
            
            {fullSurah?.verses && fullSurah.verses.map((verse) => (
              <View key={verse.number} style={styles.verseContainer}>
                <View style={styles.verseCircle}>
                  <Text style={styles.verseNumberText}>{verse.number}</Text>
                </View>
                
                <View style={styles.verseTextContainer}>
                  <View style={styles.arabicContainer}>
                    <Text style={[styles.arabicText, { fontSize: arabicFontSize }]}>
                      {verse.arabic}
                    </Text>
                  </View>
                  
                  {showTranslation && (
                    <View style={styles.translationsContainer}>
                      <View style={styles.translationContainer}>
                        <Text style={[styles.translationText, { fontSize: translationFontSize }]}>
                          {verse.translation}
                        </Text>
                      </View>
                      
                      {verse.englishTransliteration && (
                        <View style={styles.transliterationContainer}>
                          <Text style={[
                            styles.transliterationText, 
                            { fontSize: translationFontSize - 2 }
                          ]}>
                            {verse.englishTransliteration}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
                
                <TouchableOpacity 
                  onPress={() => handleShareVerse(verse)}
                  style={styles.shareButton}
                >
                  <MaterialCommunityIcons name="share-variant" size={22} color="#2A8C4A" />
                </TouchableOpacity>
              </View>
            ))}
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                End of Surah {surah.englishName}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
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
  surahTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  surahSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  headerActions: {
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
  optionsSection: {
    marginBottom: 16,
  },
  optionsLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  fontSizeSliderContainer: {
    marginTop: 8,
  },
  fontSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fontSizeValue: {
    fontSize: 14,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleButton: {
    width: 50,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(42, 140, 74, 0.2)',
  },
  toggleButtonInactive: {
    backgroundColor: '#ddd',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  toggleKnobActive: {
    backgroundColor: '#2A8C4A',
    alignSelf: 'flex-end',
  },
  toggleKnobInactive: {
    backgroundColor: '#999',
    alignSelf: 'flex-start',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 8,
  },
  bismillahContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  bismillah: {
    color: '#2A8C4A',
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  verseContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2A8C4A',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
  },
  verseCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A8C4A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  verseNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  verseTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  arabicContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  arabicText: {
    textAlign: 'right',
    color: '#333',
    fontFamily: 'System',
    lineHeight: 46,
  },
  translationsContainer: {
    marginTop: 8,
  },
  translationContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  translationText: {
    color: '#555',
    lineHeight: 24,
    textAlign: 'left',
  },
  transliterationContainer: {
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  transliterationText: {
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  shareButton: {
    paddingTop: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
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

export default QuranTextView;