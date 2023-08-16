import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogHeader from "../components/TimelogHeader";
import TimelogInfoBox from "../components/TimelogInfoBox";
import TimelogTime from "../components/TimelogTime";
import TimelogItemDetails from "../components/TimelogItemDetails";
import { Avatar } from "@react-native-material/core";

const TimelogItem = ({ item }) => {
  return (
    <View className="flex px-2 border-2 mb-2 rounded-md border-[#0B646B] py-2">
      <View className=" justify-between my-2 ">
        <View className="flex-row gap-5 items-center ">
          <Avatar
            image={require("../../assets/profile.jpg")}
            className="w-[50px] h-[40px] rounded-full"
          />
          <TouchableOpacity>
            <Text className="text-lg font-bold">{item.user_id}</Text>
          </TouchableOpacity>
        </View>
        <View className=" flex border-t-[1px] pt-2 mt-2">
          <TimelogItemDetails label="Item ID:" value={item.id} />
          <TimelogItemDetails label="Note:" value={item.note} />
          <TimelogItemDetails label="User ID:" value={item.user_id} />
          <TimelogItemDetails
            label="Date:"
            value={new Date(item.created_at).toLocaleDateString()}
          />
          <TimelogItemDetails
            label="Clockin:"
            value={new Date(item.started_at).toLocaleTimeString()}
          />
          <TimelogItemDetails
            label="Clockout:"
            value={new Date(item.stopped_at).toLocaleTimeString()}
          />
        </View>
      </View>
    </View>
  );
};

const Timelog = () => {
  const [data, setData] = useState([]);

  const baseURL = "http://bes.outposter.com.au/api/timelogs";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(baseURL, config);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching timelogs:", error);
      }
    };

    fetchData();
  }, [baseURL]);

  const flatData = data.data ? data.data.flat() : [];

  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  const renderHeader = () => (
    <View className="">
      <TimelogHeader />
      <TimelogInfoBox formattedDate={formattedDate} />
      <TimelogTime
        total_ot_hrs={data.total_ot_hrs}
        total_hrs={data.total_hrs}
        total_late_hrs={data.total_late_hrs}
      />
      <Text className="font-bold text-3xl mb-3 text-[#0B646B]">Time Logs</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white ">
      <FlatList
        className="px-3"
        data={flatData}
        renderItem={({ item }) => <TimelogItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default Timelog;
