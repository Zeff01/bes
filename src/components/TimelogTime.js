import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { api_get_user } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const TimelogTime = ({ total_hrs, total_late_hrs, total_ot_hrs }) => {
  const [data, setData] = useState([])


  useEffect(()=>{
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      const res = await api_get_user({token})
      setData(res)
    }
    fetchData()
  },[])

  return (
    <View className="gap-2 w-full my-2 px-2 ">
      <View className="flex-row space-x-3 mb-1  justify-center w-full ">
        <View className="p-8 border-[#0B646B] border-2 rounded-lg  w-[50%] ">
          <Icon
            name="timer-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-[18px]">Late(Hr/s).</Text>
          <Text className="text-center text-base">
            {total_late_hrs?.toFixed(1)}
            {total_late_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
        <View className="p-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
          <Icon
            name="alarm-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-[18px]">
            Overtime(Hr/s).
          </Text>
          <Text className="text-center text-base">
            {total_ot_hrs?.toFixed(1)} {total_ot_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
      </View>
      <View className="flex-row space-x-3   justify-center w-full ">
        <View className="py-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
          <Icon
            name="star-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-[18px]">
            Rendered Time(Hr/s).
          </Text>
          <Text className="text-center text-base">
            {total_hrs?.toFixed(1)} {total_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>

        <View className=" py-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
          <Icon
            name="time-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-[18px]">
            Time Schedule
          </Text>
          <Text className="text-center text-base">{data.time_in} - {data.time_out}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogTime;
