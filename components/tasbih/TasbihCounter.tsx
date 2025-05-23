import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tasbih, updateTasbihCount } from '../../utils/tasbihService';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;

interface TasbihCounterProps {
  tasbih: Tasbih;
  onClose: () => void;
  onUpdate: () => void;
}

export default function TasbihCounter({ tasbih, onClose, onUpdate }: TasbihCounterProps) {
  const [count, setCount] = useState(tasbih.count);
  const [scale] = useState(new Animated.Value(1));
  
  const handleCount = async () => {
    if (count >= tasbih.target) {
      Vibration.vibrate([0, 100, 100, 100]);
      return;
    }
    
    Vibration.vibrate(50);
    const newCount = count + 1;
    setCount(newCount);
    
    // Animate the counter
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
    
    try {
      await updateTasbihCount(tasbih.id, newCount);
      if (newCount === tasbih.target) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };

  const handleReset = async () => {
    try {
      await updateTasbihCount(tasbih.id, 0);
      setCount(0);
      onUpdate();
    } catch (error) {
      console.error('Error resetting count:', error);
    }
  };

  const progress = count / tasbih.target;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.arabic}>{tasbih.arabic}</Text>
        <Text style={styles.transliteration}>{tasbih.transliteration}</Text>
        <Text style={styles.translation}>{tasbih.translation}</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCount}
            style={styles.counterButton}
          >
            <LinearGradient
              colors={['#2A8C4A', '#206238']}
              style={styles.counterGradient}
            >
              <Animated.View style={[styles.counterInner, { transform: [{ scale }] }]}>
                <Text style={styles.countText}>{count}</Text>
                <Text style={styles.targetText}>/ {tasbih.target}</Text>
              </Animated.View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={handleReset}
          >
            <MaterialCommunityIcons name="refresh" size={24} color="#2A8C4A" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}% Complete
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arabic: {
    fontSize: 32,
    color: '#2A8C4A',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'System',
  },
  transliteration: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  translation: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  counterButton: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  counterGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterInner: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
  },
  targetText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetText: {
    marginLeft: 8,
    color: '#2A8C4A',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    height: 30,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#2A8C4A',
    borderRadius: 15,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 30,
    color: '#333',
    fontWeight: '600',
  },
});