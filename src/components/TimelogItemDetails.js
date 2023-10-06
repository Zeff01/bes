import React, { useContext } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ThemeContext from "../store/darkMode/theme-context";

const TimelogItemDetails = ({ label, value, icon }) => {
  const { themeIs } = useContext(ThemeContext);
  return (
    <View className="flex-row gap-0 items-center mt-2 mb-1 align-middle">
      <View
        className={`${
          themeIs === "light" ? "bg-primaryColor" : "bg-darkPrimary"
        } rounded-full p-3 -mr-5 z-10`}
      >
        <Icon
          name={icon}
          size={21}
          color={themeIs === "light" ? "#F5F5FA" : "#aaedfc"}
          className="mx-auto mb-2"
          backgroundColor={themeIs === "light" ? "#2b6673" : "#141414"}
        />
      </View>
      <View
        className={`${
          themeIs === "light"
            ? "bg-tertiaryColor"
            : "bg-darkSecondary border-b border-r border-darkPrimary"
        } flex-row flex-1 py-3.5 pl-5 rounded-r-full gap-x-2`}
      >
        <Text
          className={`${
            themeIs === "light" ? "text-blackColor" : "text-whiteColor"
          } text-sm font-semibold`}
        >
          {label}
        </Text>
        <Text
          className={`${
            themeIs === "light" ? "text-blackColor" : "text-whiteColor"
          }`}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default TimelogItemDetails;
