import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";

const TimelogHeader = () => {
  const [data, setData] = useState([])
  const baseURL = "http://bes.outposter.com.au/api/auth/user";

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
      setData(res.data)
    }
    fetchData()
  },[])



  return (
    <View className="flex-row justify-between">
      <View>
        <Image
          source={require("../../assets/outposter_logo.png")}
          className="w-[250px] h-[50px]"
        />
        <Text className="font-bold text-xl leading-[23px] mb-2">
          Client Information
        </Text>
      </View>
      <Image
        src={data.avatar}
        className="w-[70px] h-[70px] rounded-full"
      />
    </View>
  );
};

export default TimelogHeader;
