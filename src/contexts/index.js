import React from 'react';
import DriverOrdersStore from '../store/driverOrdersStore';
import SetOrderStore from '../store/setOrderStore';
import CurrentUserStore from '../store/currentUserStore';
import CarSelectionStore from '../store/carSelectionStore';
import SetOrderViewStore from '../store/setOrderViewStore';
import RootStore from '../store/rootStore';

const carSelectionStore = new CarSelectionStore();
const setOrderStore = new SetOrderStore(carSelectionStore);
const setOrderViewStore = new SetOrderViewStore(setOrderStore);
const rootStore = new RootStore(carSelectionStore);

const storesContext = React.createContext({
  driverOrdersStore: new DriverOrdersStore(),
  currentUserStore: new CurrentUserStore(),
  rootStore,
  setOrderStore,
  setOrderViewStore,
  carSelectionStore,
});

export default storesContext;
