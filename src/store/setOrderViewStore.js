import { observable, computed } from 'mobx';

export default class SetOrderViewStore {
  @observable bottomSheetOpen = false;

  @observable fall;

  setOrderStore;

  constructor(setOrderStore) {
    this.setOrderStore = setOrderStore;
  }

  @computed get orderButtonEnabled() {
    return !!this.setOrderStore.address;
  }
}
