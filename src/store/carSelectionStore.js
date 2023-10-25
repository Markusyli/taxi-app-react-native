import { action, observable, computed } from 'mobx';

export default class CarSelectionStore {
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

  @observable selectedId = 0;

  @computed get selectedType() {
    return this.types[this.selectedId].title;
  }

  @action
  selectCarType(id) {
    this.selectedId = id;
  }
}
