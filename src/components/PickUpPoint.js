import React from 'react';
import { observer } from 'mobx-react';
import InputField from './InputField';
import useStores from '../hooks/useStores';
import { l } from '../helpers';

const PickupPoint = observer(() => {
  const { setOrderStore, currentUserStore, setOrderViewStore } = useStores();

  const handlePickupPointPress = () => {
    setOrderViewStore.bottomSheetOpen = true;
  };

  const handleClearPress = () => {
    currentUserStore.setUserLocation();
    setOrderStore.clearPickupInfo();
  };

  return (
    <InputField
      value={setOrderStore.address}
      placeholderText={l('pickup_point')}
      iconName="search"
      asButton
      onPress={handlePickupPointPress}
      onClear={handleClearPress}
    />
  );
});

export default PickupPoint;
