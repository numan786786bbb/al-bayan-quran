import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Parah } from '../../utils/quranData';

interface ParahListItemProps {
  parah: Parah;
  onPress: (parah: Parah) => void;
}

const ParahListItem: React.FC<ParahListItemProps> = ({ parah, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(parah)}
    >
      <View style={styles.leftSection}>
        <MaterialCommunityIcons name="book-open-page-variant" size={24} color="white" style={styles.mainIcon} />
      </View>
      
      <View style={styles.middleSection}>
        <View style={styles.rukuContainer}>
          <Text style={styles.rukuText}>
            {parah.rukuCount} Total Ruku
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{parah.number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2A8C4A',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  leftSection: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    color: 'white',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rukuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rukuText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  rightSection: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParahListItem;