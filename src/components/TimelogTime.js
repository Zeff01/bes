import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const TimelogTime = ({ total_hrs, total_late_hrs, total_ot_hrs }) => {
  const [data, setData] = useState([]);
  const baseURL = "http://bes.outposter.com.au/api/auth/user";

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
      const data = await res.data;
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <View className="flex gap-2 w-full mt-5 mb-3">
      <Text className="font-black text-xl tracking-widest text-[#0B646B]">Summary</Text>
      <View className="flex-row space-x-3 mb-1 items-center justify-center w-full mx-3">
        <View className="bg-white rounded-lg  w-[48%] h-[150px] justify-center items-center" style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}>
          <Icon
            name="timer-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-sm">Late(Hr/s).</Text>
          <Text className="text-center text-sm">
            {total_late_hrs?.toFixed(1)}
            {total_late_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
        <View className="bg-tertiaryColor justify-center items-center rounded-lg text-center w-[48%] h-[150px]">
          <Icon
            name="alarm-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-sm">Overtime(Hr/s).</Text>
          <Text className="text-center text-sm">
            {total_ot_hrs?.toFixed(1)} {total_ot_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
      </View>
      <View className="flex-row space-x-3 justify-center w-full mx-3">
        <View className="bg-tertiaryColor justify-center items-center rounded-lg text-center h-[150px] w-[48%]">
          <Icon
            name="star-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-sm">
            Rendered Time(Hr/s).
          </Text>
          <Text className="text-center text-sm">
            {total_hrs?.toFixed(1)} {total_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>

        <View className="bg-white justify-center items-center rounded-lg text-center w-[48%] h-[150px]" style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}>
          <Icon
            name="time-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-sm">Time Schedule</Text>
          <Text className="text-center text-sm">
            {data.time_in} - {data.time_out}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogTime;
