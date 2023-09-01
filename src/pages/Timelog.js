import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogHeader from "../components/TimelogHeader";
import TimelogInfoBox from "../components/TimelogInfoBox";
import TimelogTime from "../components/TimelogTime";
import TimelogItem from "../components/TimelogItem";
import SocialMedia from "../components/SocialMedia";

const Timelog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseURL = "http://bes.outposter.com.au/api/timelogs";
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("@auth_token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(baseURL, config);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timelogs:", error);
      }
    };
    fetchData();
  }, []);

  const flatData = data.data ? data.data.flat() : [];

  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView className=" bg-white ">
          <View className="mx-4">
            <TimelogHeader />
            <TimelogInfoBox />
            <SocialMedia />
            <TimelogTime
              total_ot_hrs={data.total_ot_hrs}
              total_hrs={data.total_hrs}
              total_late_hrs={data.total_late_hrs}
            />
            <Text className="font-bold text-3xl mb-3 text-[#0B646B]">
              Time Logs
            </Text>
          </View>
          <View className="mb-5">
            {flatData
              .slice()
              .sort((itemA, itemB) => {
                const timeA = new Date(itemA.started_at).getTime();
                const timeB = new Date(itemB.started_at).getTime();
                return timeB - timeA;
              })
              .map((item, index) => {
                return (
                  <View key={index}>
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
          </View>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default Timelog;
