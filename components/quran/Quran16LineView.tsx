import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Quran16LineViewProps {
  initialPage?: number;
}

const Quran16LineView: React.FC<Quran16LineViewProps> = ({ initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = 976; // Total pages in 16-line format

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };  const getPageUrl = (page: number) => {
    // Return local asset reference - you would need to bundle these images with your app
    return require(`../../assets/quran16line/page_${page.toString().padStart(4, '0')}.webp`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
        <View style={styles.navigation}>
          <TouchableOpacity 
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
          >
            <MaterialCommunityIcons 
              name="chevron-left" 
              size={24} 
              color={currentPage === 1 ? '#999' : '#2A8C4A'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={[styles.navButton, currentPage === totalPages && styles.disabledButton]}
          >
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={24} 
              color={currentPage === totalPages ? '#999' : '#2A8C4A'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getPageUrl(currentPage) }}
          style={styles.pageImage}
          resizeMode="contain"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2A8C4A" />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>16 Line Quran</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  pageImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Quran16LineView;