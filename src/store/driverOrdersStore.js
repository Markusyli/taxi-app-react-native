import { action, observable } from 'mobx';
import FirebaseAPI from '../api/FirebaseAPI';
import DriverOrder from '../models/DriverOrder';

export default class DriverOrdersStore {
  @observable orders = [];

  @observable state = 'pending';

  @observable initialDataLoaded = false;

  dbRef;

  @action
  subscribeToOrders() {
    FirebaseAPI.subscribeToOrders((snapshot) => {
      const orders = snapshot.val();

      this.orders = Object.keys(orders).map((key) => (new DriverOrder({
        id: key,
        ...orders[key],
      })));

      this.state = 'success';
    }).then(() => {
      this.initialDataLoaded = true;
    });
  }

  @action
  unsubscribeFromOrders = () => {
    FirebaseAPI.unsubscribeFromOrders();
  }
}
