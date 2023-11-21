import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ThemeContext from "../store/darkMode/theme-context";
import { MARGIN, SIZE, WIDTH } from "../utils/draggable";
import Animated from "react-native-reanimated";

export default function Task({
  isSort,
  task,
  setTask,
  index,
  deleteItem,
  isEditModalVisible,
  setIsEditModalVisible,
  setEditIndex,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const { themeIs } = useContext(ThemeContext);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Animated.View
      className={`${
        themeIs === "light"
          ? "bg-white"
          : "bg-darkSecondary border-b border-r border-darkPrimary"
      } p-4 rounded-lg mx-2`}
      style={{
        height: SIZE - MARGIN * 2,
        width: isSort ? WIDTH - 50 : WIDTH,
        margin: MARGIN,
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

        <View className="flex-row">
          <TouchableOpacity
            onPress={() => {
              setIsEditModalVisible(!isEditModalVisible);
              setEditIndex(index);
              setTask(task);
            }}
          >
            <Ionicons
              name="create-outline"
              size={24}
              color={`${themeIs === "light" ? "#87B0B6" : "#2b6673"}`}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteItem(index)}>
            <AntDesign
              className="mx-[10]"
              name="delete"
              size={24}
              color={`${themeIs === "light" ? "#87B0B6" : "#2b6673"}`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
