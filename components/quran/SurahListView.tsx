import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SurahListItem from './SurahListItem';
import surahListData, { Surah } from '../../utils/surahData';

interface SurahListViewProps {
  onSurahPress: (surah: Surah) => void;
}

const SurahListView: React.FC<SurahListViewProps> = ({ onSurahPress }) => {  return (
    <View style={styles.container}>
      <FlatList
        data={surahListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SurahListItem 
            surah={item} 
            onPress={() => onSurahPress(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 20,
  }
});

export default SurahListView;