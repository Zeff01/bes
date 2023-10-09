import axios from "axios";
import { Text, View, TouchableOpacity } from "react-native";
import TimelogItemDetails from "./TimelogItemDetails";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import ThemeContext from "../store/darkMode/theme-context";

const TimelogItem = ({
  id,
  note,
  user_id,
  created_at,
  started_at,
  stopped_at,
}) => {
  const [data, setData] = useState([]);
  const { themeIs } = useContext(ThemeContext);

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
    <View
      className={`${
        themeIs === "light"
          ? "bg-white border-quinaryColor"
          : "bg-darkTertiary border-darkTertiary"
      } rounded-lg flex px-3 mx-5 mb-5 py-2 border`}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className=" justify-between my-4">
        <View className="flex-row gap-5 items-center">
          <TouchableOpacity>
            <Text
              className={`${
                themeIs === "light" ? "text-blackColor" : "text-darkSenary"
              } text-lg font-normal px-3`}
            >
              {data.name}Jerone Alimpia
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`${
            themeIs === "light" ? "border-quinaryColor" : "border-darkSecondary"
          } flex gap-5 border-t-[1px] pt-2 mt-2 mx-3`}
        >
          <TimelogItemDetails icon="clipboard" label="Note:" value={note} />
          <TimelogItemDetails
            icon="calendar"
            label="Date:"
            value={formattedDate}
          />
          <TimelogItemDetails icon="enter" label="Clockin:" value={startedAt} />
          <TimelogItemDetails icon="exit" label="Clockout:" value={stoppedAt} />
        </View>
      </View>
    </View>
  );
};

export default TimelogItem;
