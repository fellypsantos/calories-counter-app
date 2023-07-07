import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';

import AddFoodRegistry from './src/Screens/AddFoodRegistry';
import SplashScreen from './src/Screens/SplashScreen';
import EntryPoint from './src/Screens/EntryPoint';
import React from 'react';

import { RealmProvider } from './src/databases';
import Colors from './src/Colors';
import { TranslationProvider } from './src/contexts/TranslationContext';

import './src/i18n';
const Stack = createNativeStackNavigator();

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('Google Ads Loaded.');
  });

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <StatusBar backgroundColor={Colors.Primary} style='light' />
      <TranslationProvider>
        <RealmProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
              <Stack.Screen name="EntryPoint" component={EntryPoint} />
              <Stack.Screen name="AddFoodRegistry" component={AddFoodRegistry} />
            </Stack.Navigator>
          </NavigationContainer>
        </RealmProvider>
      </TranslationProvider>
    </View>
  )
}
