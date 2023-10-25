import { action, observable, computed } from 'mobx';
import FirebaseAPI from '../api/FirebaseAPI';
import Geocoder from '../api/GeocoderAPI';

export default class SetOrdersStore {
  @observable address;

  @observable location;

  @observable city;

  @observable zipCode;

  @observable state = 'pending';

  carSelectionStore;

  dbRef;

  constructor(carSelectionStore) {
    this.carSelectionStore = carSelectionStore;
  }

  @computed get addressWithCity() {
    return [this.address, this.city].filter(Boolean).join(', ');
  }

  @action
  setPickupLocation(location) {
    this.location = location;
  }

  @action
  setPickupAddress(address) {
    this.address = address;
  }

  @action
  clearPickupInfo() {
    this.address = null;
    this.location = null;
  }

  @action
  fetchPickupLocation(data) {
    if (!data.description) return;

    this.address = data.structured_formatting.main_text;

    Geocoder.init('AIzaSyCvZfx69d6e-RnyIhjVsy515696xg71PJM', { language: 'fi' });

    const formattedDescription = data.description.replace(/,/g, '').replace(/ /g, '+');
    Geocoder.from(formattedDescription)
      .then((json) => {
        const address = json.results[0].address_components;

        address.forEach((element) => {
          if (element.types.includes('locality')) this.city = element.long_name;
          if (element.types.includes('postal_code')) this.zipCode = element.long_name;
        });

        const { location } = json.results[0].geometry;
        const pickupLocation = { latitude: location.lat, longitude: location.lng };
        this.location = pickupLocation;

        this.state = 'success';
      })
      .catch((error) => {
        console.warn(error);

        this.state = 'error';
      });
  }

  @action
  setPickupLocationFromCoordinates({ latitude, longitude }) {
    Geocoder.init('AIzaSyCvZfx69d6e-RnyIhjVsy515696xg71PJM', { language: 'fi' });

    Geocoder.from(latitude, longitude)
      .then((json) => {
        this.address = json.results[0].formatted_address.split(',')[0];

        const address = json.results[0].address_components;

        address.forEach((element) => {
          if (element.types.includes('locality')) this.city = element.long_name;
          if (element.types.includes('postal_code')) this.zipCode = element.long_name;
        });

        const { location } = json.results[0].geometry;
        const pickupLocation = { latitude: location.lat, longitude: location.lng };
        this.location = pickupLocation;

        this.state = 'success';
      })
      .catch((error) => {
        console.warn(error);

        this.state = 'error';
      });
  }

  @action
  sendOrder() {
    FirebaseAPI.constructor.saveOrder({
      address: this.address,
      location: {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
      },
      city: this.city,
      zipCode: this.zipCode,
      // TODO: Use real number
      phonenumber: '123456789',
      carType: this.carSelectionStore.selectedType,
    });
  }
}
