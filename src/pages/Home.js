import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import HomeHeader from "../components/HomeHeader";
import TaskCard from "../components/TaskCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAnalogClock from "../components/CustomAnalogClock";
import { formatTime } from "../utils/formatTime";
import ThemeContext from "../store/darkMode/theme-context";
import checkToken from "../utils/checkToken";
import getToken from "../utils/getToken";
import useAxios from "../hooks/use-axios";
import useTimer from "../hooks/use-timer";
import ClockInOutBtn from "../components/home/clock/ClockInOutBtn";

import { GET_USER, GET_TIMELOG } from "@env";
import { useDataContext } from "../store/dataContext/DataContext";
import { setupNotification } from "../components/notification/setupNotification";

const BASE_URL = "https://bes.outposter.com.au/api";

const Home = () => {
  const { fetchData } = useDataContext();
  setupNotification();

  useEffect(() => {
    fetchData(GET_USER);
    fetchData(GET_TIMELOG);
  }, []);

  const { themeIs } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  // console.log(data);
  const [items, setItems] = useState([]);
  const [task, setTask] = React.useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isClockIn, setIsClockIn] = useState(false);
  const navigation = useNavigation();
  const { second, minute, hour } = useTimer();
  const { isLoading, error, sendRequest } = useAxios();
  const formattedTime = formatTime(hour, minute);
  const key = `${hour}:${minute}:${second}`;

  const fetchClockInStatus = async () => {
    try {
      const savedStatus = await AsyncStorage.getItem("@clock_in_status");
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

      try {
        const processData = (objData) => {
          if (objData) {
            setData(objData);
          }
        };

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

    checkToken(navigation);
    fetchClockInStatus();
    fetchData();
  }, [sendRequest]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("tasks");
        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setItems(parsedItems);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (newItem) => {
    try {
      if (task !== "") {
        setIsAddModalVisible(!isAddModalVisible);

        const currentItems = [newItem, ...items];
        setItems(currentItems);

        await AsyncStorage.setItem("tasks", JSON.stringify(currentItems));
      } else {
        alert("Field is required");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setItems(items);
      alert(error.message || "Error adding item");
    }
    setTask("");
  };

  const editItem = async (index, updatedItem) => {
    console.log(index, updatedItem);
    try {
      if (updatedItem.task !== "") {
        setIsEditModalVisible(!isEditModalVisible);
        const currentItems = [...items];
        currentItems[index] = updatedItem;
        setItems(currentItems);

        await AsyncStorage.setItem("tasks", JSON.stringify(currentItems));
      } else {
        alert("Field is required");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setItems(items);
      alert(error.message || "Error updating item");
    }
    setTask("");
  };

  const deleteItem = async (index) => {
    try {
      const currentItems = [...items];
      currentItems.splice(index, 1);
      setItems(currentItems);

      await AsyncStorage.setItem("tasks", JSON.stringify(currentItems));
    } catch (error) {
      console.error("Error deleting item:", error);
      setItems(items);
    }
  };

  return (
    <ScrollView
      className={`${
        themeIs === "light" ? "bg-white" : "bg-darkPrimary"
      } flex-1 pt-12`}
    >
      <HomeHeader name={data && data.name} src={data && data.avatar} />
      {error && <Text>{error}</Text>}
      <View
        className={`${
          themeIs === "light" ? "bg-transparent" : "bg-darkTertiary"
        } rounded-[40px] py-10 px-3 w-full h-auto items-center`}
      >
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
          <Text
            className={`${
              themeIs === "light" ? "text-gray-400" : "text-whiteColor"
            } mt-5 font-normal text-sm`}
          >
            Schedule: {data && data.time_in} - {data && data.time_out}
          </Text>
          <Text
            className={`${
              themeIs === "light" ? "text-gray-300" : "text-darkSenary"
            } font-bold text-6xl mt-4`}
          >
            {formattedTime}
          </Text>
          <ClockInOutBtn isClockIn={isClockIn} setIsClockIn={setIsClockIn} />
        </View>
      </View>
      <View>
        <TaskCard
          items={items}
          addItem={addItem}
          editItem={editItem}
          deleteItem={deleteItem}
          task={task}
          setTask={setTask}
          isAddModalVisible={isAddModalVisible}
          setIsAddModalVisible={setIsAddModalVisible}
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      </View>
    </ScrollView>
  );
};
export default Home;
