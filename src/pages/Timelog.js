import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Timelog = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://bes.outposter.com.au/api/timelogs", config)
        .then((response) => {
          const responseData = JSON.stringify(response.data);
          console.log(data);
          setData(responseData);
        })
        .catch((error) => {
          console.log("Error message:", error.message);
          console.log("Error config:", error.config);
        });
    };

    fetchData();
  }, []);

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  return (
    <>
      <ScrollView className="flex-1  bg-white p-2">
        <View className="flex-row justify-between">
          <View>
            <Image
              source={require("../../assets/outposter_logo.png")}
              className="w-[250px] h-[50px]"
            />
            <Text className="font-bold text-2xl leading-[23px] mb-2">
              client information
            </Text>
          </View>
          <Image
            source={require("../../assets/profile.jpg")}
            className="w-[70px] h-[70px] rounded-full"
          />
        </View>
        <View className="w-full  rounded-lg  py-3 bg-[#0B646B] shadow">
          <View className="px-4 flex space-y-1 ">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-3xl font-bold leading-[30px] pt-2 text-white">
                  Jzeff Somers
                </Text>
                <Text className="leading-[14px] text-md text-white ">
                  Front End Developer
                </Text>
              </View>
              <View>
                <Text className="text-white text-lg bg-[#137c84] font-bold px-2 py-1 rounded-full">
                  {formattedDate}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold text-xl text-white">
                Registered:
              </Text>
              <Text className="text-white text-[15px]">
                2023-06-13 15:13:20
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold text-xl text-white">
                Latest Activity:
              </Text>
              <Text className="text-white text-[15px]">
                2023-07-27 13:32:06
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold text-xl text-white">
                Verified:
              </Text>
              <Text className="text-white text-[15px]">Yes</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Text className="font-semibold text-xl text-white">User Id:</Text>
              <Text className="text-white text-[15px]">56</Text>
            </View>
            <View className="flex-row items-center gap-2 ">
              <Text className="font-semibold text-xl text-white">Status:</Text>
              <Text className="text-white text-[15px]">Active</Text>
            </View>
          </View>
        </View>

        <View className="gap-2 w-full my-2 ">
          <View className="flex-row space-x-3 mb-1  justify-center w-full px-2">
            <View className="p-8 border-[#0B646B] border-2 rounded-lg  w-[50%] ">
              <Icon
                name="timer-outline"
                size={30}
                color="#000"
                className="mx-auto mb-2"
              />
              <Text className="text-center font-bold text-lg">Late(Hr/s).</Text>
              <Text className="text-center text-base">3 Hours</Text>
            </View>
            <View className="p-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
              <Icon
                name="alarm-outline"
                size={30}
                color="#000"
                className="mx-auto mb-2"
              />
              <Text className="text-center font-bold text-lg">
                Overtime(Hr/s).
              </Text>
              <Text className="text-center text-base">3 Hours</Text>
            </View>
          </View>
          <View className="flex-row space-x-3   justify-center w-full px-2">
            <View className="py-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
              <Icon
                name="star-outline"
                size={30}
                color="#000"
                className="mx-auto mb-2"
              />
              <Text className="text-center font-bold text-lg">
                Rendered Time(Hr/s).
              </Text>
              <Text className="text-center text-base">{totalHours} Hours</Text>
            </View>

            <View className=" py-8 border-[#0B646B] border-2 rounded-lg text-center w-[50%]">
              <Icon
                name="time-outline"
                size={30}
                color="#000"
                className="mx-auto mb-2"
              />
              <Text className="text-center font-bold text-lg">
                Time Schedule
              </Text>
              <Text className="text-center text-base">12:00 PM - 4:00 AM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Timelog;
