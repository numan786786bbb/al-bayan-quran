import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for tasbihat
const TASBIHAT_STORAGE_KEY = 'stored_tasbihat';

export interface Tasbih {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  target: number;
  count: number;
}

/**
 * Get all stored tasbihat
 */
export async function getStoredTasbihat(): Promise<Tasbih[]> {
  try {
    const tasbihatJson = await AsyncStorage.getItem(TASBIHAT_STORAGE_KEY);
    return tasbihatJson ? JSON.parse(tasbihatJson) : [];
  } catch (error) {
    console.error('Error getting stored tasbihat:', error);
    return [];
  }
}

/**
 * Add a new tasbih
 */
export async function addTasbih(tasbih: Tasbih): Promise<void> {
  try {
    const existingTasbihat = await getStoredTasbihat();
    
    // Check if tasbih with same text already exists
    if (existingTasbihat.some(t => t.arabic === tasbih.arabic)) {
      throw new Error('This tasbih already exists');
    }
    
    // Add new tasbih
    const updatedTasbihat = [...existingTasbihat, tasbih];
    await AsyncStorage.setItem(TASBIHAT_STORAGE_KEY, JSON.stringify(updatedTasbihat));
  } catch (error) {
    console.error('Error adding tasbih:', error);
    throw error;
  }
}

/**
 * Update tasbih count
 */
export async function updateTasbihCount(tasbihId: string, newCount: number): Promise<void> {
  try {
    const existingTasbihat = await getStoredTasbihat();
    
    const updatedTasbihat = existingTasbihat.map(tasbih => 
      tasbih.id === tasbihId 
        ? { ...tasbih, count: newCount }
        : tasbih
    );
    
    await AsyncStorage.setItem(TASBIHAT_STORAGE_KEY, JSON.stringify(updatedTasbihat));
  } catch (error) {
    console.error('Error updating tasbih count:', error);
    throw error;
  }
}

/**
 * Remove a tasbih
 */
export async function removeTasbih(tasbihId: string): Promise<void> {
  try {
    const existingTasbihat = await getStoredTasbihat();
    
    const updatedTasbihat = existingTasbihat.filter(
      tasbih => tasbih.id !== tasbihId
    );
    
    await AsyncStorage.setItem(TASBIHAT_STORAGE_KEY, JSON.stringify(updatedTasbihat));
  } catch (error) {
    console.error('Error removing tasbih:', error);
    throw error;
  }
}

/**
 * Reset all tasbih counts
 */
export async function resetAllCounts(): Promise<void> {
  try {
    const existingTasbihat = await getStoredTasbihat();
    
    const updatedTasbihat = existingTasbihat.map(tasbih => ({
      ...tasbih,
      count: 0
    }));
    
    await AsyncStorage.setItem(TASBIHAT_STORAGE_KEY, JSON.stringify(updatedTasbihat));
  } catch (error) {
    console.error('Error resetting tasbih counts:', error);
    throw error;
  }
}

/**
 * Clear all stored tasbihat
 */
export async function clearAllTasbihat(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TASBIHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasbihat:', error);
    throw error;
  }
}