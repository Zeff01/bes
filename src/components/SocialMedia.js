import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { getLinknUrl } from "../utils/getLastPartOfUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SocialMedia() {
  const [data, setData] = useState([]);

  const fblink = !data.facebook
    ? "https://www.facebook.com/facebook/"
    : data.facebook;
  const iglink = !data.instagram
    ? "https://www.instagram.com/instagram/"
    : data.instagram;
  const lklink = !data.linkedin
    ? "https://www.linkedin.com/in/linkedin/"
    : data.linkedin;

  const facebook = getLinknUrl(fblink);
  const linkedin = getLinknUrl(lklink);
  const instagram = getLinknUrl(iglink);

  useEffect(() => {
    const baseURL = "http://bes.outposter.com.au/api/auth/user";
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
  }, []);

  return (
    <View className="w-full flex-row justify-between rounded-lg bg-[#0B646B] py-3 shadow mt-4 px-4">
      <View className="flex-row items-center gap-2">
        <AntDesign name="facebook-square" size={18} color="white" />
        <Text className="text-white text-xs">{facebook}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <AntDesign name="linkedin-square" size={18} color="white" />
        <Text className="text-white text-xs">{linkedin}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <AntDesign name="instagram" size={18} color="white" />
        <Text className="text-white text-xs">{instagram}</Text>
      </View>
    </View>
  );
}
