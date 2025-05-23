import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHijriAdjustment, setHijriAdjustment } from '../utils/hijriDate';
import { useTheme } from '../context/ThemeContext';

interface HijriAdjustmentDialogProps {
  visible: boolean;
  onClose: () => void;
  onAdjustmentChange: () => void;
}

export default function HijriAdjustmentDialog({
  visible,
  onClose,
  onAdjustmentChange
}: HijriAdjustmentDialogProps) {
  const { theme } = useTheme();
  const [adjustment, setAdjustment] = useState(0);
  
  // Load current adjustment when dialog opens
  useEffect(() => {
    if (visible) {
      setAdjustment(getHijriAdjustment());
    }
  }, [visible]);
  
  const handleIncrement = () => {
    setAdjustment(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setAdjustment(prev => prev - 1);
  };
  
  const handleReset = () => {
    setAdjustment(0);
  };
  
  const handleSave = async () => {
    await setHijriAdjustment(adjustment);
    onAdjustmentChange();
    onClose();
  };
  
  // Close the dialog when clicking outside (modal background)
  const handleBackdropPress = () => {
    onClose();
  };
  
  // Prevent closing when pressing on the dialog itself
  const handleDialogPress = (e: any) => {
    e.stopPropagation();
  };
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={[styles.overlay, { backgroundColor: theme.isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }]}>
          <TouchableWithoutFeedback onPress={handleDialogPress}>
            <View style={[styles.dialogContainer, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.primaryText }]}>Adjust Islamic Date</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={22} color={theme.colors.primaryText} />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
                Adjust the Hijri date if it doesn't match your local observation.
              </Text>
              
              <View style={styles.adjustmentContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.colors.primaryLight }]}
                  onPress={handleDecrement}
                >
                  <MaterialCommunityIcons name="minus" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
                
                <View style={styles.adjustmentValue}>
                  <Text style={[styles.adjustmentValueText, { color: theme.colors.primaryText }]}>
                    {adjustment > 0 ? '+' : ''}{adjustment}
                  </Text>
                  <Text style={[styles.adjustmentLabel, { color: theme.colors.secondaryText }]}>
                    {Math.abs(adjustment) === 1 ? 'day' : 'days'}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.colors.primaryLight }]}
                  onPress={handleIncrement}
                >
                  <MaterialCommunityIcons name="plus" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.resetButton, { borderColor: theme.colors.primary }]}
                  onPress={handleReset}
                >
                  <Text style={[styles.resetButtonText, { color: theme.colors.primary }]}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.note, { color: theme.colors.tertiaryText }]}>
                Note: This adjustment will be applied globally to all Islamic dates in the app.
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContainer: {
    width: '85%',
    maxWidth: 340,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  adjustmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustmentValue: {
    alignItems: 'center',
  },
  adjustmentValueText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  adjustmentLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
  }
});