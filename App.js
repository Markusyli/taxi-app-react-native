import React from 'react';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { setI18nConfig } from './src/helpers';
import Router from './src/router';

export default class App extends React.Component {
  static async loadAssetsAsync() {
    // TODO: Load car types from somewhere internet

    const fontAssets = [MaterialIcons.font, MaterialCommunityIcons.font].map((font) => Font.loadAsync(font));

    await Promise.all([...fontAssets]);
  }

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };

    setI18nConfig();
  }

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.constructor.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Router />
    );
  }
}
