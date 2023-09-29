import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import HomeHeader from "../components/HomeHeader";
import TaskCard from "../components/TaskCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAnalogClock from "../components/CustomAnalogClock";
import { formatTime } from "../utils/formatTime";

// checktokken util func
import { checkToken } from "../utils/Home/checkToken";
import { getToken } from "../utils/getToken";

// custom hooks
import useAxios from "../hooks/use-axios";
import useTimer from "../hooks/use-timer";

const BASE_URL = "https://bes.outposter.com.au/api";

const Home = () => {
  const [data, setData] = useState([]);
  const [isClockIn, setIsClockIn] = useState(false);

  // - custom hooks -
  // useTimer hook
  const { second, minute, hour } = useTimer();
  // useAxios hook
  const { isLoading, error, sendRequest } = useAxios();
  // useToken

  const formattedTime = formatTime(hour, minute);
  const key = `${hour}:${minute}:${second}`;

  // clock in/out handler
  const handleClockInOut = async () => {
    const token = await getToken();
    console.log("TOKEN IN HandleClockInOut:", token);

    setIsClockIn(!isClockIn);
    AsyncStorage.setItem("@clock_in_status", JSON.stringify(!isClockIn));

    const processData = (objData) => {
      // this is the data when clicking the handler
      console.log("OBJECT DATA FROM CLOCK-IN/OUT HANDLER: ", objData);
    };

    sendRequest(
      {
        url: `${BASE_URL}/clock`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      processData
    );
  };

  // fetching ClockIn/Out status
  const fetchClockInStatus = async () => {
    try {
      // getting the AsyncStorage status
      const savedStatus = await AsyncStorage.getItem("@clock_in_status");
      // if the status is not null or has a value then set the ClockIn state to that value.
      if (savedStatus !== null) {
        setIsClockIn(JSON.parse(savedStatus));
      }
    } catch (err) {
      console.log("Failed to fetch clock in status: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      // console.log("TOKEN IN fetchData:", token);

      try {
        const processData = (objData) => {
          if (objData) {
            setData(objData);
            // console.log("data already set: ", objData);
          }
        };

        // "GET"
        sendRequest(
          {
            url: `${BASE_URL}/auth/user`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
          processData
        );
      } catch (error) {
        console.log("Error in Fetching the data: ", error);
      }
    };

    checkToken();
    fetchClockInStatus();
    fetchData();
  }, [sendRequest]);

  return (
    <ScrollView className="flex-1 bg-white px-3 pt-12">
      <HomeHeader name={data && data.name} src={data && data.avatar} />
      {error && <Text>{error}</Text>}
      <View className="bg-quinary rounded-xl py-10 px-3 w-full h-auto items-center">
        <View className="items-center">
          <CustomAnalogClock
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
          <Text className="text-gray-400 mt-5 font-normals text-l dark:text-quinary">
            Schedule: {data && data.time_in} - {data && data.time_out}
          </Text>
          <Text className="text-gray-300 font-bold text-6xl mt-4 dark:text-quinary">
            {formattedTime}
          </Text>
          <TouchableOpacity
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
            className={`mt-6 w-[180px] py-4 ${
              isClockIn ? "bg-red-500" : "bg-primaryColor"
            } rounded-full`}
            onPress={handleClockInOut}
          >
            <Text className="text-white font-bold dark:text-quinary text-center">
              {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TaskCard />
      </View>
    </ScrollView>
  );
};
export default Home;
