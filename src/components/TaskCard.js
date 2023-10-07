import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Task from "./Task";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeContext from "../store/darkMode/theme-context";

export default function TaskCard() {
  const [isClicked, setIsClicked] = useState(false);
  const { themeIs } = useContext(ThemeContext);

  const toggleIconStyle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View
      className={`${
        themeIs === "light" ? "bg-tertiaryColor" : "bg-darkTertiary"
      } rounded-t-[40] py-8 px-5 mt-4 w-full flex`}
    >
      <View className="rounded-xl pb-2">
        <View className="flex-row items-center justify-between px-3 pb-3">
          <Text
            Text
            className={`${
              themeIs === "light" ? "text-primaryColor" : "text-whiteColor"
            } font-normal text-lg tracking-widest uppercase`}
          >
            Tasks
          </Text>
          <TouchableOpacity
            onPress={toggleIconStyle}
            style={{
              backgroundColor:
                themeIs === "light"
                  ? isClicked
                    ? "#2B6673"
                    : "white"
                  : themeIs === "dark"
                  ? isClicked
                    ? "#aaedfc"
                    : "#2b6673"
                  : null,
              borderRadius: 999,
              padding: 8,
              borderWidth: 1,
              borderColor:
                themeIs === "light"
                  ? isClicked
                    ? "#2B6673"
                    : "#F5F5FA"
                  : themeIs === "dark"
                  ? isClicked
                    ? "#aaedfc"
                    : "#2b6673"
                  : null,
              shadowColor: "#141414",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Ionicons
              name="add-outline"
              size={20}
              color={
                themeIs === "light"
                  ? isClicked
                    ? "#F5F5FA"
                    : "#87B0B6"
                  : themeIs === "dark"
                  ? isClicked
                    ? "#13131A"
                    : "#F5F5FA"
                  : null
              }
            />
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView className="my-2">
            <Task task="Task 1" />
            <Task task="Task 2" />
            <Task task="Task 3" />
            <Task task="Task 4" />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
