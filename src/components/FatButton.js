import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const FatButton = ({ title, enabled, onPress }) => {
  const handleOnPress = () => {
    if (enabled) onPress();
  };

  return (
    <TouchableOpacity
      disabled={!enabled}
      activeOpacity={0.7}
      onPress={handleOnPress}
    >
      <View style={{
        ...styles.panelButton,
        opacity: enabled ? 1 : 0.5,
      }}
      >
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

FatButton.propTypes = {
  title: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  panelButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#ffdc50',
    alignItems: 'center',
    marginTop: -2,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#322d70',
  },
});

export default FatButton;
