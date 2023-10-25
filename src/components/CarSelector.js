import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import useStores from '../hooks/useStores';

const { width } = Dimensions.get('window');
const snapToInterval = width - 24;

const CarSelector = observer(() => {
  const { carSelectionStore } = useStores();

  const scrollView = useRef(null);

  const snapToOffsets = carSelectionStore.types.map((carType, index) => snapToInterval * index);

  const snapToIndex = (index) => {
    scrollView.current.scrollTo({ x: snapToInterval * index, y: 0, animated: true });
  };

  const onMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / snapToInterval);

    carSelectionStore.selectCarType(index);
  };

  useEffect(() => {
    autorun(() => {
      const { selectedId } = carSelectionStore;

      snapToIndex(selectedId);
    });
  }, []);

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        width: '100%',
      }}
      >
        {carSelectionStore.types.map((carType) => (
          <TouchableOpacity
            style={{
              height: 35, justifyContent: 'flex-end', flex: 1, alignItems: 'center',
            }}
            key={carType.id}
            onPress={() => { carSelectionStore.selectCarType(carType.id); }}
          >
            <Text style={{
              fontSize: 16,
              color: '#333',
              fontWeight: (carType.id === carSelectionStore.selectedId) ? 'bold' : 'normal',
            }}
            >
              {carType.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView
        ref={scrollView}
        style={styles.scrollView}
        horizontal
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        disableScrollViewPanResponder
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        {carSelectionStore.types.map((carType, index) => (
          <View
            key={carType.id}
            style={{
              ...styles.view,
              marginRight: (index === carSelectionStore.types.length - 1) ? 20 : 3,
              marginLeft: (index === 0) ? 20 : 3,
            }}
          >
            <MaterialCommunityIcons
              name={carType.icon}
              size={70}
              color="#322d70"
            />
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 23, color: '#322d70', marginRight: 6 }}>
                  {carType.title}
                </Text>
                <MaterialIcons
                  name="person"
                  size={15}
                  color="#322d70"
                  style={{ paddingTop: 5, marginRight: 1 }}
                />
                <Text style={{ paddingTop: 5, color: '#322d70', fontSize: 12 }}>{carType.size}</Text>
              </View>
              <Text style={{ fontSize: 12, color: '#322d70' }}>{carType.description}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ color: '#322d70', fontSize: 13 }}>{carType.startPrice}€ +</Text>
              <Text style={{ color: '#322d70', fontSize: 14 }}>{carType.kmPrice}€ /km</Text>
              <Text style={{ color: '#322d70', fontSize: 14 }}>{carType.timePrice}€ /min</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    marginRight: -5,
    marginLeft: -5,
    overflow: 'visible',
  },
  view: {
    backgroundColor: '#fff',
    width: width - 30,
    marginTop: 13,
    marginBottom: 15,
    height: 90,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: '#333',
    shadowOffset: { height: 0, width: 0 },
    elevation: 10,
  },
});

export default CarSelector;
