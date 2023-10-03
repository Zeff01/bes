import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogTime from "../components/TimelogTime";
import TimelogItem from "../components/TimelogItem";

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
        <ScrollView className="bg-quinaryColor">
          <View className="bg-primaryColor h-[150] rounded-bl-[40]"></View>
          <View className="mx-4 -mt-24 space-y-4 z-10">
          <Text className="text-lg font-light tracking-widest text-white uppercase text-center">Summary</Text>
            <TimelogTime
              total_ot_hrs={data.total_ot_hrs}
              total_hrs={data.total_hrs}
              total_late_hrs={data.total_late_hrs}
            />
          </View>
          <View className="bg-white py-4 rounded-tr-[40] mt-10">
          <Text className="text-lg font-light tracking-widest text-[#0B646B] p-4 uppercase text-center">Time Logs</Text>
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
