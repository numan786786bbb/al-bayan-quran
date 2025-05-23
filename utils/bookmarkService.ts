import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const SURAH_BOOKMARKS_KEY = 'quran_surah_bookmarks';
const AYAH_BOOKMARKS_KEY = 'quran_ayah_bookmarks';

export interface SurahBookmark {
  surahNumber: number;
  surahName: string;
  timestamp: number;
  englishName: string;
}

export interface AyahBookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  translation: string;
  timestamp: number;
}

/**
 * Add a Surah bookmark
 */
export async function addSurahBookmark(surah: { 
  number: string | number;
  englishName: string;
  name?: string;
}): Promise<void> {
  try {
    // Get existing bookmarks
    const existingBookmarks = await getSurahBookmarks();
    
    // Convert number to consistent format
    const surahNumber = typeof surah.number === 'string' ? parseInt(surah.number) : surah.number;
    
    // Check if already bookmarked
    if (existingBookmarks.some(bookmark => bookmark.surahNumber === surahNumber)) {
      return; // Already bookmarked
    }
    
    // Add new bookmark
    const newBookmark: SurahBookmark = {
      surahNumber,
      surahName: surah.name || '',
      englishName: surah.englishName,
      timestamp: Date.now()
    };
    
    // Save updated bookmarks
    await AsyncStorage.setItem(
      SURAH_BOOKMARKS_KEY, 
      JSON.stringify([...existingBookmarks, newBookmark])
    );
  } catch (error) {
    console.error('Error adding Surah bookmark:', error);
  }
}

/**
 * Remove a Surah bookmark
 */
export async function removeSurahBookmark(surahNumber: number): Promise<void> {
  try {
    // Get existing bookmarks
    const existingBookmarks = await getSurahBookmarks();
    
    // Filter out the bookmark to remove
    const updatedBookmarks = existingBookmarks.filter(
      bookmark => bookmark.surahNumber !== surahNumber
    );
    
    // Save updated bookmarks
    await AsyncStorage.setItem(
      SURAH_BOOKMARKS_KEY, 
      JSON.stringify(updatedBookmarks)
    );
  } catch (error) {
    console.error('Error removing Surah bookmark:', error);
  }
}

/**
 * Get all Surah bookmarks
 */
export async function getSurahBookmarks(): Promise<SurahBookmark[]> {
  try {
    const bookmarksJson = await AsyncStorage.getItem(SURAH_BOOKMARKS_KEY);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  } catch (error) {
    console.error('Error getting Surah bookmarks:', error);
    return [];
  }
}

/**
 * Check if a Surah is bookmarked
 */
export async function isSurahBookmarked(surahNumber: number): Promise<boolean> {
  try {
    const bookmarks = await getSurahBookmarks();
    return bookmarks.some(bookmark => bookmark.surahNumber === surahNumber);
  } catch (error) {
    console.error('Error checking Surah bookmark:', error);
    return false;
  }
}

/**
 * Add an Ayah bookmark
 */
export async function addAyahBookmark(surah: { 
  number: string | number;
  englishName: string;
  name?: string;
}, ayah: {
  number: number;
  arabic: string;
  translation: string;
}): Promise<void> {
  try {
    // Get existing bookmarks
    const existingBookmarks = await getAyahBookmarks();
    
    // Convert surah number to consistent format
    const surahNumber = typeof surah.number === 'string' ? parseInt(surah.number) : surah.number;
    
    // Check if already bookmarked
    if (existingBookmarks.some(bookmark => 
      bookmark.surahNumber === surahNumber && bookmark.ayahNumber === ayah.number
    )) {
      return; // Already bookmarked
    }
    
    // Add new bookmark
    const newBookmark: AyahBookmark = {
      surahNumber,
      surahName: surah.name || '',
      ayahNumber: ayah.number,
      ayahText: ayah.arabic,
      translation: ayah.translation,
      timestamp: Date.now()
    };
    
    // Save updated bookmarks
    await AsyncStorage.setItem(
      AYAH_BOOKMARKS_KEY, 
      JSON.stringify([...existingBookmarks, newBookmark])
    );
  } catch (error) {
    console.error('Error adding Ayah bookmark:', error);
  }
}

/**
 * Remove an Ayah bookmark
 */
export async function removeAyahBookmark(
  surahNumber: number, 
  ayahNumber: number
): Promise<void> {
  try {
    // Get existing bookmarks
    const existingBookmarks = await getAyahBookmarks();
    
    // Filter out the bookmark to remove
    const updatedBookmarks = existingBookmarks.filter(
      bookmark => !(bookmark.surahNumber === surahNumber && bookmark.ayahNumber === ayahNumber)
    );
    
    // Save updated bookmarks
    await AsyncStorage.setItem(
      AYAH_BOOKMARKS_KEY, 
      JSON.stringify(updatedBookmarks)
    );
  } catch (error) {
    console.error('Error removing Ayah bookmark:', error);
  }
}

/**
 * Get all Ayah bookmarks
 */
export async function getAyahBookmarks(): Promise<AyahBookmark[]> {
  try {
    const bookmarksJson = await AsyncStorage.getItem(AYAH_BOOKMARKS_KEY);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  } catch (error) {
    console.error('Error getting Ayah bookmarks:', error);
    return [];
  }
}

/**
 * Check if an Ayah is bookmarked
 */
export async function isAyahBookmarked(
  surahNumber: number, 
  ayahNumber: number
): Promise<boolean> {
  try {
    const bookmarks = await getAyahBookmarks();
    return bookmarks.some(
      bookmark => bookmark.surahNumber === surahNumber && bookmark.ayahNumber === ayahNumber
    );
  } catch (error) {
    console.error('Error checking Ayah bookmark:', error);
    return false;
  }
}

/**
 * Clear all bookmarks
 */
export async function clearAllBookmarks(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([SURAH_BOOKMARKS_KEY, AYAH_BOOKMARKS_KEY]);
  } catch (error) {
    console.error('Error clearing bookmarks:', error);
  }
}