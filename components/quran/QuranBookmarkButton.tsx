import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { isSurahBookmarked, addSurahBookmark, removeSurahBookmark } from '../../utils/bookmarkService';

interface QuranBookmarkButtonProps {
  surah: {
    number: number;
    englishName: string;
    name?: string;
  };
  size?: number;
  color?: string;
}

export default function QuranBookmarkButton({ 
  surah, 
  size = 24,
  color = '#2A8C4A'
}: QuranBookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [surah.number]);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarked = await isSurahBookmarked(surah.number);
      setIsBookmarked(bookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await removeSurahBookmark(surah.number);
      } else {
        await addSurahBookmark(surah);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <TouchableOpacity onPress={toggleBookmark} style={styles.container}>
      <MaterialCommunityIcons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  }
});