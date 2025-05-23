import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuranTabsProps {
  activeTab: 'quran' | 'surah' | 'parah';
  onTabChange: (tab: 'quran' | 'surah' | 'parah') => void;
}

const QuranTabs: React.FC<QuranTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'surah' && styles.activeTab
        ]}
        onPress={() => onTabChange('surah')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'surah' && styles.activeTabText
        ]}>
          SURAH
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'parah' && styles.activeTab
        ]}
        onPress={() => onTabChange('parah')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'parah' && styles.activeTabText
        ]}>
          PARAH
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#2A8C4A',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A8C4A',
  },
  activeTabText: {
    color: '#ffffff',
  },
});

export default QuranTabs;