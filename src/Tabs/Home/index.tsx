import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import { IFoodRecord } from '../../interfaces/IFoodRecord';

import Dashboard from '../Dashboard';
import AddFoodRegistry from '../../Screens/AddFoodRegistry';
import DisableAdsIntro from '../../Screens/DisableAdsIntro';
import CuriosityContent from '../../Screens/CuriosityContent';

export type SubRootStackParamList = {
  Dashboard: undefined;
  AddFoodRegistry: { foodRecord: IFoodRecord } | undefined;
  DisableAdsIntro: undefined;
  CuriosityContent: undefined;
};

export type StackNavigationProps = NativeStackNavigationProp<SubRootStackParamList>;

const { Navigator, Screen } = createNativeStackNavigator<SubRootStackParamList>();

export default function Home() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Dashboard'>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="AddFoodRegistry" component={AddFoodRegistry} />
      <Screen name="DisableAdsIntro" component={DisableAdsIntro} />
      <Screen name="CuriosityContent" component={CuriosityContent} />
    </Navigator>
  )
}
