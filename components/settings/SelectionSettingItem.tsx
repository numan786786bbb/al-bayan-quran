import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface SelectionOption {
  label: string;
  value: string;
}

interface SelectionSettingItemProps {
  label: string;
  selectedValue: string;
  options: SelectionOption[];
  onValueChange: (newValue: string) => void;
  description?: string;
  disabled?: boolean;
}

export default function SelectionSettingItem({
  label,
  selectedValue,
  options,
  onValueChange,
  description,
  disabled = false
}: SelectionSettingItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  
  const selectedOption = options.find(option => option.value === selectedValue);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container, 
          { 
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.divider
          },
          disabled && styles.disabled
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: theme.colors.primaryText }]}>{label}</Text>
          {description && <Text style={[styles.description, { color: theme.colors.secondaryText }]}>{description}</Text>}
        </View>
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: theme.colors.secondaryText }]}>{selectedOption?.label || ''}</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color={theme.colors.tertiaryText} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.divider }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.primaryText }]}>{label}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.primaryText} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    { borderBottomColor: theme.colors.divider },
                    item.value === selectedValue && [
                      styles.selectedOption,
                      { backgroundColor: theme.colors.primaryLight }
                    ]
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.colors.primaryText },
                      item.value === selectedValue && [
                        styles.selectedOptionText,
                        { color: theme.colors.primary }
                      ]
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === selectedValue && (
                    <MaterialCommunityIcons
                      name="check"
                      size={22}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  disabled: {
    opacity: 0.6,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  optionsList: {
    paddingHorizontal: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: 'rgba(42, 140, 74, 0.08)',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: '600',
    color: '#2A8C4A',
  },
});