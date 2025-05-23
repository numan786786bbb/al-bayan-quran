import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface QuranAudioControlsProps {
  surahNumber: number;
  versesRange?: string;
  reciter?: string;
}

export default function QuranAudioControls({ 
  surahNumber, 
  versesRange,
  reciter = 'Mishari Rashid al-`Afasy'
}: QuranAudioControlsProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAndPlayAudio = async () => {
    try {
      setIsLoading(true);
      
      // If there's an existing sound, unload it
      if (sound) {
        await sound.unloadAsync();
      }

      // Format surah number with leading zeros
      const formattedSurahNum = surahNumber.toString().padStart(3, '0');
      
      // Construct the audio URL (example using MP3Quran API)
      const audioUrl = `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${formattedSurahNum}.mp3`;

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      
      // Add a completion handler
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });

    } catch (error) {
      console.error('Error loading audio:', error);
      toast.error('Failed to load audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      loadAndPlayAudio();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={togglePlayback}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#2A8C4A" />
        ) : (
          <MaterialCommunityIcons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={32} 
            color="#2A8C4A" 
          />
        )}
        <Text style={styles.reciterText}>{reciter}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reciterText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  }
});