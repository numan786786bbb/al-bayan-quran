import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SurahListItem from './quran/SurahListItem';
import surahListData, { Surah } from '../utils/surahData';

interface SurahListProps {
  surahs: Surah[];
  onSelectSurah: (surah: Surah) => void;
}

export default function SurahList({ surahs, onSelectSurah }: SurahListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SurahListItem 
            surah={item as any} 
            onPress={onSelectSurah} 
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 10,
  },
});