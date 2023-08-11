import React from "react";
import { Text, View } from "react-native";

const TimelogInfoBox = ({ formattedDate }) => {
  return (
    <View className="w-full  rounded-lg  py-3 bg-[#0B646B] shadow">
      <View className="px-4 flex space-y-1 ">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-bold leading-[30px] pt-2 text-white">
              Jzeff Somers
            </Text>
            <Text className="leading-[14px] text-md text-white ">
              Front End Developer
            </Text>
          </View>
          <View>
            <Text className="text-white text-lg bg-[#137c84] font-bold px-2 py-1 rounded-full">
              {formattedDate}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Registered:</Text>
          <Text className="text-white text-[15px]">2023-06-13 15:13:20</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">
            Latest Activity:
          </Text>
          <Text className="text-white text-[15px]">2023-07-27 13:32:06</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">Verified:</Text>
          <Text className="text-white text-[15px]">Yes</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-xl text-white">User Id:</Text>
          <Text className="text-white text-[15px]">56</Text>
        </View>
        <View className="flex-row items-center gap-2 ">
          <Text className="font-semibold text-xl text-white">Status:</Text>
          <Text className="text-white text-[15px]">Active</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogInfoBox;
