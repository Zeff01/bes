import Navigation from "./src/navigation/navigation";
import { useState, useEffect, useRef } from "react";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device';
import { SafeAreaView } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// remove this
if (Platform.OS === 'android') {
  await Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
} else {
  alert('Must use physical device for Push Notifications');
}

// ----------------------------------------------------------------

export default function App() {
  const [data, setData] = useState([]);

  const baseURL = "http://bes.outposter.com.au/api/auth/user";

  useEffect(() => {
    async function fetchTargetTimeFromAPI() {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(baseURL, config);
        const data = await response.data;
        setData(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    fetchTargetTimeFromAPI();
  }, []);

  async function scheduleNotification() {
    const now = new Date();

    const timeInSchedule = data.time_in;
    const [hours, minutes] = timeInSchedule.split(":");

    const scheduleTime = new Date();
    scheduleTime.setHours(parseInt(hours, 10));
    scheduleTime.setMinutes(parseInt(minutes, 10));

    const targetTime = new Date(scheduleTime);
    targetTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    const triggerTime = new Date(targetTime);
    triggerTime.setMinutes(targetTime.getMinutes() - 15);

    if (triggerTime <= now) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Reminder: ${data.time_in} ${
            parseInt(data.time_in, 10) >= 12 ? "PM" : "AM"
          } is coming soon!`,
        },
        trigger: triggerTime,
      });
      console.log("Notification scheduled successfully.");
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }
  scheduleNotification();

  return (
    <>
      <Navigation />
    </>
  );
}
