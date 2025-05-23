import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { LocationData, searchLocation, saveCustomLocation, clearCustomLocation } from '../utils/locationService';
import { useTheme } from '../context/ThemeContext';

interface LocationUpdateModalProps {
  visible: boolean;
  onClose: () => void;
  onLocationUpdated: () => void;
  currentLocation: LocationData;
}

export default function LocationUpdateModal({
  visible,
  onClose,
  onLocationUpdated,
  currentLocation
}: LocationUpdateModalProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchLocation(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      }
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const selectLocation = async (location: LocationData) => {
    try {
      await saveCustomLocation(location);
      onLocationUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const resetToDeviceLocation = async () => {
    setIsLoadingLocation(true);
    try {
      await clearCustomLocation();
      onLocationUpdated();
      onClose();
    } catch (error) {
      console.error('Error resetting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // New function to open Google Maps for location selection.
  const openInGoogleMaps = async () => {
    try {
      const query = searchQuery.trim()
        ? searchQuery
        : `${currentLocation.latitude},${currentLocation.longitude}`;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primaryText }]}>Update Location</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color={theme.colors.primaryText} />
            </TouchableOpacity>
          </View>

          <View style={styles.currentLocationContainer}>
            <Text style={[styles.currentLocationLabel, { color: theme.colors.secondaryText }]}>
              Current Location:
            </Text>
            <Text style={[styles.currentLocationText, { color: theme.colors.primaryText }]}>
              {currentLocation.city}, {currentLocation.country}
              {currentLocation.isCustomLocation ? ' (Custom)' : ''}
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <View style={[styles.searchInputContainer, { backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }]}>
              <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.primaryText }]}
                placeholder="Search for a city..."
                placeholderTextColor={theme.colors.tertiaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
                Searching...
              </Text>
            </View>
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => `${item.city}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.resultItem, { borderBottomColor: theme.colors.divider }]}
                  onPress={() => selectLocation(item)}
                >
                  <MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.primary} />
                  <View style={styles.resultTextContainer}>
                    <Text style={[styles.resultCity, { color: theme.colors.primaryText }]}>
                      {item.city}
                    </Text>
                    <Text style={[styles.resultCountry, { color: theme.colors.secondaryText }]}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.resultsList}
            />
          ) : searchQuery.length > 0 && !isSearching ? (
            <View style={styles.noResultsContainer}>
              <MaterialCommunityIcons name="map-search" size={60} color={theme.colors.tertiaryText} />
              <Text style={[styles.noResultsText, { color: theme.colors.secondaryText }]}>
                No results found for "{searchQuery}"
              </Text>
            </View>
          ) : (
            <View style={styles.instructionsContainer}>
              <MaterialCommunityIcons name="map-search-outline" size={60} color={theme.colors.tertiaryText} />
              <Text style={[styles.instructionsText, { color: theme.colors.secondaryText }]}>
                Search for a city name to update your location, or use your device location.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.deviceLocationButton, { backgroundColor: theme.colors.primary }]}
            onPress={resetToDeviceLocation}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <MaterialCommunityIcons name="crosshairs-gps" size={20} color="white" />
                <Text style={styles.deviceLocationText}>Use Device Location</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mapsButton, { backgroundColor: theme.colors.primary }]}
            onPress={openInGoogleMaps}
          >
            <MaterialCommunityIcons name="google-maps" size={20} color="white" />
            <Text style={styles.mapsButtonText}>Open in Google Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: '80%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  currentLocationContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(42, 140, 74, 0.1)',
  },
  currentLocationLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultTextContainer: {
    marginLeft: 15,
  },
  resultCity: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultCountry: {
    fontSize: 14,
    marginTop: 2,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionsText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  deviceLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A8C4A',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  deviceLocationText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  mapsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A8C4A',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  mapsButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
});