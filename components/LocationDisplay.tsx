import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LocationData } from '../utils/locationService';
import LocationUpdateModal from './LocationUpdateModal';

interface LocationDisplayProps {
  location: LocationData;
  isLoading: boolean;
  onLocationUpdated?: () => void;
}

export default function LocationDisplay({ location, isLoading, onLocationUpdated }: LocationDisplayProps) {
  const [modalVisible, setModalVisible] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="white" />
        <Text style={styles.loadingText}>Locating...</Text>
      </View>
    );
  }

  const handleLocationUpdate = () => {
    if (onLocationUpdated) {
      onLocationUpdated();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.locationRow}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="map-marker" size={16} color="white" />
        <Text style={styles.locationText}>
          {location.city === 'Unknown' ? 'Location unavailable' : `${location.city}, ${location.country}`}
        </Text>
        <MaterialCommunityIcons name="pencil" size={12} color="white" style={styles.editIcon} />
      </TouchableOpacity>
      
      {location.altitude !== null && (
        <View style={styles.altitudeRow}>
          <MaterialCommunityIcons name="elevation-rise" size={16} color="white" />
          <Text style={styles.altitudeText}>
            {Math.round(location.altitude)}m elevation
          </Text>
        </View>
      )}

      <LocationUpdateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLocationUpdated={handleLocationUpdate}
        currentLocation={location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 4,
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
  editIcon: {
    marginLeft: 5,
    opacity: 0.8,
  },
  altitudeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  altitudeText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.9,
  },
});