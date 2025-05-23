import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

interface QuranTranslationSelectorProps {
  currentTranslation: string;
  onTranslationChange: (translation: string) => void;
}

// Built-in translation options
const BUILT_IN_TRANSLATIONS = [
  { id: 'en.sahih', name: 'Sahih International (English)' },
  { id: 'ur.jalandhry', name: 'Jalandhry (Urdu)' },
  { id: 'ur.ahmedali', name: 'Ahmed Ali (Urdu)' },
];

export default function QuranTranslationSelector({ 
  currentTranslation, 
  onTranslationChange 
}: QuranTranslationSelectorProps) {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [jsonInputVisible, setJsonInputVisible] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [customTranslations, setCustomTranslations] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load custom translations on component mount
  React.useEffect(() => {
    loadCustomTranslations();
  }, []);
  
  const loadCustomTranslations = async () => {
    try {
      const customTranslationsJson = await AsyncStorage.getItem('custom_translations');
      if (customTranslationsJson) {
        const parsedTranslations = JSON.parse(customTranslationsJson);
        setCustomTranslations(parsedTranslations);
      }
    } catch (error) {
      console.error('Error loading custom translations:', error);
    }
  };  const handleAddCustomTranslation = async () => {
    if (!jsonInput.trim()) {
      // toast.error('Please enter valid JSON data');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Parse the JSON
      const parsedJson = JSON.parse(jsonInput);
      
      // Handle both the old format and the new format with ayahs array
      if (parsedJson.ayahs && Array.isArray(parsedJson.ayahs)) {
        // New format with ayahs array
        // Extract name from first entry or use default
        const translationName = parsedJson.metadata?.name || 'Custom Translation';
        
        // Generate a unique ID for this translation
        const translationId = `custom.${Date.now()}`;
        
        // Convert the ayahs array to the content object format
        const contentObj: Record<string, string> = {};
        parsedJson.ayahs.forEach((ayah: any) => {
          if (ayah.surah_number && ayah.verse_number && ayah.translation) {
            const key = `${ayah.surah_number}:${ayah.verse_number}`;
            contentObj[key] = ayah.translation;
          }
        });
        
        if (Object.keys(contentObj).length === 0) {
          throw new Error('No valid translations found in the JSON data');
        }
        
        // Save the translation content
        await AsyncStorage.setItem(`translation_${translationId}`, JSON.stringify(contentObj));
        
        // Add to custom translations list
        const newCustomTranslation = {
          id: translationId,
          name: translationName
        };
        
        const updatedCustomTranslations = [...customTranslations, newCustomTranslation];
        setCustomTranslations(updatedCustomTranslations);
        
        // Save updated list
        await AsyncStorage.setItem('custom_translations', JSON.stringify(updatedCustomTranslations));
        
        // Switch to this translation
        onTranslationChange(translationId);
        
        // Success message
        // toast.success(`Added "${translationName}" translation`);
        
      } else if (parsedJson.metadata && parsedJson.metadata.name && parsedJson.content) {
        // Original format
        const translationId = `custom.${Date.now()}`;
        
        // Save the translation content
        await AsyncStorage.setItem(`translation_${translationId}`, JSON.stringify(parsedJson.content));
        
        // Add to custom translations list
        const newCustomTranslation = {
          id: translationId,
          name: parsedJson.metadata.name
        };
        
        const updatedCustomTranslations = [...customTranslations, newCustomTranslation];
        setCustomTranslations(updatedCustomTranslations);
        
        // Save updated list
        await AsyncStorage.setItem('custom_translations', JSON.stringify(updatedCustomTranslations));
        
        // Switch to this translation
        onTranslationChange(translationId);
        
        // Success message
        // toast.success(`Added "${parsedJson.metadata.name}" translation`);
      } else {
        throw new Error('Invalid JSON format. Please check the example format below.');
      }
      
      // Clear input and close the input modal
      setJsonInput('');
      setJsonInputVisible(false);
      
    } catch (error) {
      console.error('Error adding custom translation:', error);
      // toast.error(error instanceof Error ? error.message : 'Failed to add translation');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveCustomTranslation = async (translationId: string) => {
    try {
      // Remove the translation content
      await AsyncStorage.removeItem(`translation_${translationId}`);
      
      // Update the list
      const updatedCustomTranslations = customTranslations.filter(
        translation => translation.id !== translationId
      );
      setCustomTranslations(updatedCustomTranslations);
      
      // Save updated list
      await AsyncStorage.setItem('custom_translations', JSON.stringify(updatedCustomTranslations));
      
      // If the current translation was removed, switch to the default
      if (currentTranslation === translationId) {
        onTranslationChange('en.sahih');
      }
      
      // toast.success('Translation removed');
    } catch (error) {
      console.error('Error removing custom translation:', error);
      // toast.error('Failed to remove translation');
    }
  };
  
  return (
    <>
      <TouchableOpacity 
        style={[styles.selectorButton, { borderColor: theme.colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="translate" size={20} color={theme.colors.primary} />
        <Text style={[styles.selectorText, { color: theme.colors.primary }]}>
          Change Translation
        </Text>
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.primaryText }]}>
                Select Translation
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.primaryText} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.translationsList}>
              <Text style={[styles.sectionTitle, { color: theme.colors.secondaryText }]}>
                Built-in Translations
              </Text>
              
              {BUILT_IN_TRANSLATIONS.map((translation) => (
                <TouchableOpacity
                  key={translation.id}
                  style={[
                    styles.translationItem,
                    currentTranslation === translation.id && 
                    { backgroundColor: theme.colors.primaryLight }
                  ]}
                  onPress={() => {
                    onTranslationChange(translation.id);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.translationName, 
                    { color: theme.colors.primaryText }
                  ]}>
                    {translation.name}
                  </Text>
                  {currentTranslation === translation.id && (
                    <MaterialCommunityIcons 
                      name="check" 
                      size={20} 
                      color={theme.colors.primary} 
                    />
                  )}
                </TouchableOpacity>
              ))}
              
              {customTranslations.length > 0 && (
                <>
                  <Text style={[
                    styles.sectionTitle, 
                    { color: theme.colors.secondaryText, marginTop: 20 }
                  ]}>
                    Custom Translations
                  </Text>
                  
                  {customTranslations.map((translation) => (
                    <View
                      key={translation.id}
                      style={[
                        styles.translationItem,
                        currentTranslation === translation.id && 
                        { backgroundColor: theme.colors.primaryLight }
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.translationNameContainer}
                        onPress={() => {
                          onTranslationChange(translation.id);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={[
                          styles.translationName, 
                          { color: theme.colors.primaryText }
                        ]}>
                          {translation.name}
                        </Text>
                      </TouchableOpacity>
                      
                      <View style={styles.translationActions}>
                        {currentTranslation === translation.id && (
                          <MaterialCommunityIcons 
                            name="check" 
                            size={20} 
                            color={theme.colors.primary} 
                            style={styles.checkIcon}
                          />
                        )}
                        <TouchableOpacity
                          onPress={() => handleRemoveCustomTranslation(translation.id)}
                        >
                          <MaterialCommunityIcons 
                            name="delete" 
                            size={20} 
                            color={theme.colors.error} 
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
            
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setJsonInputVisible(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color="white" />
              <Text style={styles.addButtonText}>Add Custom Translation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* JSON Input Modal */}
      <Modal
        visible={jsonInputVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setJsonInputVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.primaryText }]}>
                Add Custom Translation
              </Text>
              <TouchableOpacity onPress={() => setJsonInputVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.primaryText} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.jsonInputContainer}>
              <Text style={[styles.inputLabel, { color: theme.colors.secondaryText }]}>
                Paste your translation JSON below:
              </Text>
              <TextInput
                style={[
                  styles.jsonInput,
                  { 
                    color: theme.colors.primaryText,
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                  }
                ]}
                multiline
                numberOfLines={10}
                value={jsonInput}
                onChangeText={setJsonInput}
                placeholder="Paste JSON here"
                placeholderTextColor={theme.colors.tertiaryText}
              />              <Text style={[styles.jsonFormatNote, { color: theme.colors.tertiaryText }]}>
                The JSON can have either of these formats:
              </Text>
              <Text style={[styles.jsonExample, { color: theme.colors.secondaryText }]}>
{`// Format 1 (Recommended):
{
  "metadata": {
    "name": "My Translation Name"
  },
  "ayahs": [
    {
      "surah_number": 1,
      "verse_number": 1,
      "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      "translation": "اللہ نہایت رحمت والے بے حد رحم فرمانے والے کے نام سے۔"
    },
    {
      "surah_number": 1,
      "verse_number": 2,
      "text": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      "translation": "سب تعریفیں اللہ ہی کے لئے ہیں جو پرورش فرمانے والا ہے سب جہانوں کا۔"
    }
  ]
}

// Format 2:
{
  "metadata": {
    "name": "My Translation Name",
    "language": "urdu",
    "author": "Author Name"
  },
  "content": {
    "1:1": "ترجمہ کا متن",
    "1:2": "ترجمہ کا متن"
  }
}`}
              </Text>
              
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: theme.colors.primary },
                  isLoading && { opacity: 0.7 }
                ]}
                onPress={handleAddCustomTranslation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.submitButtonText}>Add Translation</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  selectorText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  translationsList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  translationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  translationNameContainer: {
    flex: 1,
  },
  translationName: {
    fontSize: 16,
  },
  translationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  jsonInputContainer: {
    padding: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  jsonInput: {
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  jsonFormatNote: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
  },
  jsonExample: {
    fontFamily: 'monospace',
    fontSize: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 16,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});