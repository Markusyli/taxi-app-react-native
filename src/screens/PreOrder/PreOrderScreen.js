import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/fi';
import { MaterialIcons } from '@expo/vector-icons';
import useStores from '../../hooks/useStores';
import InputField from '../../components/InputField';
import FatButton from '../../components/FatButton';
import { l } from '../../helpers';

const PreOrderScreen = observer(({ navigation }) => {
  const { setOrderStore, currentUserStore } = useStores();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickupTime, setPickupTime] = useState(new Date());
  const [destination, setDestination] = useState(null);

  moment.locale('fi');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (datetime) => {
    setPickupTime(datetime);
    hideDatePicker();
  };

  const handleClearPress = () => {
    currentUserStore.setUserLocation();
    setOrderStore.clearPickupInfo();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.controlContainer}>
        <View style={styles.rowContainer}>
          <MaterialIcons
            name="access-time"
            size={20}
            color="#b5b2d0"
            style={{ marginTop: 10, marginLeft: 15 }}
          />
          <InputField
            asButton
            value={moment(pickupTime).format('llll').toString()}
            placeholderText="Noutoaika"
            onPress={showDatePicker}
          />
        </View>
        <View style={styles.rowContainer}>
          <MaterialIcons
            name="arrow-downward"
            size={20}
            color="#b5b2d0"
            style={{ marginTop: 10, marginLeft: 15 }}
          />
          <InputField
            value={setOrderStore.address}
            placeholderText={l('pickup_point')}
            onClear={handleClearPress}
          />
        </View>
        <View style={styles.rowContainer}>
          <MaterialIcons
            name="subdirectory-arrow-right"
            size={20}
            color="#b5b2d0"
            style={{ marginTop: 10, marginLeft: 15 }}
          />
          <InputField
            value={destination}
            placeholderText="Määränpää"
            onClear={handleClearPress}
          />
        </View>
      </View>
      <FatButton
        onPress={() => {
          navigation.navigate('Settings');
        }}
        enabled
        title="Tilaa ennakkoon"
      />
    </SafeAreaView>
  );
});

PreOrderScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  controlContainer: {
    flex: 1,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PreOrderScreen;
