import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/FontAwesome5';

import Home from '../../Tabs/Home';
import Colors from '../../Colors';
import History from '../../Tabs/History';
import Settings from '../../Tabs/Settings';
import CustomTabBarNavigation from '../CustomTabBarNavigation';

const Tab = createBottomTabNavigator();

export default function () {
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
                options={{ tabBarLabel: 'Inicio' }}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{ tabBarLabel: 'Histórico' }}
            />

            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{ tabBarLabel: 'Configurações' }}
                initialParams={{ isFirstRun: false }}
            />
        </Tab.Navigator>
    );
}