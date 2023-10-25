/* eslint-disable react/prefer-stateless-function */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Location from 'expo-location';
import { Row, Grid } from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Animated from 'react-native-reanimated';
import useStores from '../../hooks/useStores';
import Map from '../../components/map';
import CarSelector from '../../components/CarSelector';
import PickupPoint from '../../components/PickUpPoint';
import PickupPointSheet from '../../components/PickupPointSheet';
import FatButton from '../../components/FatButton';
import firebase from '../../api/FirebaseConfig';
import firebaseAPI from '../../api/FirebaseAPI';

const HomeScreen = observer(({ navigation }) => {
  const { setOrderStore, setOrderViewStore, currentUserStore } = useStores();

  useEffect(() => {
    let locationWatch;
    setOrderViewStore.fall = new Animated.Value(1);

    getLocation(true);

    (async () => {
      await signInUserAsync();

      locationWatch = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 3000,
          distanceInterval: 5,
        }, (newLocation) => {
          firebaseAPI.constructor.saveDriverLocation(newLocation.coords);
        },
      );
    })();

    return () => {
      locationWatch.remove();
    };
  }, []);

  const signInUserAsync = async () => {
    const { currentUser } = firebase.auth();

    if (!currentUser) await currentUserStore.signInAnonymouslyAsync();
  };

  const getLocation = (setPickupPoint) => {
    currentUserStore.setUserLocation().then((location) => {
      if (setPickupPoint) setOrderStore.setPickupLocationFromCoordinates(location.coords);
    });
  };

  return (
    <Grid style={{
      backgroundColor: '#2c2c2f',
    }}
    >
      <Row size={1}>
        <Animated.View style={{
          ...styles.container,
        }}
        >
          <Map
            onPressCurrentLocation={getLocation}
            navigation={navigation}
          />
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.selectionContainer}>
              <View style={{
                ...styles.preOrderButton,
                backgroundColor: '#ffdc50',
              }}
              >
                <View style={{
                  ...styles.preOrderButton,
                  width: '100%',
                  backgroundColor: 'white',
                  borderTopRightRadius: 20,
                }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      paddingTop: 10,
                      paddingBottom: 7,
                      marginBottom: 5,
                      borderBottomColor: '#ffcd00',
                      borderBottomWidth: 3,
                    }}
                  >
                    <Text style={{
                      fontSize: 17,
                      color: '#333',
                      fontWeight: 'bold',
                    }}
                    >
                      Tilaa heti
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{
                ...styles.preOrderButton,
                backgroundColor: '#ffdc50',
                borderBottomLeftRadius: 25,
              }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    paddingBottom: 12,
                  }}
                  onPress={() => { navigation.navigate('PreOrder'); }}
                >
                  <Text style={{ fontSize: 17, color: '#222' }}>
                    Tilaa ennakkoon
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <PickupPoint />
            </View>
            <CarSelector />
            <FatButton
              onPress={() => {
                // setOrderStore.sendOrder();
                navigation.navigate('Settings');
              }}
              enabled={setOrderViewStore.orderButtonEnabled}
              title="Tilaa"
            />
          </SafeAreaView>
        </Animated.View>
        <PickupPointSheet />
      </Row>
    </Grid>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaView: {
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowColor: '#333',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: '#fff',
    elevation: 8,
  },
  selectionContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  preOrderButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default HomeScreen;
