import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../../Screens/SplashScreen';
import Settings from '../../Tabs/Settings';
import BottomTabs from '../BottomTabs';

export type RootStackParamList = {
  SplashScreen: undefined;
  EntryPoint: undefined;
  Settings: undefined;
};

export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
      <Screen name="SplashScreen" component={SplashScreen} />
      <Screen name="EntryPoint" component={BottomTabs} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  )
}
