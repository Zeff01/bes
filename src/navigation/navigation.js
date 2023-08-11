import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={Home} />
      <Drawer.Screen name="Timelog" component={Timelog} />

      {/* Add additional Drawer.Screen components for other screens */}
    </Drawer.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Timelog" component={Timelog} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
