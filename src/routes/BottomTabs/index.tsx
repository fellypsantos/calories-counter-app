import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/FontAwesome5';

import Home from '../../Tabs/Home';
import Colors from '../../Colors';
import History from '../../Tabs/History';
import Settings from '../../Tabs/Settings';
import CustomTabBarNavigation from '../../components/CustomTabBarNavigation';
import { useAppTranslation } from '../../hooks/translation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type BottomTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

export interface PageProps {
  navigation: NativeStackNavigationProp<BottomTabParamList>;
}

export type BottomTabNavigationProps = NativeStackNavigationProp<BottomTabParamList>;

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { Translate } = useAppTranslation();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBarNavigation {...props} />}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.Primary,
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#f5f5f5',
        tabBarLabelPosition: 'beside-icon',
        tabBarInactiveTintColor: 'gray',

        headerShown: false,

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Settings') iconName = 'cog';

          return <Icon name={iconName} size={15} color={color} />;
        }
      })}
      initialRouteName={'Home'}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: Translate('BottomTab.Home') }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: Translate('BottomTab.History') }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: Translate('BottomTab.Settings') }}
      />
    </Tab.Navigator>
  )
}
