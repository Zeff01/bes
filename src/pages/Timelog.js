import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Timelog = () => {
  const [data, setData] = useState([]);

  const baseURL = "http://bes.outposter.com.au/api/timelogs";

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
        const response = await axios.get(baseURL, config);
        const res = response.data;
        setData(res);
      } catch (error) {
        console.log("Error message:", error.message);
        console.log("Error config:", error.config);
      }
    };

    fetchData();
  }, [baseURL]);

  const total_hrs = data.total_hrs;
  const total_late_hrs = data.total_late_hrs;
  const total_ot_hrs = data.total_ot_hrs;

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
              <Text className="text-center text-base">
                {total_late_hrs.toFixed(1)}{" "}
                {total_late_hrs === 1 ? "Hour" : "Hours"}
              </Text>
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
              <Text className="text-center text-base">
                {total_ot_hrs.toFixed(1)}{" "}
                {total_ot_hrs === 1 ? "Hour" : "Hours"}
              </Text>
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
              <Text className="text-center text-base">
                {total_hrs.toFixed(1)} {total_hrs === 1 ? "Hour" : "Hours"}
              </Text>
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

        <View className="my-5">
          <Text className="font-bold text-3xl mb-3 text-[#0B646B]">
            Time Logs
          </Text>
          <FlatList
            data={data.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }, index) => (
              <View key={index}>
                {Object.keys(item).map((key, innerIndex) => {
                  const currentItem = item[key];
                  const id = currentItem.id;
                  const note = currentItem.note;
                  const userId = currentItem.user_id;
                  const startedAt = new Date(currentItem.started_at);
                  const stoppedAt = new Date(currentItem.stopped_at);
                  const options = {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  };
                  const startedAtFormatted = startedAt.toLocaleTimeString(
                    undefined,
                    options
                  );
                  const stoppedAtFormatted = stoppedAt.toLocaleTimeString(
                    undefined,
                    options
                  );
                  const createdAt = new Date(
                    currentItem.created_at
                  ).toLocaleDateString();

                  return (
                    <View
                      className="flex px-5 border-2 mb-2 rounded-md border-[#0B646B] py-2 "
                      key={key}
                    >
                      <View className="flex-row justify-between items-center my-2  ">
                        <View className="flex-row gap-5 items-center">
                          <Image
                            source={require("../../assets/profile.jpg")}
                            className="w-[50px] h-[40px]"
                          />
                          <TouchableOpacity>
                            <Text className="text-lg font-bold">{userId}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        key={innerIndex}
                        className="mb-4 flex border-t-[1px] pt-2 mt-2"
                      >
                        <View className="flex-row gap-2 items-center mb-1">
                          <Text className="text-lg font-bold">Item ID: </Text>
                          <Text>{id}</Text>
                        </View>
                        <View className="flex-row gap-2 items-center mb-1">
                          <Text className="text-lg font-bold">Note:</Text>
                          <Text>{note}</Text>
                        </View>
                        <View className="flex-row gap-2 items-center mb-1">
                          <Text className="text-lg font-bold">User ID:</Text>
                          <Text>{userId}</Text>
                        </View>
                        <View className="flex-row gap-2 items-center mb-1">
                          <Text className="text-lg font-bold">Date:</Text>
                          <Text>{createdAt}</Text>
                        </View>
                        <View className="flex-row gap-2 items-center mb-1">
                          <Text className="text-lg font-bold">Clockin:</Text>
                          <Text className=" text-green-500">
                            {startedAtFormatted}
                          </Text>
                        </View>
                        <View className="flex-row gap-2 items-center mb-1">
                          <Text className="text-lg font-bold">Clockout:</Text>
                          <Text className="text-md text-[#FF3838]">
                            {stoppedAtFormatted}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Timelog;
