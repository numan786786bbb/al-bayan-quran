import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ParahTextViewProps {
  parahNumber: number;
  text: string;
}

const ParahTextView: React.FC<ParahTextViewProps> = ({ parahNumber, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.parahNumber}>Parah {parahNumber}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  parahNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

export default ParahTextView; 