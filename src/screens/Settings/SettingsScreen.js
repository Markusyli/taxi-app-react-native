/* eslint-disable react/prefer-stateless-function */
import React, { useRef, useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import firebase from '../../api/FirebaseConfig';

const SettingsScreen = ({ navigation }) => {
  const driverLocationRef = useRef(null);

  const [coordinate] = useState(new AnimatedRegion({
    latitude: 60.994925,
    longitude: 25.7148683,
    latitudeDelta: 0,
    longitudeDelta: 0,
  }));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      driverLocationRef.current = firebase.database().ref('/driverLocations/c3RKVBbz9ePeZ6vCpx3dKhYcZ422');
      driverLocationRef.current.on('value', (snapshot) => {
        const newLocation = snapshot.val();
        const newCoordinate = {
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        };

        coordinate.timing({ ...newCoordinate, duration: 3000 }).start();
      });
    });

    navigation.addListener('blur', () => {
      if (driverLocationRef.current) driverLocationRef.current.off();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 60.994925,
          longitude: 25.7148683,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        loadingEnabled
        showsTraffic={false}
        showsIndoors={false}
        showsCompass={false}
        showsMyLocationButton={false}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <Marker.Animated
          coordinate={coordinate}
        />
      </MapView>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default SettingsScreen;
