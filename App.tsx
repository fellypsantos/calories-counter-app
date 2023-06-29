import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from './src/Colors';
import SplashScreen from './src/Screens/SplashScreen';
import EntryPoint from './src/Screens/EntryPoint';
import React from 'react';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <StatusBar backgroundColor={Colors.Primary} style='light' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
          <Stack.Screen name="EntryPoint" component={EntryPoint} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
