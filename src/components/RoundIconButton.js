import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// TODO: Use styled
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const RoundIconButton = ({
  icon,
  size,
  iconSize,
  onPress,
  backgroundColor,
  iconColor,
}) => (
  <TouchableHighlight
    style={{
      width: size,
      height: size,
      backgroundColor: backgroundColor || defaultStyles.backgroundColor,
      ...styles.touchableOpacity,
    }}
    activeOpacity={0.7}
    underlayColor={backgroundColor || defaultStyles.backgroundColor}
    onPress={onPress}
  >
    <MaterialIcons
      name={icon}
      size={iconSize}
      color={iconColor || defaultStyles.iconColor}
    />
  </TouchableHighlight>
);

RoundIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  iconSize: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const defaultStyles = {
  backgroundColor: 'white',
  iconColor: 'black',
};

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: '#333',
    shadowOffset: { height: 6, width: 0 },
    elevation: 4,
  },
});

export default RoundIconButton;
