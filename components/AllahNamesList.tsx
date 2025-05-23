import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AllahName } from '../utils/allahNamesData';

interface AllahNamesListProps {
  names: AllahName[];
  onSelectName: (name: AllahName) => void;
  favorites: string[];
  onToggleFavorite: (nameId: string) => void;
}

export default function AllahNamesList({ 
  names, 
  onSelectName, 
  favorites,
  onToggleFavorite 
}: AllahNamesListProps) {
  
  const renderNameItem = ({ item }: { item: AllahName }) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <TouchableOpacity
        style={styles.nameItem}
        onPress={() => onSelectName(item)}
        activeOpacity={0.7}
      >
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{item.number}</Text>
        </View>
        
        <View style={styles.nameDetails}>
          <Text style={styles.transliteration}>{item.transliteration}</Text>
          <Text style={styles.arabic}>{item.arabic}</Text>
          <Text style={styles.meaning}>{item.englishMeaning}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(item.id)}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#e74c3c" : "#999"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={names}
      renderItem={renderNameItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  nameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A8C4A',
  },
  nameDetails: {
    flex: 1,
  },
  transliteration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  arabic: {
    fontSize: 20,
    color: '#2A8C4A',
    textAlign: 'left',
    marginBottom: 4,
    fontWeight: '500',
    fontFamily: 'System',
  },
  meaning: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
  separator: {
    height: 8,
  },
});