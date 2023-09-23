import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Timelog") {
            iconName = focused ? "ios-time" : "ios-time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return <Ionicons name={iconName} size={size} color={"#0B646B"} />;
        },
        tabBarActiveTintColor: "#0B646B",
        tabBarInactiveTintColor: "#0B646B",
        tabBarStyle: {
          height: 50,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Timelog" component={Timelog} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
