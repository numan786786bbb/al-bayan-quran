import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Linking,
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function YoutubeFeedScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);

  const openVideo = async (videoId: string) => {
    try {
      setIsLoading(true);
      // Try to open in YouTube app first
      const youtubeUrl = `https://www.youtube.com/results?search_query=Arshad+saeed+kazmi`;
      await Linking.openURL(youtubeUrl);
    } catch (error) {
      console.error('Error opening video:', error);
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.headerTitle}>Islamic Lectures</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=islamic%20lectures%20banner%20with%20mosque%20and%20quran&aspect=16:9' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Arshad Saeed Kazmi</Text>
            <Text style={styles.bannerSubtitle}>Islamic Lectures Collection</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.watchButton}
          onPress={() => openVideo('main')}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <MaterialCommunityIcons name="youtube" size={24} color="white" />
              <Text style={styles.watchButtonText}>Open YouTube Channel</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="information" size={20} color="#666" />
          <Text style={styles.infoText}>
            This will open YouTube in your default browser or the YouTube app if installed.
          </Text>
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
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  watchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  }
});