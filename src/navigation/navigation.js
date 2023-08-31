import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";
import axios from "axios";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Timelog from "../pages/Timelog";
import CustomDrawer from "./CustomDrawer";
import IonIcons from "react-native-vector-icons/Ionicons";
import { subMinutes, parse, format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const baseURL = "http://bes.outposter.com.au/api/auth/user";
  const [timeSchedule, setTimeSchedule] = useState({});
  const [timeIn, setTimeIn] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  // time in notification
  const time_in =
    timeSchedule.time_in === undefined ? "12:00:00" : timeSchedule.time_in;
  const timeInDate = parse(time_in, "HH:mm:ss", new Date());
  const triggerTimeIn = subMinutes(timeInDate, 15);
  const timeInSchedule = format(triggerTimeIn, "hh:mm a");

  // timeout notification
  const time_out =
    timeSchedule.time_out === undefined ? "4:00:00" : timeSchedule.time_out;
  const timeOutDate = parse(time_out, "HH:mm:ss", new Date());
  const triggerTimeOut = subMinutes(timeOutDate, 15);
  const timeOutSchedule = format(triggerTimeOut, "hh:mm a");

  const now = new Date();
  const currentTime = format(now, "hh:mm a");

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
      const schedule = await res.data;
      setTimeSchedule(schedule);
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
      if (currentTime === timeOutSchedule) {
        setTimeOut(true);
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
  }, [timeIn, currentTime, timeOut]);

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
