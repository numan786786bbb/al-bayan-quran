import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Share,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

interface Surah {
  id?: string;
  number?: number;
  englishName?: string;
  revelationType?: string;
  verseCount?: number;
  numberOfAyahs?: number;
}

interface Reciter {
  id: string;
  name: string;
}

interface RouteParams {
  surah?: Surah;
  reciter?: Reciter;
}

type RootStackParamList = {
  Home: undefined;
  AudioPlayer: RouteParams;
  // Add other screens as needed
};

type NavigationProps = NavigationProp<RootStackParamList, 'AudioPlayer'>;

export default function AudioPlayerScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const params = route.params as RouteParams;
  const { surah = {}, reciter = { id: 'mishaari_raashid_al_3afaasee', name: 'Mishary Rashid Alafasy' } } = params;

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingSound, setIsLoadingSound] = useState(true);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<number>(1);
  const [isVerseMode, setIsVerseMode] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [audioQuality, setAudioQuality] = useState<'high' | 'medium' | 'low'>('high');

  // Animation for disc rotation
  const spinValue = useRef(new Animated.Value(0)).current;

  const handleDownload = async () => {
    if (downloading) return;
    
    setDownloading(true);
    try {
      const formattedSurahNum = (surah?.number || '1').toString().padStart(3, '0');
      const audioUrl = `https://download.quranicaudio.com/quran/${reciter.id}/${formattedSurahNum}.mp3`;
      
      // Here you would implement actual file download logic
      // For now, we'll simulate the download progress
      for (let i = 0; i <= 100; i += 10) {
        setDownloadProgress(i / 100);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      Alert.alert('Success', 'Surah downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download. Please try again.');
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  };

  // Load and setup the audio when the surah changes
  useEffect(() => {
    // Reset state when surah changes
    setIsPlaying(false);
    setPosition(0);
    setDuration(0);
    spinValue.setValue(0);
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }

    const loadAudio = async () => {
      try {
        setIsLoadingSound(true);
        const formattedSurahNum = (surah?.number || '1').toString().padStart(3, '0');
        const audioUrl = `https://download.quranicaudio.com/quran/${reciter.id}/${formattedSurahNum}.mp3`;

        // Configure audio mode
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        const status = await newSound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          setDuration(Math.floor(status.durationMillis / 1000));
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        Alert.alert('Error', 'Failed to load audio. Please try again.');
      } finally {
        setIsLoadingSound(false);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [surah?.id, reciter.id]);

  // Playback status update callback
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis ? Math.floor(status.positionMillis / 1000) : 0);
      if (status.durationMillis) {
        setDuration(Math.floor(status.durationMillis / 1000));
      }
      if (status.didJustFinish && !status.isLooping) {
        setIsPlaying(false);
        if (repeat) {
          sound?.replayAsync();
        }
      }
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;
    try {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
        spinValue.stopAnimation();
      } else {
        await sound.playAsync();
        setIsPlaying(true);
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      Alert.alert('Error', 'Failed to control playback. Please try again.');
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Spin interpolation for disc rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // DEBUG: Log all props and state at the top of the render
  console.log('AudioPlayerScreen render', {
    surah,
    reciter,
    isPlaying,
    isLoadingSound,
    duration,
    position,
    repeat,
    currentVerse,
    isVerseMode,
    selectedQuality,
    downloading,
    downloadProgress,
    audioQuality,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <Text style={styles.headerSubtitle}>{reciter?.name ? String(reciter.name) : 'Mishary Rashid Alafasy'}</Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            // toast.info('Options menu - not implemented');
            // Optionally, use an Alert instead:
            // Alert.alert('Info', 'Options menu - not implemented');
          }}
        >
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.albumArtContainer}>
          <Animated.View style={[styles.albumArtInner, { transform: [{ rotate: spin }] }]}>
            <Image
              source={{ uri: `https://api.a0.dev/assets/image?text=quran%20surah%20${surah.number ? String(surah.number) : '1'}%20${surah.englishName ? String(surah.englishName) : ''}%20islamic%20art%20arabesque%20pattern%20green&aspect=1:1` }}
              style={styles.albumArt}
            />
          </Animated.View>
        </View>

        <View style={styles.surahInfoContainer}>
          <Text style={styles.surahName}>{surah?.englishName ? String(surah.englishName) : 'Al-Fatiha'}</Text>
          <Text style={styles.surahNumber}>Surah {surah?.number ? String(surah.number) : '1'}</Text>
          <Text style={styles.surahMeta}>
            {surah?.revelationType ? String(surah.revelationType) : 'Meccan'} • {surah?.verseCount ? String(surah.verseCount) : surah?.numberOfAyahs ? String(surah.numberOfAyahs) : '7'} Verses
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={async (value) => {
              if (sound) {
                await sound.setPositionAsync(Math.floor(value * 1000));
              }
            }}
            minimumTrackTintColor="#2A8C4A"
            maximumTrackTintColor="#DDDDDD"
            thumbTintColor="#2A8C4A"
            disabled={isLoadingSound}
          />
          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={() => setRepeat(!repeat)}
          >
            <MaterialCommunityIcons 
              name={repeat ? "repeat-once" : "repeat"} 
              size={24} 
              color={repeat ? "#2A8C4A" : "#888"} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.navigationButton]}
            disabled={isLoadingSound}
          >
            <MaterialCommunityIcons 
              name="skip-previous" 
              size={30} 
              color="#333"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.playButton]}
            onPress={togglePlayback}
            disabled={isLoadingSound}
          >
            {isLoadingSound ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <MaterialCommunityIcons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="white" 
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.navigationButton]}
            disabled={isLoadingSound}
          >
            <MaterialCommunityIcons 
              name="skip-next" 
              size={30} 
              color="#333"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={() => {
              // toast.info('Playback speed control - not implemented');
              // Optionally, use an Alert instead:
              // Alert.alert('Info', 'Playback speed control - not implemented');
            }}
          >
            <MaterialCommunityIcons name="play-speed" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.optionTitle}>Audio Quality</Text>
          <View style={styles.qualityButtons}>
            {['high', 'medium', 'low'].map((quality) => (
              <TouchableOpacity
                key={quality}
                style={[
                  styles.qualityButton,
                  audioQuality === quality && styles.selectedQualityButton
                ]}
                onPress={() => setAudioQuality(quality as 'high' | 'medium' | 'low')}
              >
                <Text style={[
                  styles.qualityButtonText,
                  audioQuality === quality && styles.selectedQualityText
                ]}>
                  {quality.charAt(0).toUpperCase() + quality.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.optionTitle}>Playback Mode</Text>
          <TouchableOpacity
            style={[
              styles.verseModeButton,
              isVerseMode && styles.selectedVersionModeButton
            ]}
            onPress={() => setIsVerseMode(!isVerseMode)}
          >
            <MaterialCommunityIcons
              name={isVerseMode ? "book-open-page-variant" : "book"}
              size={20}
              color={isVerseMode ? "#2A8C4A" : "#666"}
            />
            <Text style={[
              styles.verseModeText,
              isVerseMode && styles.selectedVersionModeText
            ]}>
              {isVerseMode ? 'Verse by Verse' : 'Full Surah'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.optionTitle}>Download</Text>
          {downloading ? (
            <View style={styles.downloadProgress}>
              <Text style={styles.downloadProgressText}>{`${Math.round(downloadProgress * 100)}%`}</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${downloadProgress * 100}%` }]} />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownload}
            >
              <MaterialCommunityIcons name="download" size={20} color="#2A8C4A" />
              <Text style={styles.downloadButtonText}>Download Surah</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  albumArtContainer: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: 'center',
    marginVertical: 24,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(42, 140, 74, 0.05)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumArtInner: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.4,
    overflow: 'hidden',
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  surahInfoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  surahName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  surahNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  surahMeta: {
    fontSize: 14,
    color: '#888',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 48,
    height: 48,
  },
  navigationButton: {
    width: 60,
    height: 60,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2A8C4A',
    marginHorizontal: 20,
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  qualityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  qualityButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedQualityButton: {
    backgroundColor: '#2A8C4A',
  },
  qualityButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedQualityText: {
    color: 'white',
  },
  verseModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 24,
  },
  selectedVersionModeButton: {
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
  },
  verseModeText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  selectedVersionModeText: {
    color: '#2A8C4A',
  },
  downloadProgress: {
    width: '100%',
  },
  downloadProgressText: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#2A8C4A',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
  },
  downloadButtonText: {
    marginLeft: 8,
    color: '#2A8C4A',
    fontSize: 16,
    fontWeight: '600',
  },
});