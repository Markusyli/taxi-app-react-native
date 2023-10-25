import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity as TouchableOpacityIOS,
} from 'react-native';
import { TouchableOpacity as TouchableOpacityAndroid } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import useStores from '../hooks/useStores';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import GlobalStyles from '../styles/GlobalStyles';
import { l } from '../helpers';

const TouchableOpacity = Platform.select({
  ios: () => TouchableOpacityIOS,
  android: () => TouchableOpacityAndroid,
})();

const PickupPointSheet = observer(() => {
  const { setOrderStore, setOrderViewStore, currentUserStore } = useStores();

  const autocomplete = useRef(null);
  const bottomSheet = useRef(null);

  useEffect(() => {
    autorun(() => {
      if (setOrderViewStore.bottomSheetOpen) {
        bottomSheet.current.snapTo(1);

        if (setOrderStore.address) {
          autocomplete.current._handleChangeText(setOrderStore.addressWithCity);
        } else {
          autocomplete.current.clearText();
        }
      } else {
        bottomSheet.current.snapTo(0);
      }
    });

    autorun(() => {
      const { location } = currentUserStore;

      if (location) {
        query.location = `${location.latitude},${location.longitude}`;
      }
    });
  }, []);

  const query = {
    key: 'AIzaSyCvZfx69d6e-RnyIhjVsy515696xg71PJM',
    language: 'fi',
    radius: 5000,
  };

  // TODO: Sanity check for Autocomplete props
  const renderContent = () => (
    <View style={styles.panel}>
      <GooglePlacesAutocomplete
        ref={autocomplete}
        placeholder={l('pickup_point')}
        placeholderTextColor="#9b99b1"
        minLength={2}
        onPress={handleOnLocationSelected}
        query={query}
        debounce={200}
        enablePoweredByContainer={false}
        returnKeyType="go"
        listViewDisplayed
        textInputProps={{
          clearButtonMode: 'never',
        }}
        styles={{
          textInputContainer: {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: '#ebebf3',
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          },
          textInput: {
            padding: 0,
            margin: 0,
            backgroundColor: '#ebebf3',
            fontSize: 17,
            color: '#333',
            flex: 1,
          },
          row: {
            height: 55,
          },
        }}
        renderDescription={(rowData) => rowData.structured_formatting.main_text}
        renderRightButton={renderRightButton}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderRightButton = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cancelButton}
      onPress={() => { setOrderViewStore.bottomSheetOpen = false; }}
    >
      <Text style={styles.cancelButtonText}>{l('cancel')}</Text>
    </TouchableOpacity>
  );

  const onCloseStart = () => {
    autocomplete.current.triggerBlur();
    Keyboard.dismiss();
  };

  const onOpenEnd = () => {
    autocomplete.current.triggerFocus();
  };

  const onClose = () => {
    setOrderViewStore.bottomSheetOpen = false;
  };

  const handleOnLocationSelected = (data) => {
    setOrderViewStore.bottomSheetOpen = false;

    setOrderStore.fetchPickupLocation(data);
  };

  return (
    <BottomSheet
      ref={bottomSheet}
      initialSnap={0}
      snapPoints={[0, Dimensions.get('window').height - GlobalStyles.unsafeTopArea - 15]}
      renderContent={renderContent}
      renderHeader={renderHeader}
      onOpenEnd={onOpenEnd}
      onCloseStart={onCloseStart}
      onCloseEnd={onClose}
      callbackNode={setOrderViewStore.fall}
    />
  );
});

const styles = StyleSheet.create({
  panel: {
    height: '100%',
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    paddingTop: 16,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#666',
  },
  cancelButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    height: 40,
  },
  cancelButtonText: {
    fontSize: 17,
    color: '#333',
  },
});

export default PickupPointSheet;
