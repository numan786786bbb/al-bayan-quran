import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MuhammadName } from '../utils/muhammadNamesData';
import analytics from '../utils/analytics';

export default function MuhammadNameDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params as { name: MuhammadName };
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Dynamically set font sizes based on the selected size
  const arabicFontSize = fontSize === 'small' ? 36 : fontSize === 'medium' ? 42 : 48;
  const translationFontSize = fontSize === 'small' ? 14 : fontSize === 'medium' ? 16 : 18;
  
  useEffect(() => {
    // Track screen view for analytics
    analytics.trackScreenView(`Muhammad Name Detail: ${name.transliteration}`);
  }, [name.transliteration]);
  
  const handleShare = async () => {
    try {
      await Share.share({        message: `${name.arabic} - ${name.transliteration}\n\n${name.englishMeaning}\n${name.urduMeaning}\n\nShared from Al-Bayan Quran App`,
      });
      analytics.trackFeatureUsage('Share Muhammad Name');
    } catch (error) {
      console.error('Error sharing Muhammad name:', error);
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    analytics.trackFeatureUsage(isFavorite ? 'Remove Name from Favorites' : 'Add Name to Favorites');
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
          <Text style={styles.title}>{name.transliteration}</Text>
          <Text style={styles.numberLabel}>Name {name.number} of Prophet Muhammad ﷺ</Text>
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
      
      <View style={styles.fontSizeControls}>
        <Text style={styles.fontSizeLabel}>Font Size:</Text>
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
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.nameContainer}>
          <View style={styles.arabicContainer}>
            <Text style={[styles.arabicText, { fontSize: arabicFontSize }]}>
              {name.arabic}
            </Text>
          </View>
          
          <View style={styles.transliterationContainer}>
            <Text style={styles.transliterationText}>{name.transliteration}</Text>
          </View>

          <Image
            source={{ uri: `https://api.a0.dev/assets/image?text=islamic%20calligraphy%20of%20${name.transliteration}%20prophet%20muhammad%20name%20with%20floral%20ornaments&aspect=16:9` }}
            style={styles.calligraphyImage}
            resizeMode="contain"
          />
          
          <View style={styles.meaningContainer}>
            <View style={styles.meaningSection}>
              <Text style={styles.meaningLabel}>English Meaning:</Text>
              <Text style={[styles.englishMeaning, { fontSize: translationFontSize }]}>
                {name.englishMeaning}
              </Text>
            </View>
            
            <View style={styles.meaningSection}>
              <Text style={styles.meaningLabel}>Urdu Meaning:</Text>
              <Text style={[styles.urduMeaning, { fontSize: translationFontSize }]}>
                {name.urduMeaning}
              </Text>
            </View>
          </View>
          
          {name.benefits && (
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Benefits & Virtues</Text>
              <Text style={[styles.benefitsText, { fontSize: translationFontSize }]}>
                {name.benefits}
              </Text>
            </View>
          )}
          
          {name.reference && (
            <View style={styles.referenceContainer}>
              <Text style={styles.referenceTitle}>References</Text>
              <Text style={[styles.referenceText, { fontSize: translationFontSize }]}>
                {name.reference}
              </Text>
            </View>
          )}
          
          <View style={styles.salatContainer}>
            <Text style={styles.salatTitle}>Salat and Salam</Text>
            <Text style={[styles.salatText, { fontSize: translationFontSize }]}>
              اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ
            </Text>
            <Text style={[styles.salatTranslation, { fontSize: translationFontSize - 2 }]}>
              O Allah, send Your Mercy on Muhammad and on the family of Muhammad, as You sent Your Mercy on Ibrahim and on the family of Ibrahim, for You are the Most Praiseworthy, the Most Glorious.
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
            {name.number > 1 && (
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => {
                  // Navigate to previous name
                  // This is just a placeholder. In reality, you would need to
                  // fetch the previous name from your data source
                }}
              >
                <MaterialCommunityIcons name="chevron-left" size={20} color="#2A8C4A" />
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            
            <View style={styles.spacer} />
            
            {name.number < 99 && (
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => {
                  // Navigate to next name
                  // This is just a placeholder. In reality, you would need to
                  // fetch the next name from your data source
                }}
              >
                <Text style={styles.navButtonText}>Next</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#2A8C4A" />
              </TouchableOpacity>
            )}
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
  numberLabel: {
    fontSize: 12,
    color: '#666',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fontSizeLabel: {
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
  scrollView: {
    flex: 1,
  },
  nameContainer: {
    padding: 16,
  },
  arabicContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  arabicText: {
    color: '#2A8C4A',
    textAlign: 'center',
    fontFamily: 'System',
  },
  transliterationContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  transliterationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  calligraphyImage: {
    width: '100%',
    height: 150,
    marginBottom: 24,
    borderRadius: 8,
  },
  meaningContainer: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  meaningSection: {
    marginBottom: 16,
  },
  meaningLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A8C4A',
    marginBottom: 8,
  },
  englishMeaning: {
    color: '#333',
    lineHeight: 24,
  },
  urduMeaning: {
    color: '#333',
    textAlign: 'right',
    lineHeight: 28,
  },
  benefitsContainer: {
    marginBottom: 16,
    backgroundColor: 'rgba(42, 140, 74, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A8C4A',
    marginBottom: 8,
  },
  benefitsText: {
    color: '#333',
    lineHeight: 22,
  },
  referenceContainer: {
    marginBottom: 16,
    backgroundColor: 'rgba(42, 140, 74, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A8C4A',
    marginBottom: 8,
  },
  referenceText: {
    color: '#333',
    lineHeight: 22,
  },
  salatContainer: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#2A8C4A',
  },
  salatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A8C4A',
    marginBottom: 12,
    textAlign: 'center',
  },
  salatText: {
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },
  salatTranslation: {
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A8C4A',
  },
  navButtonText: {
    color: '#2A8C4A',
    fontWeight: '600',
    marginHorizontal: 4,
  },
  spacer: {
    flex: 1,
  },
});