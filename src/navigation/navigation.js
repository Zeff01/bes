import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";
import IonIcons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = "home-outline";
          } else if (route.name === "Timelog") {
            iconName = "time-outline";
          }

          return <IonIcons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Timelog"
        component={Timelog}
        options={{ title: "Timelog" }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
