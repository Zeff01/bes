import React from "react";
import { View, Text } from "react-native";

const TimelogItemDetails = ({ label, value }) => {
  return (
    <View className="flex-row gap-2 items-center mb-1 ">
      <Text className="text-lg font-bold">{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default TimelogItemDetails;
