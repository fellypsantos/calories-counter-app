import React from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import './i18n.config';
import Colors from './src/Colors';
import AppProvider from './src/hooks';
import MainStack from './src/routes/MainStack';
import DataBaseInit from './src/databases/DataBaseInit';
import { TranslationProvider } from './src/hooks/translation';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    if (__DEV__) console.log('Google Ads Loaded.');
  });

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <StatusBar backgroundColor={Colors.Primary} style='light' />
        <TranslationProvider>
          <DataBaseInit>
            <AppProvider>
              <NavigationContainer>
                <MainStack />
              </NavigationContainer>
            </AppProvider>
          </DataBaseInit>
        </TranslationProvider>
      </View>
    </GestureHandlerRootView>
  )
}
