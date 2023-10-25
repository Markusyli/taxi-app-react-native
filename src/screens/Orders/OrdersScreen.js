import React, { useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-native-easy-grid';
import { observer } from 'mobx-react';
import useStores from '../../hooks/useStores';
import RoundIconButton from '../../components/RoundIconButton';
import Fade from '../../components/Fade';
import OrderSlide from '../../components/OrderSlide';
import GlobalStyles from '../../styles/GlobalStyles';

const OrdersScreen = observer(({ navigation }) => {
  const { driverOrdersStore } = useStores();

  const carouselRef = useRef(null);
  const mapView = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      driverOrdersStore.subscribeToOrders();
    });

    navigation.addListener('blur', () => {
      driverOrdersStore.unsubscribeFromOrders();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Grid>
      <Row size={1}>
        <View style={styles.container}>
          <MapView
            ref={mapView}
            style={styles.map}
            initialRegion={{
              latitude: 60.9947585,
              longitude: 25.7148676,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
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
            {driverOrdersStore.orders.map((order, index) => (
              <Marker
                key={order.id}
                title={order.address}
                coordinate={order.location}
                onPress={() => carouselRef.current.animateToPage(index)}
              />
            ))}
          </MapView>
          <SafeAreaView style={styles.safeArea}>
            <Fade style={styles.carouselContainer} visible={driverOrdersStore.orders.length > 0}>
              <View style={{ position: 'absolute', right: 15, top: -25 }}>
                <RoundIconButton
                  icon="local-phone"
                  size={60}
                  iconSize={31}
                  backgroundColor="#ffcd00"
                  onPress={() => {
                    Linking.openURL(`tel:${'0407635639'}`);
                  }}
                />
              </View>
              <View style={styles.panelButton}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#322d70' }}>Vahvista kyyti</Text>
              </View>
            </Fade>
          </SafeAreaView>
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
        </View>
      </Row>
    </Grid>
  );
});

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
  },
  map: {
    width,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  carouselContainer: {
    width,
    paddingTop: 15,
    flex: 1,
  },
  carousel: {
    width,
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: GlobalStyles.unsafeTopArea + 10,
    left: 15,
  },
  buttonText: {
    fontSize: 50,
    color: '#ffcd00',
  },
  panelButton: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#ffcd00',
    alignItems: 'center',
    marginTop: -2,
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

OrdersScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OrdersScreen;
