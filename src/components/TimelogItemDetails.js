import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TimelogItemDetails = ({ label, value, icon }) => {
  return (
    <View className="flex-row gap-0 items-center mt-2 mb-1 align-middle">
      <View className="bg-primaryColor rounded-full p-3 -mr-5 z-10">
      <Icon
        name={icon}
        size={21}
        color="#fff"
        className="mx-auto mb-2"
        backgroundColor="#2B6673"
      />
      </View>
      <View className="bg-tertiaryColor flex-row flex-1 py-3.5 pl-5 rounded-r-full gap-x-2">
        <Text className="text-sm font-semibold text-black">
          {label}
        </Text>
        <Text>{value}</Text>
      </View>
      
    </View>
  );
};

export default TimelogItemDetails;
