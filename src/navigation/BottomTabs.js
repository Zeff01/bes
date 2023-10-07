import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";
import Profile from "../pages/Profile";
import ThemeContext from "../store/darkMode/theme-context";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { themeIs } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Timelog") {
            iconName = focused ? "ios-time" : "ios-time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={themeIs === "light" ? "#0B646B" : "#aaedfc"}
            />
          );
        },
        tabBarActiveTintColor: "#0B646B",
        tabBarInactiveTintColor: "#0B646B",
        tabBarStyle: {
          height: 60,
          paddingTop: 12,
          backgroundColor: themeIs === "light" ? "#F5F5FA" : "#282828",
        },
        tabBarLabel: "",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Timelog" component={Timelog} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
