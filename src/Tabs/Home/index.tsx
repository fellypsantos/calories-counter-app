import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../Dashboard';
import AddFoodRegistry from '../../Screens/AddFoodRegistry';

export type RootStackParamList = {
  Dashboard: undefined;
  AddFoodRegistry: undefined;
};

export type StackNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Home() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Dashboard'>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="AddFoodRegistry" component={AddFoodRegistry} />
    </Navigator>
  )
}
