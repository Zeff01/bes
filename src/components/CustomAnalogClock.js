import React, { useContext } from "react";
import { View } from "react-native";
import AnalogClock from "react-native-clock-analog";
import ThemeContext from "../store/darkMode/theme-context";

const CustomAnalogClock = ({ size, hour, minute, second }) => {
  const { themeIs } = useContext(ThemeContext);
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
      className={`${
        themeIs === "light" ? "bg-quinaryColor" : "bg-darkPrimary"
      } rounded-full p-4`}
    >
      <View
        className={`${
          themeIs === "light" ? "bg-white" : "bg-darkPrimary"
        } rounded-full p-2`}
      >
        <AnalogClock
          size={size}
          colorClock={themeIs === "light" ? "#fff" : "#141414"}
          colorNumber={themeIs === "light" ? "#000000" : "#aaedfc"}
          colorCenter="#000000"
          colorSeconds={themeIs === "light" ? "#000000" : "#2b6673"}
          colorHour={themeIs === "light" ? "#000000" : "#2b6673"}
          colorMinutes={themeIs === "light" ? "#000000" : "#2b6673"}
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
