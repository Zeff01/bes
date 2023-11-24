import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, POST_CLOCK } from "@env";
import getToken from "../../../utils/getToken";
import useAxios from "../../../hooks/use-axios";
import getPermission from "../../../utils/getPermission";
import * as Notifications from "expo-notifications";

const CLOCKIN_NOTIF_DATA = {
  title: "You have clocked in",
  body: "You have clocked in",
};

const CLOCKOUT_NOTIF_DATA = {
  title: "You have clocked out",
  body: "You have clocked out",
};

const ClockInOutBtn = ({ isClockIn, setIsClockIn }) => {
  //   const [isClockIn, setIsClockIn] = useState(false);
  const { isLoading, error, sendRequest } = useAxios();

  useEffect(() => {
    getPermission();
  }, []);

  const handleClockInOut = async () => {
    const token = await getToken();

    await Notifications.scheduleNotificationAsync({
      content: !isClockIn ? CLOCKIN_NOTIF_DATA : CLOCKOUT_NOTIF_DATA,
      trigger: null,
    }); 

    setIsClockIn(!isClockIn);
    AsyncStorage.setItem("@clock_in_status", JSON.stringify(!isClockIn));

    const processData = (objData) => {
      console.log("OBJECT DATA FROM CLOCK-IN/OUT HANDLER: ", objData);
    };

    sendRequest(
      {
        url: `${BASE_URL}${POST_CLOCK}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      processData
    );
  };

  return (
    <TouchableOpacity
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      className={`mt-6 w-[180px] py-4 ${
        isClockIn ? "bg-red-500" : "bg-primaryColor"
      } rounded-full`}
      onPress={handleClockInOut}
    >
      <Text className="text-white font-bold text-center">
        {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
      </Text>
    </TouchableOpacity>
  );
};

export default ClockInOutBtn;
