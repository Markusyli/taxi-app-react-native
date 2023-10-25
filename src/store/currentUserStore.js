import { action, observable } from 'mobx';
import * as Location from 'expo-location';
import FirebaseAPI from '../api/FirebaseAPI';

export default class CurrentUserStore {
  @observable location;

  @action
  // eslint-disable-next-line class-methods-use-this
  async signInAnonymouslyAsync() {
    await FirebaseAPI.constructor.signInAnonymouslyAsync();
  }

  @action
  async setUserLocation() {
    // TODO: Handle location permission
    let { status } = await Location.requestForegroundPermissionsAsync();

    return new Promise((resolve, reject) => {
      Location.getCurrentPositionAsync({}).then((location) => {
        this.location = location.coords;

        resolve(location);
      }).catch((error) => {
        console.warn(error);

        reject(error);
      });
    });
  }
}
