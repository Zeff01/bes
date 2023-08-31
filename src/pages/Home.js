import React, { useState, useEffect, createContext, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnalogClock from "react-native-clock-analog";
import HomeHeader from "../components/HomeHeader";
import HomeDate from "../components/HomeDate";
import getPermission from "../utils/getPermission";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { ScrollView } from "react-native";

const useNowTimer = () => {
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const { second, minute, hour } = nowDate();
    setState({ second, minute, hour });
  };

  const nowDate = () => {
    const d = new Date();
    return {
      second: d.getSeconds(),
      minute: d.getMinutes(),
      hour: d.getHours(),
    };
  };

  const [state, setState] = useState(nowDate());
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
  const baseURL = "http://bes.outposter.com.au/api/auth/user";
  const [data, setData] = useState({});
  const { second, minute, hour } = useNowTimer();

  const key = `${hour}:${minute}:${second}`;

  function formatTime(hour, minute) {
    const period = hour >= 12 ? " PM" : " AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}${period}`;
  }
  const formattedTime = formatTime(hour, minute);

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
      console.log(token);
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
          getPermission();
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkToken();
  }, []);

  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];

  const formattedDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(baseURL, config);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1   bg-white px-3">
      <HomeHeader name={data.name} src={data.avatar} />
      <HomeDate dayName={dayName} formattedDate={formattedDate} />
      <View className=" bg-[#0B646B] rounded-xl py-10 px-3 w-full h-auto items-center">
        <View className="items-center shadow-xl ">
          <AnalogClock
            size={200}
            key={1}
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
          <Text className="text-gray-400 mt-5 font-semibold text-xl">
            Schedule: {data.time_in} - {data.time_out}
          </Text>
          <TouchableOpacity
            className={`mt-6 px-[50px] py-4  ${
              isClockIn ? "bg-red-500" : "bg-white "
            } rounded-sm`}
            onPress={handleClockInOut}
          >
            <Text className="text-black font-bold">
              {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
            </Text>
          </TouchableOpacity>
          <Text className="my-5 text-3xl font-bold text-gray-300 "></Text>
          <Text className="text-gray-300  font-semibold text-6xl">
            {formattedTime}
          </Text>
        </View>
      </View>
      <View className="mt-5">
        <TaskCard />
      </View>
    </ScrollView>
  );
};

export default () => (
  <ClockInProvider>
    <Home />
  </ClockInProvider>
);
