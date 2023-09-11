import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";
import CustomDrawer from "./CustomDrawer";
import IonIcons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        drawerLabelStyle: {
          marginLeft: -15,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <IonIcons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Timelog"
        component={Timelog}
        options={{
          drawerIcon: ({ color }) => (
            <IonIcons name="time-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
