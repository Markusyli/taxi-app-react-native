/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

class LogoutScreen extends React.Component {
  // TODO: Localization
  static navigationOptions = {
    drawerLabel: 'Kirjaudu ulos',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Logout Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }
}

LogoutScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LogoutScreen;
