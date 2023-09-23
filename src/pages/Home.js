import React, { useState, useEffect, createContext, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnalogClock from "react-native-clock-analog";
import HomeDate from "../components/HomeDate";
import getPermission from "../utils/getPermission";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { ScrollView } from "react-native";
import { formatTime } from "../utils/formatTime";
import { Permissions } from "expo";
import { subMinutes, parse, addMinutes } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const useNowTimer = () => {
  const nowDate = () => {
    const d = new Date();
    return {
      second: d.getSeconds(),
      minute: d.getMinutes(),
      hour: d.getHours(),
    };
  };

  const updateTime = () => {
    const { second, minute, hour } = nowDate();
    setState({ second, minute, hour });
  };

  const [state, setState] = useState(nowDate());

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
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
const requestNotificationPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    console.warn("Notification permission denied");
  }
};

const scheduleNotification = async (timeIn, timeOut) => {
  if (!timeIn || !timeOut) {
    return;
  }

  const timeInDate = parse(timeIn, "HH:mm:ss", new Date());
  const timeOutDate = parse(timeOut, "HH:mm:ss", new Date());
  const triggerTimeIn = subMinutes(timeInDate, 15);
  const triggerTimeOut = addMinutes(timeOutDate, 15); 

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Clock In",
      body: "You have to clock in in 15 minutes.",
    },
    trigger: {
      hour: triggerTimeIn.getHours(),
      minute: triggerTimeIn.getMinutes(),
      second: 0,
      repeats: true,
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Clock Out",
      body: "You could have clocked out 15 minutes ago.",
    },
    trigger: {
      hour: triggerTimeOut.getHours(),
      minute: triggerTimeOut.getMinutes(),
      second: 0,
      repeats: true,
    },
  });
};

const Home = () => {
  const baseURL = "http://bes.outposter.com.au/api/auth/user";
  const [data, setData] = useState([]);
  const { second, minute, hour } = useNowTimer();
  const [key, setKey] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigation();

  useEffect(() => {
    const key = `${hour}:${minute}:${second}`;
    setKey(key);
  }, []);

  const formattedTime = formatTime(hour, minute);

  const { isClockIn, setIsClockIn } = useContext(ClockInContext);

  const handleClockInOut = async () => {
    setIsClockIn((prevIsClockIn) => {
      const newIsClockIn = !prevIsClockIn;
      AsyncStorage.setItem("@clock_in_status", JSON.stringify(newIsClockIn));
      return newIsClockIn;
    });

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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get(baseURL, config);
        setData(res.data);
      } catch (error) {
        console.log("error home", error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (!token) {
          navigate.navigate("Login");
        }
        if (data.time_in && data.time_out) {
          scheduleNotification(data.time_in, data.time_out);
        } else {
          return;
        }
        if (token) {
          requestNotificationPermission();
          getPermission();
        }
      } catch (e) {
        setError(e);
        console.error("error home checkToken", e);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const fetchClockInStatus = async () => {
      try {
        const savedStatus = await AsyncStorage.getItem("@clock_in_status");
        if (savedStatus !== null) {
          setIsClockIn(JSON.parse(savedStatus));
        }
      } catch (e) {
        console.error("Failed to fetch clock in status", e);
      }
    };

    fetchClockInStatus();
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

  return (
    <ScrollView className="flex-1 bg-white px-3">
      
      <HomeDate dayName={dayName} formattedDate={formattedDate} name={data.name} src={data.avatar} />
      {error && <Text>{error}</Text>}
      <View className=" bg-quinary rounded-xl py-10 px-3 w-full h-auto items-center">
        <View className="items-center">
          <AnalogClock
            size={200}
            key={key}
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
          <Text className="text-gray-400 mt-5 font-normals text-l">
            Schedule: {data.time_in} - {data.time_out}
          </Text>
          <Text className="text-gray-300 font-semibold text-6xl mt-4">
            {formattedTime}
          </Text>
          <TouchableOpacity
            className={`mt-6 px-[50px] py-4  ${
              isClockIn ? "bg-red-500" : "bg-primary "
            } rounded-full`}
            onPress={handleClockInOut}
          >
            <Text className="text-white font-bold">
              {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
            </Text>
          </TouchableOpacity>
          
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
