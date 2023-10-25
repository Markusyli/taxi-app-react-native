import firebase from './FirebaseConfig';

const ORDERS = 'orders';
const DRIVE_LOCATINOS = 'driverLocations';

class FirebaseAPI {
  ordersRef;

  static saveOrder(order) {
    const { currentUser } = firebase.auth();
    const newOrderKey = firebase.database().ref().child(ORDERS).push().key;

    const object = {
      ...order,
      uid: currentUser.uid,
      orderTime: firebase.database.ServerValue.TIMESTAMP,
    };

    // TODO: Handle promise properly
    firebase.database().ref(`${ORDERS}/${newOrderKey}`).set(object)
      .catch((error) => {
        console.warn(error);
      });
  }

  static saveDriverLocation(location) {
    const { currentUser } = firebase.auth();

    if (!currentUser) return;

    // TODO: Handle promise properly
    firebase.database().ref(`${DRIVE_LOCATINOS}/${currentUser.uid}`).set(location)
      .catch((error) => {
        console.warn(error);
      });
  }

  static async signInAnonymouslyAsync() {
    firebase.auth().signInAnonymously()
      .catch((error) => {
      // TODO: Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  subscribeToOrders(callback) {
    this.ordersRef = firebase.database().ref(ORDERS);
    this.ordersRef.on('value', callback);

    return this.ordersRef.once('value');
  }

  unsubscribeFromOrders() {
    this.ordersRef.off();
  }
}

export default new FirebaseAPI();
