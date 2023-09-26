import { Permissions } from "expo";

export const reqNotifPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    console.warn("Notification perission denied!");
  }
};
