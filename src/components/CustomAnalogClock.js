import React from "react";
import { View } from "react-native";
import AnalogClock from "react-native-clock-analog";

const CustomAnalogClock = ({ size, hour, minute, second }) => {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      className="bg-quinaryColor rounded-full p-4"
    >
      <View className="bg-white rounded-full p-2">
        <AnalogClock
          size={size}
          colorClock="#fff"
          colorNumber="#000000"
          colorCenter="#000000"
          colorSeconds="#000000"
          colorHour="#000000"
          colorMinutes="#000000"
          autostart={false}
          showSeconds
          hour={hour}
          minutes={minute}
          seconds={second}
        />
      </View>
    </View>
  );
};

export default CustomAnalogClock;
