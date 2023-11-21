import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PersonalInfoCard = ({ iconName, content, themeIs }) => {

  return (
    <View
      className={`${
        themeIs === "light"
          ? "bg-white border-gray-300"
          : "bg-darkSecondary border-darkPrimary"
      } flex-row p-4 m-2 rounded-full border-b border-r `}
    >
      <View className="flex-row w-full items-center justify-center">
        <View className="pr-[8]">
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
};

export default PersonalInfoCard;
