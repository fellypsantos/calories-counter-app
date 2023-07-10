import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../../Screens/SplashScreen';
import AddFoodRegistry from '../../Screens/AddFoodRegistry';
import Settings from '../../Tabs/Settings';
import BottomTabs from '../BottomTabs';

export type RootStackParamList = {
  SplashScreen: undefined;
  EntryPoint: undefined;
  AddFoodRegistry: undefined;
  Settings: undefined;
};

export interface PageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export type StackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
      <Screen name="SplashScreen" component={SplashScreen} />
      <Screen name="EntryPoint" component={BottomTabs} />
      <Screen name="AddFoodRegistry" component={AddFoodRegistry} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  )
}
