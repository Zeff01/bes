import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { View, Image, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DarkModeSwitch from "../components/DarkModeSwitch";
import ThemeContext from "../store/darkMode/theme-context";

const baseURL = "http://bes.outposter.com.au/api/auth/user";

function SignOut() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
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
  const { themeIs } = useContext(ThemeContext);
  return (
    <View
      className={`${
        themeIs === "light"
          ? "bg-white border-gray-300"
          : "bg-darkSecondary border-darkPrimary"
      } flex-row p-4 m-2 rounded-full border-b border-r `}
    >
      <View className="flex-row w-full items-center justify-center">
        <View className="mr-[8]">
          <Ionicons
            name={iconName}
            size={22}
            color={`${themeIs === "light" ? "#87B0B6" : "#aaedfc"}`}
          />
        </View>

        <Text
          className={`${
            themeIs === "light" ? "text-primaryColor" : "text-whiteColor"
          } text-base `}
        >
          {content}
        </Text>
      </View>
    </View>
  );
}

export default function Profile() {
  const [data, setData] = useState([]);
  const { themeIs } = useContext(ThemeContext);

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
    <SafeAreaView
      className={`flex-1 ${
        themeIs === "light" ? "bg-tertiaryColor" : "bg-darkPrimary"
      } justify-end relative`}
    >
      {themeIs === "light" && (
        <>
          <View className="h-[700] w-[700] rounded-full bg-primaryColor absolute left-[-260] top-[-90]"></View>
          <View className="h-[690] w-[690] rounded-full bg-secondaryColor absolute left-[50] top-[0]"></View>
        </>
      )}
      <DarkModeSwitch />
      <View
        className={`flex-[0.80] ${
          themeIs === "light"
            ? "bg-quinaryColor"
            : "bg-darkTertiary border border-darkSenary"
        } rounded-t-[50] items-center`}
      >
        <View
          className={`
          ${
            themeIs === "light"
              ? "bg-gray-300 h-[126] w-[126]"
              : "bg-darkSenary h-[123] w-[123] "
          }
            rounded-full 
            top-[-63] 
            justify-center 
            items-center 
            absolute
          `}
        >
          <View
            className={`${
              themeIs === "light" ? "bg-primaryColor" : "bg-darkTertiary"
            } h-[120] w-[120] rounded-full justify-center items-center absolute`}
          >
            <Image
              className="w-[110] h-[110] rounded-full"
              src={`https://bes.outposter.com.au/images/avatars/${data.avatar}`}
            />
          </View>
        </View>
        <View className="mt-[70] mb-[20]">
          <Text
            className={`${
              themeIs === "light" ? "text-primaryColor" : "text-whiteColor"
            } text-4xl font-black text-center mt-3`}
          >
            {data.name}
          </Text>
          <Text
            className={`${
              themeIs === "light" ? "text-blackColor " : "text-darkSenary"
            } text-md font-light text-center uppercase tracking-widest`}
          >
            {data.position}
          </Text>
        </View>
        <View className="flex-1 justify-between p-12">
          <View>
            <PersonalInfo
              iconName={"mail"}
              text={"EMAIL"}
              content={data.email}
            />
            <PersonalInfo
              iconName={"call"}
              text={"PHONE NUMBER"}
              content={data.phone}
            />
            {formattedBirthDate ? (
              <PersonalInfo
                iconName={"calendar"}
                text={"BIRTHDAY"}
                content={formattedBirthDate}
              />
            ) : null}
          </View>
          <View
            className="justify-end mb-[20] items-center"
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
          >
            <SignOut />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
