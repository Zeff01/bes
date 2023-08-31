import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";
import getPermission from "../utils/getPermission";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";
import CustomDrawer from "./CustomDrawer";
import IonIcons from "react-native-vector-icons/Ionicons";
import { subMinutes, parse, format } from "date-fns";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeDrawer() {
  const [data, setData] = useState({});
  const [timeIn, setTimeIn] = useState(false);
  const time_in = data.time_in === undefined ? "12:00:00" : data.time_in;
  // const time_in = "17:55:00";
  const timeInDate = parse(time_in, "HH:mm:ss", new Date());
  const triggerTime = subMinutes(timeInDate, 15);
  const now = new Date();
  const currentTime = format(now, "hh:mm a");
  const timeInSchedule = format(triggerTime, "hh:mm a");
  console.log(timeInSchedule);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(baseURL, config);
      setData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const scheduleNotification = async () => {
      if (currentTime === timeInSchedule) {
        setTimeIn(true);
        console.log("true", timeIn);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Upcoming Work",
            body: "Your work is upcoming in 15 minutes.",
          },
          trigger: { seconds: 2, repeats: false },
        });
      }
    };

    scheduleNotification();
  }, [setTimeIn, timeIn, currentTime]);

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
