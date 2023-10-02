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

  const formattedTimeIn = String(data.time_in).slice(0, 5);
const formattedTimeOut = String(data.time_out).slice(0, 5);

  return (
    <View className="flex gap-2 w-full mt-2 mb-3">
      <View className="flex-row space-x-3 mb-1 items-center justify-center w-full mx-3">
        <View className="bg-white rounded-lg w-[48%] h-[150px] justify-center items-center" style={{
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
            name="timer"
            size={30}
            color="#87B0B6"
            className="mx-auto mb-2"
          />
          <Text className="text-2xl font-bold text-secondaryColor">{total_late_hrs?.toFixed(1)}</Text>
          <Text className="text-center font-light text-sm">Late(Hr/s)</Text>
        </View>

        <View className="bg-white justify-center items-center rounded-lg w-[48%] h-[150px]" style={{
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
              name="alarm"
              size={30}
              color="#87B0B6"
              className="mx-auto mb-2"
            />
            <Text className="text-2xl font-bold text-secondaryColor">{total_ot_hrs?.toFixed(1)}</Text>
            <Text className="text-center font-light text-sm text-black">Overtime(Hr/s)</Text>
        </View>
      </View>
      <View className="flex-row space-x-3 justify-center w-full mx-3">
        <View className="bg-white justify-center items-center rounded-lg text-center h-[150px] w-[48%]" style={{
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
            name="star"
            size={30}
            color="#87B0B6"
            className="mx-auto mb-2"
          />
          <Text className="text-2xl font-bold text-secondaryColor">{total_hrs?.toFixed(1)}</Text>
          <Text className="text-center font-light text-sm">
            Rendered Time(Hr/s)
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
            name="time"
            size={30}
            color="#87B0B6"
            className="mx-auto mb-2"
          />
          <Text className="text-2xl font-bold text-secondaryColor">{formattedTimeIn} - {formattedTimeOut}</Text>
          <Text className="text-center font-light text-sm">Time Schedule</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogTime;
