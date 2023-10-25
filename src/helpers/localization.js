/* eslint-disable global-require */
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';

const translationGetters = {
  en: () => require('../locales/en.json'),
  fi: () => require('../locales/fi.json'),
};

export const l = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
  const locale = Localization.locale.split('-')[0];
  const languageTag = (locale in translationGetters) ? locale : 'en';
  const isRTL = Localization.isRTL || false;

  l.cache.clear();

  I18nManager.forceRTL(isRTL);

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
