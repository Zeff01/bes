import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogHeader from "../components/TimelogHeader";
import TimelogInfoBox from "../components/TimelogInfoBox";
import TimelogTime from "../components/TimelogTime";
import TimelogItemDetails from "../components/TimelogItemDetails";
import { Avatar } from "@react-native-material/core";
import TimelogItem from "../components/TimelogItem";

const Timelog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const baseURL = "http://bes.outposter.com.au/api/timelogs";
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
  }, []);

  const flatData = data.data ? data.data.flat() : [];

  // <FlatList
  //       className="px-3"
  //       data={flatData}
  //       renderItem={({ item }) => <TimelogItem item={item} />}
  //       keyExtractor={(item) => item.id}
  //       ListHeaderComponent={renderHeader}
  //       onEndReachedThreshold={0.5}
  //     />

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="px-4">
        <TimelogHeader />
        <TimelogInfoBox />
        <TimelogTime
          total_ot_hrs={data.total_ot_hrs}
          total_hrs={data.total_hrs}
          total_late_hrs={data.total_late_hrs}
        />
        <Text className="font-bold text-3xl mb-3 text-[#0B646B]">
          Time Logs
        </Text>
      </View>

      {flatData.map((item, ind) => {
        console.log(item.started_at);
        return (
          <View key={ind}>
            <TimelogItem
              id={item.id}
              note={item.note}
              user_id={item.user_id}
              created_at={item.created_at}
              stopped_at={item.stopped_at}
              started_at={item.started_at}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default Timelog;
