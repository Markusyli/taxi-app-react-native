import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import LogoutScreen from './screens/Logout';
import OrdersScreen from './screens/Orders';
import PreOrderScreen from './screens/PreOrder';
import { l } from './helpers';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: l('order'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PreOrder"
        component={PreOrderScreen}
        options={{
          title: l('preOrder'),
        }}
      />
    </Stack.Navigator>
  );
}

const Router = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="front"
      hideStatusBar
      edgeWidth={0}
      drawerStyle={{
        width: 300,
      }}
      drawerContentOptions={{
        activeTintColor: '#000',
        labelStyle: {
          fontSize: 20,
          fontWeight: 'normal',
        },
        itemStyle: {
          marginHorizontal: 0,
          borderRadius: 0,
          paddingHorizontal: 15,
          paddingVertical: 5,
          marginVertical: 5,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ title: l('order') }} />
      <Drawer.Screen name="Details" component={SettingsScreen} options={{ title: l('settings') }} />
      <Drawer.Screen name="Orders" component={OrdersScreen} options={{ title: l('driverOrders') }} />
      <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: l('logout') }} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Router;
