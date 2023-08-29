import axios from "axios";
import { Text, View, TouchableOpacity } from "react-native";
import TimelogItemDetails from "./TimelogItemDetails";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimelogItem = ({ item }) => {
    const [data, setData] = useState([])
    
  
    useEffect(()=> {
      const baseURL = "http://bes.outposter.com.au/api/auth/user";
      const fetchData = async () => {
        const token = await AsyncStorage.getItem("@auth_token");
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
        const res = await axios.get(baseURL, config)
        setData(res.data)
      }
      fetchData()
    },[])
  
    return (
      <View className="flex px-2 border-2 mb-2 rounded-md border-[#0B646B] py-2">
        <View className=" justify-between my-2">
          <View className="flex-row gap-5 items-center ">
            <TouchableOpacity>
              <Text className="text-lg font-bold">{data.name}</Text>
            </TouchableOpacity>
          </View>
          <View className=" flex border-t-[1px] pt-2 mt-2 mx-2">
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

  export default TimelogItem