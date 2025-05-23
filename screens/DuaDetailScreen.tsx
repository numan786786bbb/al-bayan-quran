import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dua } from '../utils/duasData';
import analytics from '../utils/analytics';

const { width } = Dimensions.get('window');

export default function DuaDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { dua } = route.params as { dua: Dua };
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Dynamically set font sizes based on the selected size
  const arabicFontSize = fontSize === 'small' ? 24 : fontSize === 'medium' ? 28 : 32;
  const translationFontSize = fontSize === 'small' ? 14 : fontSize === 'medium' ? 16 : 18;
  
  useEffect(() => {
    // Track screen view for analytics
    analytics.trackScreenView(`Dua Detail: ${dua.name}`);
  }, [dua.name]);
  
  const handleShare = async () => {
    try {
      await Share.share({        message: `${dua.name}\n\n${dua.arabicText}\n\n${dua.translation_en}\n\nSource: ${dua.source || 'Unknown'}\n\nShared from Al-Bayan Quran App`,
      });
      analytics.trackFeatureUsage('Share Dua');
    } catch (error) {
      console.error('Error sharing dua:', error);
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    analytics.trackFeatureUsage(isFavorite ? 'Remove Dua from Favorites' : 'Add Dua to Favorites');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{dua.name}</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={toggleFavorite}
          >
            <MaterialCommunityIcons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#e74c3c" : "#333"} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.optionsBar}>
        <View style={styles.fontSizeControls}>
          <Text style={styles.optionsLabel}>Font Size:</Text>
          <View style={styles.fontSizeButtons}>
            <TouchableOpacity 
              onPress={() => setFontSize('small')}
              style={[styles.fontSizeButton, fontSize === 'small' && styles.activeFontSize]}
            >
              <Text style={[styles.fontSizeText, fontSize === 'small' && styles.activeFontSizeText]}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setFontSize('medium')}
              style={[styles.fontSizeButton, fontSize === 'medium' && styles.activeFontSize]}
            >
              <Text style={[styles.fontSizeText, fontSize === 'medium' && styles.activeFontSizeText]}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setFontSize('large')}
              style={[styles.fontSizeButton, fontSize === 'large' && styles.activeFontSize]}
            >
              <Text style={[styles.fontSizeText, fontSize === 'large' && styles.activeFontSizeText]}>A</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.transliterationToggle}
          onPress={() => setShowTransliteration(!showTransliteration)}
        >
          <Text style={[
            styles.transliterationText, 
            showTransliteration && styles.activeTransliterationText
          ]}>
            Transliteration
          </Text>
          <MaterialCommunityIcons 
            name={showTransliteration ? "check-circle" : "circle-outline"} 
            size={20} 
            color={showTransliteration ? "#2A8C4A" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.duaContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {dua.category.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
          </View>
          
          <Text style={[styles.arabicText, { fontSize: arabicFontSize }]}>
            {dua.arabicText}
          </Text>
          
          {showTransliteration && (
            <Text style={styles.transliterationContent}>
              [Transliteration would appear here]
            </Text>
          )}
          
          <View style={styles.translationContainer}>
            <View style={styles.translationHeader}>
              <MaterialCommunityIcons name="translate" size={16} color="#2A8C4A" />
              <Text style={styles.translationLabel}>English Translation</Text>
            </View>
            <Text style={[styles.translationText, { fontSize: translationFontSize }]}>
              {dua.translation_en}
            </Text>
          </View>
          
          <View style={styles.translationContainer}>
            <View style={styles.translationHeader}>
              <MaterialCommunityIcons name="translate" size={16} color="#2A8C4A" />
              <Text style={styles.translationLabel}>Urdu Translation</Text>
            </View>
            <Text style={[styles.urduText, { fontSize: translationFontSize }]}>
              {dua.translation_ur}
            </Text>
          </View>
          
          {dua.source && (
            <View style={styles.sourceContainer}>
              <MaterialCommunityIcons name="book-open-variant" size={16} color="#666" />
              <Text style={styles.sourceText}>Source: {dua.source}</Text>
            </View>
          )}
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {
                // Play audio would be implemented here
              }}
            >
              <View style={styles.actionButtonContent}>
                <MaterialCommunityIcons name="play-circle" size={24} color="#2A8C4A" />
                <Text style={styles.actionButtonText}>Play Audio</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <View style={styles.actionButtonContent}>
                <MaterialCommunityIcons name="share-variant" size={24} color="#2A8C4A" />
                <Text style={styles.actionButtonText}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Benefits & Virtues</Text>
            <Text style={styles.benefitsText}>
              This dua is recommended to recite for seeking blessings and protection. Regular recitation helps in strengthening faith and bringing peace to the heart.
            </Text>
          </View>
          
          <View style={styles.whenToReciteContainer}>
            <Text style={styles.whenToReciteTitle}>When to Recite</Text>
            <Text style={styles.whenToReciteText}>
              This dua can be recited at any time, but is especially beneficial during {dua.category.includes('morning') ? 'morning hours' : dua.category.includes('evening') ? 'evening hours' : 'times of need'}.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
  },
  optionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  fontSizeButtons: {
    flexDirection: 'row',
  },
  fontSizeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 2,
    backgroundColor: '#f5f5f5',
  },
  activeFontSize: {
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
  },
  fontSizeText: {
    color: '#666',
    fontWeight: '600',
  },
  activeFontSizeText: {
    color: '#2A8C4A',
  },
  transliterationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transliterationText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  activeTransliterationText: {
    color: '#2A8C4A',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  duaContainer: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  categoryText: {
    color: '#2A8C4A',
    fontSize: 12,
    fontWeight: '600',
  },
  arabicText: {
    textAlign: 'right',
    lineHeight: 1.6 * 32, // Adjust line height based on largest font size
    color: '#333',
    marginBottom: 20,
    fontFamily: 'System',
  },
  transliterationContent: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 24,
  },
  translationContainer: {
    marginBottom: 20,
  },
  translationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  translationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A8C4A',
    marginLeft: 6,
  },
  translationText: {
    color: '#333',
    lineHeight: 24,
  },
  urduText: {
    textAlign: 'right',
    color: '#333',
    lineHeight: 28,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: 12,
    borderRadius: 8,
  },
  sourceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 16,
  },
  actionButtonContent: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#2A8C4A',
    marginTop: 4,
  },
  benefitsContainer: {
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  benefitsText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  whenToReciteContainer: {
    marginBottom: 16,
  },
  whenToReciteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  whenToReciteText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});