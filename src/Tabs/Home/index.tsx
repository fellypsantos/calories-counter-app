import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../Dashboard';
import AddFoodRegistry from '../../Screens/AddFoodRegistry';
import { IFoodRecord } from '../../interfaces/IFoodRecord';

export type SubRootStackParamList = {
  Dashboard: undefined;
  AddFoodRegistry: { foodRecord: IFoodRecord };
};

export type StackNavigationProps = NativeStackNavigationProp<SubRootStackParamList>;

const { Navigator, Screen } = createNativeStackNavigator<SubRootStackParamList>();

export default function Home() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Dashboard'>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="AddFoodRegistry" component={AddFoodRegistry} />
    </Navigator>
  )
}
