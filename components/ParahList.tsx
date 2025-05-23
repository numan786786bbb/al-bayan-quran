import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ParahTextView from './ParahTextView';
import { Parah } from '../utils/quranData';

interface ParahListProps {
  parahs: Parah[];
}

const ParahList: React.FC<ParahListProps> = ({ parahs }) => {
  const renderItem = ({ item }: { item: Parah }) => (
    <ParahTextView
      parahNumber={item.number}
      text={`${item.name} (${item.arabicName})\n${item.versesRange}`}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={parahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No parahs available</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});

export default ParahList;