import React, { useState, useEffect, useRef } from "react";
import { Platform, Vibration } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Asset } from "expo-asset";

// setting up custom notification handler - this will execute whenever notification is received.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// notif titles
const NOTIFICATION_TITLES = {
  TIME_IN: "Time-in Notification!",
  TIME_OUT: "Time-out Notification!",
};

// notif messages
const NOTIFICATION_MESSAGES = {
  TIME_IN: "15 minutes before time-in.",
  TIME_OUT: "15 minutes before time-out.",
};

// notif channel - to customize desired notification when displayed on android.
const setupNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

// requesting permission async func(allow or not)
const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  console.log(finalStatus);

  return finalStatus;
};

// getting token from projectId(need for sending specifc notif "to")
const getToken = async () => {
  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })
  ).data;

  return token;
};

// async func for schduling notification
const schedulePushNotification = async (
  expoPushToken,
  title,
  body,
  hour,
  minute,
  localUri
) => {
  try {
    // 1st object parameter of scheduleNotificationAsync
    const notificationContent = {
      to: expoPushToken,
      autoDismiss: false,
      sound: true,
      title,
      body,
      // attachment banner notif - dependable on every phones settings. I think this will work if it's an actual app and allow the pop on screen on app settings.
      attachments: [
        {
          identifier: "icon",
          uri: localUri,
        },
      ],
    };

    // 2nd object parameter of scheduleNotificationAsync
    const triggerOptions = {
      hour,
      minute,
      repeats: true,
    };

    // invocation
    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: triggerOptions,
    });
  } catch (err) {
    console.error(`Error in schedulePushNotification: ${title}`, err);
  }
};

// Notification Comp
export const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();

  // import logo icon(for banner notif)
  const logoAsset = Asset.fromModule(require("../../assets/images/icon.png"));

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      // make sure it is downloaded to make it work.
      await logoAsset.downloadAsync();

      try {
        // invocation of the channel which is needed to customize desired display notification.
        await setupNotificationChannel();

        // send an alert if dev is using simulator
        if (!Device.isDevice) {
          alert(
            "I suggest that you use a physical device for better client experience."
          );
        }

        // invocation of request permission and put it in constant var "finalStatus"
        // if this is denied you won't get notifications.
        const finalStatus = await requestNotificationPermissions();
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }

        // invocation of getting the token
        const token = await getToken();
        if (!token) {
          console.error("Failed to get Expo push token.");
          return;
        }

        console.log("token: ", token);
        setExpoPushToken(token);

        // invocation of scheduling of notification for time-in
        await schedulePushNotification(
          token,
          NOTIFICATION_TITLES.TIME_IN,
          NOTIFICATION_MESSAGES.TIME_IN,
          6,
          45,
          logoAsset.localUri
        );

        // invocation of scheduling of notification for time-out
        await schedulePushNotification(
          token,
          NOTIFICATION_TITLES.TIME_OUT,
          NOTIFICATION_MESSAGES.TIME_OUT,
          15,
          45,
          logoAsset.localUri
        );

        return token;
      } catch (err) {
        // if you experience this error, try to check settings of expo/app itself if notifications coming frop this app is allowed. If the first one doesn't work uninstall expo go app and then reinstall it. That will resolve the problem.
        console.error("Error registerForPushNotificationsAsync", err);
      }
    };

    // invocation of pushNotif func
    registerForPushNotificationsAsync();

    // event for receiving the notification
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        // after it received this will happen
        if (Platform.OS === "android") {
          Vibration.vibrate([0, 250, 250, 250]); // custom for andorid
        } else {
          Vibration.vibrate(); // default for ios
        }
      });

    return () => {
      // remove listener - cleanup/best practice(performance issue)
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);
};
