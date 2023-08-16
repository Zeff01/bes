import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TimelogTime = ({ total_hrs, total_late_hrs, total_ot_hrs }) => {
  return (
    <View className="gap-2 w-full my-2 px-2 ">
      <View className="flex-row space-x-3 mb-1  justify-center w-full ">
        <View className="p-8 border-[#0B646B] border-2 rounded-lg  w-[50%] ">
          <Icon
            name="timer-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-lg">Late(Hr/s).</Text>
          <Text className="text-center text-base">
            {total_late_hrs?.toFixed(1)}
            {total_late_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
        <View className="p-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
          <Icon
            name="alarm-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-lg">Overtime(Hr/s).</Text>
          <Text className="text-center text-base">
            {total_ot_hrs?.toFixed(1)} {total_ot_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>
      </View>
      <View className="flex-row space-x-3   justify-center w-full ">
        <View className="py-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
          <Icon
            name="star-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-lg">
            Rendered Time(Hr/s).
          </Text>
          <Text className="text-center text-base">
            {total_hrs?.toFixed(1)} {total_hrs === 1 ? "Hour" : "Hours"}
          </Text>
        </View>

        <View className=" py-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
          <Icon
            name="time-outline"
            size={30}
            color="#000"
            className="mx-auto mb-2"
          />
          <Text className="text-center font-bold text-lg">Time Schedule</Text>
          <Text className="text-center text-base">12:00 PM - 4:00 AM</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelogTime;
