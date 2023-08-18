import { View, Text, TouchableOpacity } from "react-native";
import AnalogClock from "react-native-clock-analog";
import TaskCard from "./TaskCard";

export default function AnalogClockCard({
  hour,
  minute,
  second,
  handleClockInOut,
  isClockIn,
}) {
  return (
    <View className="w-full h-auto  flex-row gap-4 pr-4">
      <View className=" bg-[#0B646B]  rounded-xl py-5 px-3 w-[55%] items-center">
        <View className="items-center">
          <AnalogClock
            size={160}
            // key={key}
            colorClock="#fff"
            colorNumber="black "
            colorCenter="black"
            colorSeconds="black"
            colorHour="black"
            colorMinutes="black"
            autostart={false}
            showSeconds
            hour={hour}
            minutes={minute}
            seconds={second}
          />
          <TouchableOpacity
            className={`mt-6 px-6 py-3  ${
              isClockIn ? "bg-red-500" : "bg-white "
            } rounded-lg`}
            onPress={handleClockInOut}
          >
            <Text className="text-black font-bold">
              {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-[45%]">
        <TaskCard />
      </View>
    </View>
  );
}
