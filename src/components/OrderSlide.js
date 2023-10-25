import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const OrderSlide = ({ order }) => (
  <View style={styles.slide}>
    <Text style={styles.address}>{order.address}</Text>
    <Text style={styles.city}>{order.cityZipCode}</Text>
    <View style={styles.infoContainer}>
      <View style={styles.infoColumn}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={30}
            color="#ffcd00"
          />
        </View>
        <Text style={styles.time}>{order.orderTime && new Date(order.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={styles.date}>{order.orderTime && new Date(order.orderTime).toLocaleDateString()}</Text>
      </View>
      <View style={styles.infoColumn}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="car-sports"
            size={40}
            color="#ffcd00"
          />
        </View>
        <Text style={styles.carType}>{order.carType}</Text>
      </View>
    </View>
    <View style={styles.commentColumn}>
      <Text style={styles.date}>Kommentti</Text>
    </View>
  </View>
);

OrderSlide.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zipCode: PropTypes.string,
    cityZipCode: PropTypes.string.isRequired,
    orderTime: PropTypes.number.isRequired,
    carType: PropTypes.string.isRequired,
  }).isRequired,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    width,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#232323',
  },
  address: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f8f8f8',
    marginLeft: 5,
  },
  city: {
    fontSize: 18,
    color: '#a2a2a2',
    marginBottom: 15,
    marginLeft: 5,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoColumn: {
    backgroundColor: '#2f2f2f',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingBottom: 15,
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carType: {
    fontSize: 18,
    color: '#f8f8f8',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 18,
    color: '#f8f8f8',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#f8f8f8',
  },
  commentColumn: {
    backgroundColor: '#2f2f2f',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
});

export default OrderSlide;
