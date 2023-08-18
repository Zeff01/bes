import React, { useState, useEffect, createContext, useContext } from "react";
import { View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnalogClockCard from "../components/AnalogClockCard";
import NoteCard from "../components/NoteCard";
import NoteHeader from "../components/NoteHeader";
import HomeHeader from "../components/HomeHeader";
import HomeDate from "../components/HomeDate";

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
  return { second, minute, hour };
};

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

const renderClockCard = (
  key,
  hour,
  minute,
  second,
  handleClockInOut,
  isClockIn
) => (
  <AnalogClockCard
    key={key}
    hour={hour}
    minute={minute}
    second={second}
    handleClockInOut={handleClockInOut}
    isClockIn={isClockIn}
  />
);

const renderNoteCard = (title) => (
  <View className=" bg-[#F7E594] mt-3 rounded-xl py-5 px-3 flex-1">
    <NoteHeader headerTitle="Notes" />
    <NoteCard title={title} />
  </View>
);

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
    <View className="flex-1   bg-white px-3">
      <HomeHeader name="Jzeff Somers" />
      <HomeDate dayName={dayName} formattedDate={formattedDate} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        data={[{ type: "clock" }, ...data]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          item.type === "clock"
            ? renderClockCard(
                key,
                hour,
                minute,
                second,
                handleClockInOut,
                isClockIn
              )
            : renderNoteCard(item.title)
        }
      />
    </View>
  );
};

export default () => (
  <ClockInProvider>
    <Home />
  </ClockInProvider>
);
