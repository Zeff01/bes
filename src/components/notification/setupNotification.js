// NotificationManager.js
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { addMinutes, isBefore } from "date-fns";
import { useDataContext } from "../../store/dataContext/DataContext";

export const setupNotification = () => {
  const { userData: data } = useDataContext();

  useEffect(() => {
    // Request permission for notifications
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  const scheduleNotification = async () => {
    const today = new Date();
    const timeInDate = new Date(
      today.toISOString().split("T")[0] + "T" + data.time_in
    );


    const timeOutDate = new Date(
      today.toISOString().split("T")[0] + "T" + data.time_out
    );

    // Schedule notification 15 minutes before time in
    const notificationTimeIn = addMinutes(timeInDate, -15);
    if (isBefore(today, notificationTimeIn)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time In Reminder",
          body: "Your time-in is in 15 minutes!",
        },
        trigger: {
          date: notificationTimeIn,
        },
      });
    }

    // Schedule notification 15 minutes before time out
    const notificationTimeOut = addMinutes(timeOutDate, -15);
    if (isBefore(today, notificationTimeOut)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time Out Reminder",
          body: "Your time-out is in 15 minutes!",
        },
        trigger: {
          date: notificationTimeOut,
        },
      });
    }
  };

  useEffect(() => {
    scheduleNotification();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
        // Handle the notification as needed
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);
};
