import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache keys
const TRANSLATION_CACHE_PREFIX = 'translation_';
const DEFAULT_TRANSLATION = 'en.sahih';

/**
 * Gets the translation for a verse
 * 
 * @param surahNumber Surah number
 * @param verseNumber Verse number
 * @param translationId Translation identifier
 * @returns The translated text or null if not found
 */
export async function getVerseTranslation(
  surahNumber: number,
  verseNumber: number,
  translationId: string = DEFAULT_TRANSLATION
): Promise<string | null> {
  try {
    // For built-in translations, we use the API
    if (!translationId.startsWith('custom.')) {
      return await fetchTranslationFromAPI(surahNumber, verseNumber, translationId);
    }
    
    // For custom translations, we get from AsyncStorage
    const translationKey = `${surahNumber}:${verseNumber}`;
    const customTranslationsJson = await AsyncStorage.getItem(`${TRANSLATION_CACHE_PREFIX}${translationId}`);
    
    if (customTranslationsJson) {
      const translations = JSON.parse(customTranslationsJson);
      return translations[translationKey] || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting verse translation:', error);
    return null;
  }
}

/**
 * Fetch translation from an external API
 */
async function fetchTranslationFromAPI(
  surahNumber: number,
  verseNumber: number,
  translationId: string
): Promise<string | null> {
  try {
    // First check local cache
    const cacheKey = `${TRANSLATION_CACHE_PREFIX}${translationId}_${surahNumber}_${verseNumber}`;
    const cachedTranslation = await AsyncStorage.getItem(cacheKey);
    
    if (cachedTranslation) {
      return cachedTranslation;
    }

    // If not in cache, try to get from local data first
    const { default: quranData } = await import('./quranData');
    const surah = quranData.find(s => s.number === surahNumber);
    if (surah) {
      const verse = surah.verses.find(v => v.number === verseNumber);
      if (verse) {
        // If we have the translation in our local data, use it
        const translation = verse.translation;
        if (translation) {
          // Cache it for future use
          await AsyncStorage.setItem(cacheKey, translation);
          return translation;
        }
      }
    }
    
    // If we don't have it locally, try the API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${surahNumber}:${verseNumber}/${translationId}`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (data.code === 200 && data.status === 'OK') {
        const translation = data.data.text;
        await AsyncStorage.setItem(cacheKey, translation);
        return translation;
      }
    } catch (fetchError) {
      console.warn('API fetch failed, using fallback:', fetchError);
    }

    // If API fails, return the local translation or null
    return surah?.verses.find(v => v.number === verseNumber)?.translation || null;
  } catch (error) {
    console.error('Error in translation service:', error);
    return null;
  }
}

/**
 * Get the currently selected translation ID
 */
export async function getCurrentTranslation(): Promise<string> {
  try {
    const translationId = await AsyncStorage.getItem('current_translation');
    return translationId || DEFAULT_TRANSLATION;
  } catch (error) {
    console.error('Error getting current translation:', error);
    return DEFAULT_TRANSLATION;
  }
}

/**
 * Set the current translation ID
 */
export async function setCurrentTranslation(translationId: string): Promise<void> {
  try {
    await AsyncStorage.setItem('current_translation', translationId);
  } catch (error) {
    console.error('Error setting current translation:', error);
  }
}

/**
 * Clear translation cache for a specific translation or all translations
 */
export async function clearTranslationCache(translationId?: string): Promise<void> {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    
    // Filter out translation-related cache keys
    const translationCacheKeys = keys.filter(key => {
      if (translationId) {
        // If a specific translation ID is provided, only clear that cache
        return key.startsWith(`${TRANSLATION_CACHE_PREFIX}${translationId}`);
      }
      // Otherwise clear all translation caches except custom translations
      return key.startsWith(TRANSLATION_CACHE_PREFIX) && 
             !key.startsWith(`${TRANSLATION_CACHE_PREFIX}custom.`);
    });
    
    // Remove all matching cache keys
    if (translationCacheKeys.length > 0) {
      await AsyncStorage.multiRemove(translationCacheKeys);
    }
  } catch (error) {
    console.error('Error clearing translation cache:', error);
  }
}