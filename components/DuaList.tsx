import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dua } from '../utils/duasData';

interface DuaListProps {
  duas: Dua[];
  onPressDua: (dua: Dua) => void;
  favorites: string[];
  onToggleFavorite: (duaId: string) => void;
}

export default function DuaList({ duas, onPressDua, favorites, onToggleFavorite }: DuaListProps) {
  const getDuaCategoryIcon = (category: string) => {
    switch (category) {
      case 'morning_evening':
        return 'weather-sunset';
      case 'daily':
        return 'coffee';
      case 'salah':
        return 'hands-pray';
      case 'protection':
        return 'shield-check';
      case 'forgiveness':
        return 'hand-heart';
      case 'quran':
        return 'book-open-variant';
      default:
        return 'hands-pray';
    }
  };

  const renderDuaItem = ({ item }: { item: Dua }) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <TouchableOpacity
        style={styles.duaItem}
        onPress={() => onPressDua(item)}
        activeOpacity={0.7}
      >
        <View style={styles.duaIconContainer}>
          <MaterialCommunityIcons
            name={getDuaCategoryIcon(item.category) as any}
            size={24}
            color="#2A8C4A"
          />
        </View>
        
        <View style={styles.duaDetails}>
          <Text style={styles.duaName}>{item.name}</Text>
          <View style={styles.categoryContainer}>
            {item.category.split('_').map((word, index) => (
              <Text key={index} style={styles.categoryText}>
                {word.charAt(0).toUpperCase() + word.slice(1)}
                {index < item.category.split('_').length - 1 ? ' ' : ''}
              </Text>
            ))}
          </View>
          {item.source && (
            <Text style={styles.duaSource}>Source: {item.source}</Text>
          )}
        </View>
        
        <View style={styles.duaActions}>
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
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#999"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={duas}
      renderItem={renderDuaItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  duaItem: {
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
  duaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  duaDetails: {
    flex: 1,
  },
  duaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  duaSource: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  duaActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
  separator: {
    height: 8,
  },
});