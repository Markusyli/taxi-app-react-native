import { action, observable, computed } from 'mobx';

export default class RootStore {
  types = [
    {
      id: 0,
      title: 'Taksi',
      description: 'Edullinen ja luotettava',
      size: 4,
      icon: 'car-side',
      kmPrice: '0,79',
      timePrice: '0,69',
      startPrice: '3,99',
    },
    {
      id: 1,
      title: 'Premium',
      description: 'Tasokkaampaan makuun',
      size: 4,
      icon: 'car-sports',
      kmPrice: '0,79',
      timePrice: '0,69',
      startPrice: '3,99',
    },
    {
      id: 2,
      title: 'Tilataksi',
      description: 'Yhdessä edullisemmin!',
      size: 8,
      icon: 'car-estate',
      kmPrice: '1,50',
      timePrice: '0,69',
      startPrice: '3,99',
    },
  ]

  @observable initialDataLoaded = false;

  carSelectionStore;

  constructor(carSelectionStore) {
    this.carSelectionStore = carSelectionStore;
  }
}
