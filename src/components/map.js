import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import useStores from '../hooks/useStores';
import RoundIconButton from './RoundIconButton';
import GlobalStyles from '../styles/GlobalStyles';

const Map = observer(({
  onPressCurrentLocation,
  navigation,
}) => {
  const { setOrderStore, currentUserStore } = useStores();

  const mapView = useRef(null);
  const mapReadyRef = useRef(false);

  useEffect(() => {
    autorun(() => {
      const { location } = currentUserStore;

      if (mapReadyRef.current) {
        mapView.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    });

    autorun(() => {
      const { location } = setOrderStore;

      if (mapReadyRef.current && location) {
        mapView.current.animateToRegion({
          latitude: setOrderStore.location.latitude,
          longitude: setOrderStore.location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
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
        onMapReady={() => { mapReadyRef.current = true; }}
      >
        {setOrderStore.location && (
          <Marker
            coordinate={{ ...setOrderStore.location }}
          />
        )}
      </MapView>
      <View style={styles.menuButton}>
        <RoundIconButton
          icon="menu"
          size={48}
          iconSize={31}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={styles.locateButton}>
        <RoundIconButton
          icon="my-location"
          size={42}
          iconSize={23}
          onPress={async () => {
            await onPressCurrentLocation();
          }}
          style={{ zIndex: 9999 }}
        />
      </View>
    </View>
  );
});

Map.defaultProps = {
  pickupLocation: null,
};

Map.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
  pickupLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  onPressCurrentLocation: PropTypes.func.isRequired,
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
  menuButton: {
    position: 'absolute',
    top: GlobalStyles.unsafeTopArea + 10,
    left: 15,
  },
  locateButton: {
    position: 'absolute',
    bottom: 18,
    right: 15,
  },
});

export default Map;
