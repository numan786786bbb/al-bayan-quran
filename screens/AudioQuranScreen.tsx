import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  TextInput
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import surahListData from '../utils/surahData';

export default function AudioQuranScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');  const [reciters, setReciters] = useState([
    { id: 'mishaari_raashid_al_3afaasee', name: 'Mishary Rashid Alafasy', language: 'Arabic' },
    { id: 'abdul_basit_murattal', name: 'Abdul Basit Abdus-Samad (Murattal)', language: 'Arabic' },
    { id: 'abu_bakr_ash-shaatree', name: 'Abu Bakr Al-Shatri', language: 'Arabic' },
    { id: 'sa3d_al-ghaamidi', name: 'Saad Al-Ghamdi', language: 'Arabic' },
    { id: 'hudhaify', name: 'Ali Al-Hudhaify', language: 'Arabic' },
    { id: 'maher_al_meaqli', name: 'Maher Al Muaiqly', language: 'Arabic' },
    { id: 'muhammad_jibreel', name: 'Muhammad Jibreel', language: 'Arabic' },
    { id: 'muhammad_ayyoub', name: 'Muhammad Ayyoub', language: 'Arabic' }
  ]);
  const [selectedReciter, setSelectedReciter] = useState('1');
  
  // Filter surahs based on search
  const filteredSurahs = searchQuery.trim() 
    ? surahListData.filter(surah => 
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.number.toString().includes(searchQuery))
    : surahListData;

  const handlePlaySurah = (surah) => {
    // Navigate to the audio player screen with the selected surah
    navigation.navigate('AudioPlayer' as never, { 
      surah,
      reciter: reciters.find(r => r.id === selectedReciter),
    } as never);
  };

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.surahItem}
      onPress={() => handlePlaySurah(item)}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{item.number}</Text>
      </View>
      
      <View style={styles.surahDetails}>
        <Text style={styles.surahName}>{item.englishName}</Text>
        <Text style={styles.surahInfo}>
          {item.revelationType} • {item.verseCount || item.numberOfAyahs} Verses
        </Text>
      </View>
      
      <MaterialCommunityIcons name="play-circle" size={28} color="#2A8C4A" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Audio Quran</Text>
        
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.reciterSelector}>
        <Text style={styles.sectionTitle}>Reciter</Text>
        <ScrollableReciterList 
          reciters={reciters}
          selectedReciter={selectedReciter}
          onSelectReciter={setSelectedReciter}
        />
      </View>
      
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search surah by name or number"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => item.id}
        renderItem={renderSurahItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Scrollable component for reciter selection
const ScrollableReciterList = ({ reciters, selectedReciter, onSelectReciter }) => (
  <FlatList
    horizontal
    data={reciters}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.reciterList}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          styles.reciterItem,
          selectedReciter === item.id && styles.selectedReciterItem
        ]}
        onPress={() => onSelectReciter(item.id)}
      >
        <MaterialCommunityIcons 
          name="microphone" 
          size={16} 
          color={selectedReciter === item.id ? 'white' : '#2A8C4A'} 
        />
        <Text style={[
          styles.reciterName,
          selectedReciter === item.id && styles.selectedReciterName
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    width: 40, // Match the width of backButton for centering
  },
  reciterSelector: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  reciterList: {
    paddingBottom: 8,
  },
  reciterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#2A8C4A',
  },
  selectedReciterItem: {
    backgroundColor: '#2A8C4A',
  },
  reciterName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2A8C4A',
    marginLeft: 8,
  },
  selectedReciterName: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
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
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A8C4A',
  },
  surahDetails: {
    flex: 1,
  },
  surahName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  surahInfo: {
    fontSize: 13,
    color: '#666',
  },
});