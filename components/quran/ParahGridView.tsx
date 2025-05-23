import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ParahListItem from './ParahListItem';
import { PARAH_DATA, Parah } from '../../utils/quranData';

interface ParahGridViewProps {
  onParahPress: (parah: Parah) => void;
}

const ParahGridView: React.FC<ParahGridViewProps> = ({ onParahPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={PARAH_DATA}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <ParahListItem 
            parah={item} 
            onPress={() => onParahPress(item)} 
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
    paddingHorizontal: 10,
    paddingBottom: 30, // Extra padding at bottom for better scrolling
  }
});

export default ParahGridView;