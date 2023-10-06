import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "../store/darkMode/theme-context";

export default function Task({ task }) {
  const [isChecked, setIsChecked] = useState(false);
  const { themeIs } = useContext(ThemeContext);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View
      className={`${
        themeIs === "light"
          ? "bg-white"
          : "bg-darkSecondary border-b border-r border-darkPrimary"
      } p-4 rounded-lg mx-2 mb-4`}
      style={{
        shadowColor: themeIs === "light" ? "#141414" : "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={toggleCheckbox} style={{ padding: 5 }}>
            <Ionicons
              name={isChecked ? "checkmark-circle" : "checkmark-circle-outline"}
              size={32}
              color={
                themeIs === "light"
                  ? isChecked
                    ? "#2B6673"
                    : "#87B0B6"
                  : themeIs === "dark"
                  ? isChecked
                    ? "#aaedfc"
                    : "#2b6673"
                  : null
              }
            />
          </TouchableOpacity>
          <Text
            className={`${
              themeIs === "light" ? "text-blackColor" : "text-whiteColor"
            } text-normal font-light`}
          >
            {task}
          </Text>
        </View>

        <Ionicons
          name="create-outline"
          size={20}
          color={`${themeIs === "light" ? "#87B0B6" : "#2b6673"}`}
        />
      </View>
    </View>
  );
}
