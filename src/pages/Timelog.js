import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Timelog = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@auth_token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get("https://bes.outposter.com.au/api/timelogs", config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error message:", error.message);
          console.log("Error config:", error.config);
        });
    };

    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1  bg-white p-2">
      <View className="w-full">
        <View>
          <View className="flex-row">
            <Text>Registered:</Text>
            <Text>2023-06-13 15:13:20</Text>
          </View>
          <View className="flex-row">
            <Text>Latest Activity:</Text>
            <Text>2023-07-27 13:32:06</Text>
          </View>
          <View className="flex-row">
            <Text>Verified:</Text>
            <Text>Yes</Text>
          </View>
          <View className="flex-row">
            <Text>Role:</Text>
            <Text>Front End Developer</Text>
          </View>
          <View className="flex-row">
            <Text>Status:</Text>
            <Text>active</Text>
          </View>
        </View>
      </View>
      <View className="gap-2 w-full  flex-1 my-8">
        <View className="p-8 border rounded text-center">
          <Icon name="timer-outline" size={30} color="#000" />
          <Text>Total Late in Hrs.</Text>
          <Text>1.43</Text>
        </View>
        <View className="p-8 border rounded text-center">
          <Icon name="alarm-outline" size={30} color="#000" />
          <Text>Total Overtime in Hrs.</Text>
          <Text>56.95</Text>
        </View>

        <View className="p-8 border rounded text-center">
          <Icon name="star-outline" size={30} color="#000" />
          <Text>Total Rendered Time in Hr(s).</Text>
          <Text>0.02</Text>
        </View>
        <View className=" p-8 border rounded text-center">
          <Icon name="time-outline" size={30} color="#000" />
          <Text>Time Schedule</Text>
          <Text>12:00 PM - 4:00 AM</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Timelog;
