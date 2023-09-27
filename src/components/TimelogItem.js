import axios from "axios";
import { Text, View, TouchableOpacity } from "react-native";
import TimelogItemDetails from "./TimelogItemDetails";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

const TimelogItem = ({
  id,
  note,
  user_id,
  created_at,
  started_at,
  stopped_at,
}) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const baseURL = "http://bes.outposter.com.au/api/auth/user";
  //   const fetchData = async () => {
  //     const token = await AsyncStorage.getItem("@auth_token");
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const res = await axios.get(baseURL, config);
  //     setData(res.data);
  //   };
  //   fetchData();
  // }, []);

  const formattedDate = format(new Date(created_at), "MMMM d, yyyy");
  const startedAt = format(new Date(started_at), "h:mm a");
  const stoppedAt = format(new Date(stopped_at), "h:mm a");

  return (
    <View className="rounded-lg flex px-3 mx-8 mb-4 py-2 border-quinaryColor border">
      <View className=" justify-between my-2">
        <View className="flex-row gap-5 items-center ">
          <TouchableOpacity>
            <Text className="text-lg font-bold">{data.name}Jerone</Text>
          </TouchableOpacity>
        </View>
        <View className="flex gap-5 border-t-[1px] border-quinaryColor pt-2 mt-2 mx-2">
          {/* <TimelogItemDetails label="Item ID:" value={id} /> */}
          <TimelogItemDetails icon="clipboard" label="Note:" value={note} />
          {/* <TimelogItemDetails label="User ID:" value={user_id} /> */}
          <TimelogItemDetails icon="calendar" label="Date:" value={formattedDate} />
          <TimelogItemDetails icon="enter" label="Clockin:" value={startedAt} />
          <TimelogItemDetails icon="exit" label="Clockout:" value={stoppedAt} />
        </View>
      </View>
    </View>
  );
};

export default TimelogItem;
