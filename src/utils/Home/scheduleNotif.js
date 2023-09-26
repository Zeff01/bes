import { subMinutes, parse, addMinutes } from "date-fns";
import * as Notifications from "expo-notifications";

export const scheduleNotif = async (timeIn, timeOut) => {
  if (!timeIn || !timeOut) {
    return;
  }

  const timeInDate = parse(timeIn, "HH:mm:ss", new Date());
  const timeOutDate = parse(timeOut, "HH:mm:ss", new Date());
  const triggerTimeIn = subMinutes(timeInDate, 15);
  const triggerTimeOut = addMinutes(timeOutDate, 15);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Clock In",
      body: "You have to clock in in 15 minutes.",
    },
    trigger: {
      hour: triggerTimeIn.getHours(),
      minute: triggerTimeIn.getMinutes(),
      second: 0,
      repeats: true,
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Clock Out",
      body: "You could have clocked out 15 minutes ago.",
    },
    trigger: {
      hour: triggerTimeOut.getHours(),
      minute: triggerTimeOut.getMinutes(),
      second: 0,
      repeats: true,
    },
  });
};
