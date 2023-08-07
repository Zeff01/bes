import React, { useState, useEffect, createContext, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import AnalogClock from "react-native-clock-analog";
import AsyncStorage from "@react-native-async-storage/async-storage";

const nowDate = () => {
  const d = new Date();
  let second = d.getSeconds();
  let minute = d.getMinutes();
  let hour = d.getHours();
  return { second, minute, hour };
};

const useNowTimer = () => {
  const { second, minute, hour } = nowDate();

  const [state, setState] = useState({
    second,
    minute,
    hour,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { second, minute, hour } = nowDate();

      setState({ second, minute, hour });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
};

const ClockInContext = createContext();

const ClockInProvider = ({ children }) => {
  const [isClockIn, setIsClockIn] = useState(false);

  return (
    <ClockInContext.Provider value={{ isClockIn, setIsClockIn }}>
      {children}
    </ClockInContext.Provider>
  );
};

const Home = () => {
  const { second, minute, hour } = useNowTimer();
  const key = `${hour}:${minute}:${second}`;

  const { isClockIn, setIsClockIn } = useContext(ClockInContext);

  const handleClockInOut = async () => {
    setIsClockIn(!isClockIn);

    try {
      const token = await AsyncStorage.getItem("@auth_token");

      const response = await fetch("https://bes.outposter.com.au/api/clock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          console.log("Token already exists in AsyncStorage", token);
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkToken();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-8">
      <AnalogClock
        key={key}
        colorClock="#ffffff"
        colorNumber="#000000"
        colorCenter="#009598"
        colorSeconds="#009598"
        colorHour="#333333"
        colorMinutes="#000000"
        autostart={false}
        showSeconds
        hour={hour}
        minutes={minute}
        seconds={second}
      />
      <TouchableOpacity
        className={`mt-4 px-6 py-4 ${
          isClockIn ? "bg-red-500" : "bg-primary"
        } rounded-lg`}
        onPress={handleClockInOut}
      >
        <Text className="text-white font-bold">
          {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default () => (
  <ClockInProvider>
    <Home />
  </ClockInProvider>
);
