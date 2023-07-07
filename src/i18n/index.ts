import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import portuguese from './translations/pt_BR/resource.json';
import english from './translations/en_US/resource.json';
import spanish from './translations/es_ES/resource.json';

const resources = {
  pt: { translation: portuguese },
  en: { translation: english },
  es: { translation: spanish },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: getLocales()[0].languageCode,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
