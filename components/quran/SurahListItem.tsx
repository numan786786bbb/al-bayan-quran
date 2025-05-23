import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Surah } from '../../utils/surahData';
import QuranBookmarkButton from './QuranBookmarkButton';
import QuranAudioControls from './QuranAudioControls';

interface SurahListItemProps {
  surah: Surah;
  onPress: (surah: Surah) => void;
}

const SurahListItem: React.FC<SurahListItemProps> = ({ surah, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity 
        style={styles.container}
        onPress={() => onPress(surah)}
        activeOpacity={0.7}
      >
        {/* Left side - Icons */}
        <View style={styles.leftSection}>
          <MaterialCommunityIcons name="book-open-page-variant" size={24} color="white" style={styles.mainIcon} />
        </View>

        {/* Middle section - Total Ruku and Verses */}
        <View style={styles.middleSection}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {surah.rukuCount}
            </Text>
            <View style={styles.countLabel}>
              <Text style={styles.labelText}>Total Ruku</Text>
            </View>
            <MaterialCommunityIcons name="book-open-variant" size={18} color="white" />
          </View>
          
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {surah.verseCount}
            </Text>
            <View style={styles.countLabel}>
              <Text style={styles.labelText}>Verses</Text>
            </View>
            <MaterialCommunityIcons name="format-list-numbered" size={18} color="white" />
          </View>
        </View>
        
        {/* Right section - Arabic name and number */}
        <View style={styles.rightSection}>
          <Text style={styles.arabicName}>{surah.arabicName}</Text>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>{surah.number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 6,
    marginHorizontal: 2,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#2A8C4A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  mainContent: {
    flexDirection: 'row',
    backgroundColor: '#2A8C4A',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  leftSection: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    color: 'white',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  countText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  countLabel: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  arabicName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 5,
    fontFamily: 'System',
    writingDirection: 'rtl',
  },
  numberCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  numberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurahListItem;