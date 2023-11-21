import React from "react";
import { View, Text } from "react-native";
import TimelogTime from "../TimelogSummaryData/TimelogTime";

const TimelogSummaryDetails = ({ data }) => {
  return (
    <View className="mx-4 -mt-24 space-y-4 z-10">
      <Text className="text-lg font-light tracking-widest text-whiteColor uppercase text-center">
        Summary
      </Text>
      <TimelogTime
        data={data}
        total_ot_hrs={data.total_ot_hrs}
        total_hrs={data.total_hrs}
        total_late_hrs={data.total_late_hrs}
      />
    </View>
  );
};

export default TimelogSummaryDetails;
