import React from "react";
import { Text, View, Image } from "react-native";
import { Avatar } from "@react-native-material/core";

const TimelogHeader = () => {
  return (
    <View className="flex-row justify-between">
      <View>
        <Image
          source={require("../../assets/outposter_logo.png")}
          className="w-[250px] h-[50px]"
        />
        <Text className="font-bold text-2xl leading-[23px] mb-2">
          client information
        </Text>
      </View>
      <Avatar
        image={require("../../assets/profile.jpg")}
        className="w-[70px] h-[70px] rounded-full"
      />
    </View>
  );
};

export default TimelogHeader;
