import { useNavigation } from "@react-navigation/native";
import { reqNotifPermission } from "./reqNotifPermission";

import { scheduleNotif } from "./scheduleNotif";
import { getToken } from "../getToken";
import { setupNotifChannel } from "../setupNotifChannel";
import { getPermission } from "../getPermission";

// call this inside useEffect in Home func
export const checkToken = async (data) => {
  const navigate = useNavigation();
  try {
    const token = await getToken();

    if (!token) {
      navigate.navigate("Login");
    }

    if (data.time_in && data.time_out) {
      scheduleNotif(data.time_in, data.time_out);
    } else {
      return;
    }

    if (token) {
      reqNotifPermission();
      getPermission();
      setupNotifChannel();
    }
  } catch (error) {
    console.error("Error Checking Token: ", error);
  }
};