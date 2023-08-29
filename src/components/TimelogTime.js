import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { api_get_user } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const TimelogTime = ({ total_hrs, total_late_hrs, total_ot_hrs }) => {
  const [data, setData] = useState([])
  const baseURL = "http://bes.outposter.com.au/api/auth/user"

  useEffect(()=> {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
          },
      };
      const res = await axios.get(baseURL, config)
      const data = await res.data
      setData(data)
    }
    fetchData()
  },[])

  

  return (
    <View className="gap-2 w-full my-2 px-2 flex">
      <View className="flex-row space-x-3 mb-1 items-center justify-center w-full mx-3">
        <View className="p-8 border-[#0B646B] border-2 rounded-lg  w-[48%] ">
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
        <View className="p-8 border-[#0B646B] border-2 rounded-lg text-center w-[48%]">
          <Icon
            name="alarm-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-sm">
            Overtime(Hr/s).
          </Text>
          <Text className="text-center text-sm">
            {total_ot_hrs?.toFixed(1)} {total_ot_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
      </View>
      <View className="flex-row space-x-3   justify-center w-full mx-3">
        <View className="py-8 border-[#0B646B] border-2 rounded-lg text-center w-[48%]">
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

        <View className=" py-8 border-[#0B646B] border-2 rounded-lg text-center w-[48%]">
          <Icon
            name="time-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-sm">
            Time Schedule
          </Text>
          <Text className="text-center text-sm">{data.time_in} - {data.time_out}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogTime;
