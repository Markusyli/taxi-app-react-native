import { observable, computed } from 'mobx';

export default class DriverOrder {
  store;

  id;

  address;

  city;

  zipCode;

  carType;

  location;

  orderTime;

  phonenumber;

  uid;

  @computed get cityZipCode() {
    return [this.city, this.zipCode].filter(Boolean).join(', ');
  }

  constructor(order) {
    Object.assign(this, order);
  }
}
