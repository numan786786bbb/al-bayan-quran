import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tasbih } from '../../utils/tasbihService';
import { useTheme } from '../../context/ThemeContext';

interface AddTasbihModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (tasbih: Tasbih) => void;
}

interface TasbihSuggestion {
  arabic: string;
  transliteration: string;
  translation: string;
  target: number;
}

// Common tasbihat suggestions
const SUGGESTIONS: TasbihSuggestion[] = [
  // Essential Daily Adhkar
  {
    arabic: 'سُبْحَانَ اللهِ',
    transliteration: 'Subhan Allah',
    translation: 'Glory be to Allah',
    target: 33,
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'All praise is due to Allah',
    target: 33,
  },
  {
    arabic: 'اللهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    target: 33,
  },
  {
    arabic: 'لَا إِلَهَ إِلَّا اللهُ',
    transliteration: 'La ilaha illallah',
    translation: 'There is no deity except Allah',
    target: 100,
  },
  // Morning & Evening Adhkar
  {
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    target: 100,
  },
  {
    arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
    transliteration: 'Subhanallahi wa bihamdihi',
    translation: 'Glory be to Allah and His is the praise',
    target: 100,
  },
  {
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'La hawla wa la quwwata illa billah',
    translation: 'There is no power or might except with Allah',
    target: 100,
  },
  // Protection Adhkar
  {
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',    transliteration: "Bismillahil-ladhi la yadurru ma\u2019as-mihi shay\u2019un fil-ardi wa la fis-sama\u2019i, wa huwas-sami\u2019ul-\u2019alim",
    translation: 'In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing',
    target: 3,
  },
  // After Prayer Adhkar
  {
    arabic: 'أَسْتَغْفِرُ اللَّهَ (3x) اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration: 'Astaghfirullah (3x) Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram',
    translation: 'I seek forgiveness from Allah (3x). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor',
    target: 1,
  },
  // Salawat on Prophet ﷺ
  {
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',    transliteration: "Allahumma salli ala Muhammadin wa ala aali Muhammad",
    translation: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad',
    target: 100,
  },
  // Last Three Surahs
  {
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    transliteration: 'Qul huwa Allahu ahad',
    translation: 'Say, He is Allah, [who is] One (Surah Al-Ikhlas)',
    target: 3,
  },
  {
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',    transliteration: "Qul audhu birabbil-falaq",
    translation: 'Say, I seek refuge in the Lord of daybreak (Surah Al-Falaq)',
    target: 3,
  },
  {
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',    transliteration: "Qul audhu birabbin-nas",
    translation: 'Say, I seek refuge in the Lord of mankind (Surah An-Nas)',
    target: 3,
  },
  // Ayat al-Kursi
  {
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining',
    target: 1,
  },
  // Istighfar
  {
    arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ العَظِيمِ',
    transliteration: 'Subhanallahi wa bihamdihi, subhanallahil-adhim',
    translation: 'Glory be to Allah and His is the praise, Glory be to Allah the Most Great',
    target: 100,
  },
];

export default function AddTasbihModal({ visible, onClose, onAdd }: AddTasbihModalProps) {
  const { theme } = useTheme();
  const [arabic, setArabic] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [translation, setTranslation] = useState('');
  const [target, setTarget] = useState('33');

  const handleAdd = () => {
    if (!arabic || !transliteration || !translation || !target) {
      return;
    }

    const newTasbih: Tasbih = {
      id: Date.now().toString(),
      arabic,
      transliteration,
      translation,
      target: parseInt(target),
      count: 0,
    };

    onAdd(newTasbih);
    resetForm();
  };

  const resetForm = () => {
    setArabic('');
    setTransliteration('');
    setTranslation('');
    setTarget('33');
  };

  const handleSelectSuggestion = (suggestion: TasbihSuggestion) => {
    setArabic(suggestion.arabic);
    setTransliteration(suggestion.transliteration);
    setTranslation(suggestion.translation);
    setTarget(suggestion.target.toString());
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primaryText }]}>
              Add New Tasbih
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons 
                name="close" 
                size={24} 
                color={theme.colors.primaryText} 
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
              Quick Add
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.suggestionsContainer}
            >
              {SUGGESTIONS.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.suggestionCard,
                    { backgroundColor: theme.colors.primaryLight }
                  ]}
                  onPress={() => handleSelectSuggestion(suggestion)}
                >
                  <Text style={[styles.suggestionArabic, { color: theme.colors.primary }]}>
                    {suggestion.arabic}
                  </Text>
                  <Text style={styles.suggestionTransliteration}>
                    {suggestion.transliteration}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
              Custom Tasbih
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.secondaryText }]}>
                Arabic Text
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: theme.colors.primaryText,
                    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : '#f5f5f5'
                  }
                ]}
                value={arabic}
                onChangeText={setArabic}
                placeholder="Enter Arabic text"
                placeholderTextColor={theme.colors.tertiaryText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.secondaryText }]}>
                Transliteration
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: theme.colors.primaryText,
                    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : '#f5f5f5'
                  }
                ]}
                value={transliteration}
                onChangeText={setTransliteration}
                placeholder="Enter transliteration"
                placeholderTextColor={theme.colors.tertiaryText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.secondaryText }]}>
                Translation
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: theme.colors.primaryText,
                    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : '#f5f5f5'
                  }
                ]}
                value={translation}
                onChangeText={setTranslation}
                placeholder="Enter translation"
                placeholderTextColor={theme.colors.tertiaryText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.secondaryText }]}>
                Target Count
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: theme.colors.primaryText,
                    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : '#f5f5f5'
                  }
                ]}
                value={target}
                onChangeText={setTarget}
                keyboardType="numeric"
                placeholder="Enter target count"
                placeholderTextColor={theme.colors.tertiaryText}
              />
            </View>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleAdd}
            >
              <Text style={styles.addButtonText}>Add Tasbih</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  suggestionCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 150,
  },
  suggestionArabic: {
    fontSize: 20,
    marginBottom: 4,
    textAlign: 'center',
  },
  suggestionTransliteration: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2A8C4A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});