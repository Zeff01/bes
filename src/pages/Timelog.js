import React, { useEffect, useState } from "react";
import { View, Text,  TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogHeader from "../components/TimelogHeader";
import TimelogInfoBox from "../components/TimelogInfoBox";
import TimelogTime from "../components/TimelogTime";
import TimelogItemDetails from "../components/TimelogItemDetails";
import { Avatar } from "@react-native-material/core";
import TimelogItem from "../components/TimelogItem";


// const TimelogItem = ({ item }) => {
//   const [data, setData] = useState([])
  

//   useEffect(()=> {
//     const baseURL = "http://bes.outposter.com.au/api/auth/user";
//     const fetchData = async () => {
//       const token = await AsyncStorage.getItem("@auth_token");
//       const config = {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         };
//       const res = await axios.get(baseURL, config)
//       setData(res.data)
//     }
//     fetchData()
//   },[])

//   return (
//     <View className="flex px-2 border-2 mb-2 rounded-md border-[#0B646B] py-2">
//       <View className=" justify-between my-2">
//         <View className="flex-row gap-5 items-center ">
//           <TouchableOpacity>
//             <Text className="text-lg font-bold">{data.name}</Text>
//           </TouchableOpacity>
//         </View>
//         <View className=" flex border-t-[1px] pt-2 mt-2 mx-2">
//           <TimelogItemDetails label="Item ID:" value={item.id} />
//           <TimelogItemDetails label="Note:" value={item.note} />
//           <TimelogItemDetails label="User ID:" value={item.user_id} />
//           <TimelogItemDetails
//             label="Date:"
//             value={new Date(item.created_at).toLocaleDateString()}
//           />
//           <TimelogItemDetails
//             label="Clockin:"
//             value={new Date(item.started_at).toLocaleTimeString()}
//           />
//           <TimelogItemDetails
//             label="Clockout:"
//             value={new Date(item.stopped_at).toLocaleTimeString()}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

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


  const renderHeader = () => (
    <View className="">
      <TimelogHeader />
      <TimelogInfoBox />
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
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default Timelog;
