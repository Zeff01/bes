import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";

const baseURL = "http://bes.outposter.com.au/api/auth/user";

const TimelogInfoBox = () => {
  const [data, setData] = useState([]);

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
      setData(res.data);
    };
    fetchData();
  }, [baseURL]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const birthDate = data?.birth_date;
  const registerDate = data?.email_verified_at;
  const latestAct = data?.updated_at;

  const formattedBirthDate = formatDate(birthDate);
  const formattedRegistrationDate = formatDate(registerDate);
  const formattedLatestAct = formatDate(latestAct);

  return (
    <View className="w-full  rounded-lg  py-3 bg-[#0B646B] shadow">
      <View className="px-4 flex space-y-1 ">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl mb-2 font-bold  pt-2 text-white">
              {data.name}
            </Text>
            <Text className="leading-[14px] text-md text-white ">
              {data.position} - {data.job_type}
            </Text>
          </View>
          <View>
            <Text className="text-white text-lg bg-[#137c84] font-bold px-2 py-1 rounded-full">
              {data.role}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Birthdate:</Text>
          <Text className="text-white text-[15px]">
            {formattedBirthDate === undefined || "Invalid Date"
              ? formattedBirthDate
              : "asd"}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Email: </Text>
          <Text className="text-white text-[15px]">{data.email}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Phone No:</Text>
          <Text className="text-white text-[15px]">{data.phone}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Registered:</Text>
          <Text className="text-white text-[15px]">
            {formattedBirthDate === undefined || "Invalid Date"
              ? formattedRegistrationDate
              : ""}{" "}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">
            Latest Activity:
          </Text>
          <Text className="text-white text-[15px]">
            {formattedBirthDate === undefined || "Invalid Date"
              ? formattedLatestAct
              : ""}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Verified:</Text>
          <Text className="text-white text-[15px]">Yes</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">User Id:</Text>
          <Text className="text-white text-[15px]">{data.id}</Text>
        </View>
        <View className="flex-row items-center gap-2 ">
          <Text className="font-semibold text-xl text-white">Status:</Text>
          <Text className="text-white text-[15px]">{data.status}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogInfoBox;
