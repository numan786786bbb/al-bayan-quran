import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surah } from './quranData';

/**
 * Fetch complete Surah with verses
 */
export async function fetchSurahWithVerses(surahNumber: number): Promise<Surah | null> {
  try {
    // Try to get from AsyncStorage first
    const cacheKey = `quran_surah_${surahNumber}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    // If not in cache, use local data
    const { default: mockData } = await import('./quranData');
    const mockSurah = mockData.find((s) => s.number === surahNumber);
    
    if (mockSurah) {
      // Cache for future use
      await AsyncStorage.setItem(cacheKey, JSON.stringify(mockSurah));
    }
    
    return mockSurah || null;
    
  } catch (error) {
    console.error(`Error fetching Surah ${surahNumber}:`, error);
    return null;
  }
}

/**
 * Clear Quran data cache
 */
export async function clearQuranCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const quranCacheKeys = keys.filter(key => key.startsWith('quran_surah_'));
    if (quranCacheKeys.length > 0) {
      await AsyncStorage.multiRemove(quranCacheKeys);
    }
  } catch (error) {
    console.error('Error clearing Quran cache:', error);
  }
}