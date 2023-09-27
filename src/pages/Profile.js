import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Image, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const baseURL = "http://bes.outposter.com.au/api/auth/user";

function SignOut() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      console.log("logout");
      const token = await AsyncStorage.removeItem("@auth_token");
      console.log("logout", token);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View>
      <TouchableOpacity
        className=" w-[150] py-4 bg-primaryColor rounded-full"
        onPress={handleLogout}
      >
        <View className="justify-center items-center ">
          <Text className="text-whiteColor font-bold">SIGN OUT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function PersonalInfo({ iconName, text, content }) {
  return (
    <View className="justify-center items-center flex-row w-full px-[30] py-[4]">
      <View className="ml-20 pl-10 flex-row w-full justify-start items-center">
        <Ionicons name={iconName} size={22} color="#2B6673" />
        <Text className="ml-3 text-base text-primaryColor">{content}</Text>
      </View>
    </View>
  );
}

export default function Profile() {
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

  // 2022-02-01T00:00:01-04:00

  // const formattedBirthDate = formatDate(data?.birth_date);
  const formattedBirthDate = formatDate("2022-02-01T00:00:01-04:00");
  const formattedRegistrationDate = formatDate(data?.created_at);
  const formattedLatestAct = formatDate(data.updated_at);

  function formatDate(inputDate) {
    if (inputDate) {
      const date = new Date(inputDate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    return "";
  }

  return (
    <SafeAreaView className="flex-1 bg-tertiaryColor justify-end relative">
      <View className="h-[700] w-[700] rounded-full bg-primaryColor absolute left-[-460] top-[-350]"></View>
      <View className="h-[690] w-[690] rounded-full bg-secondaryColor absolute left-[30] top-[50]"></View>
      <View className="flex-[0.80] bg-whiteColor rounded-t-[50] items-center">
        <View className="h-[126] w-[126] rounded-full bg-gray-300 top-[-63] justify-center items-center absolute">
          <View className="h-[120] w-[120] rounded-full bg-primaryColor justify-center items-center absolute">
            <Image
              className="w-[110] h-[110] rounded-full"
              src={`https://bes.outposter.com.au/images/avatars/${data.avatar}`}
              // src={
              //   "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
              // }
              // src={
              //   "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              // }
            />
          </View>
        </View>
        <View className="mt-[70] mb-[20]">
          <Text className="text-primaryColor text-4xl font-bold text-center">
            {data.name}
          </Text>
          <Text className="text-blackColor text-xl font-semibold text-center">
            {data.position}
          </Text>
        </View>
        <View className="flex-1 justify-between">
          <View>
            <PersonalInfo
              iconName={"mail-outline"}
              text={"EMAIL"}
              content={data.email}
            />
            <PersonalInfo
              iconName={"call-outline"}
              text={"PHONE NUMBER"}
              content={data.phone}
            />
            {formattedBirthDate ? (
              <PersonalInfo
                iconName={"calendar-outline"}
                text={"BIRTHDAY"}
                content={formattedBirthDate}
              />
            ) : null}
          </View>
          <View className="justify-end mb-[20] items-center">
            <SignOut />
          </View>
        </View>
        {/* <View className="h-[100] w-[100] "></View> */}
      </View>
    </SafeAreaView>
  );
}
