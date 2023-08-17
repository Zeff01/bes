import React, { useState, useEffect, createContext, useContext } from "react";
import { View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnalogClockCard from "../components/AnalogClockCard";
import NoteCard from "../components/NoteCard";
import NoteHeader from "../components/NoteHeader";
import HomeHeader from "../components/HomeHeader";
import HomeDate from "../components/HomeDate";
import { ScrollView } from "react-native";

const data = [
  {
    title: "Note 1",
  },
  {
    title: "Note 2",
  },
  {
    title: "Note 3",
  },
  {
    title: "Note 4",
  },
  {
    title: "Note 5",
  },
  {
    title: "Note 6",
  },
];

const nowDate = () => {
  const d = new Date();
  let second = d.getSeconds();
  let minute = d.getMinutes();
  let hour = d.getHours();
  // console.log(hour, second, minute);
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
          // console.log("Token already exists in AsyncStorage", token);
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkToken();
  }, []);

  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const dayIndex = today.getDay();
  const dayName = daysOfWeek[dayIndex];

  // #0B646B

  return (
    <View className="flex-1   bg-white px-3">
      <View className="w-full flex justify-between items-center">
        <HomeHeader />
        <HomeDate dayName={dayName} formattedDate={formattedDate} />
      </View>
      <AnalogClockCard
        key={key}
        hour={hour}
        minute={minute}
        second={second}
        handleClockInOut={handleClockInOut}
        isClockIn={isClockIn}
      />

      <View className=" bg-[#F7E594] mt-3 rounded-xl py-5 px-3 flex-1">
        <NoteHeader headerTitle="Notes" />
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ScrollView className="mb-3">
              <NoteCard title={item.title} />
            </ScrollView>
          )}
        />
      </View>
    </View>
  );
};

export default () => (
  <ClockInProvider>
    <Home />
  </ClockInProvider>
);
