import React, { useContext } from "react";
import { View } from "react-native";
import { BASE_URL, GET_USER } from "@env";

// context
import ThemeContext from "../../../store/darkMode/theme-context";

// component
import TImelogCard from "./TImelogCard";

// api
import getData from "../../api/getData";

const TimelogTime = ({ total_hrs, total_late_hrs, total_ot_hrs }) => {
  const { themeIs } = useContext(ThemeContext);

  const { data, isLoading, error } = getData(`${BASE_URL}${GET_USER}`);

  const formattedTimeIn = String(data.time_in).slice(0, 5);
  const formattedTimeOut = String(data.time_out).slice(0, 5);

  return (
    <View className="flex gap-2 w-full mt-2 mb-3">
      <View className="flex-row w-full justify-center">
        <TImelogCard
          themeIs={themeIs}
          icon={"timer"}
          number={total_late_hrs?.toFixed(1)}
          description={"Late(Hr/s)"}
        />
        <TImelogCard
          themeIs={themeIs}
          icon={"alarm"}
          number={total_ot_hrs?.toFixed(1)}
          description={"Overtime(Hr/s)"}
        />
      </View>
      <View className="flex-row w-full justify-center">
        <TImelogCard
          themeIs={themeIs}
          icon={"star"}
          number={total_hrs?.toFixed(1)}
          description={"Rendered Time(Hr/s)"}
        />
        <TImelogCard
          themeIs={themeIs}
          icon={"time"}
          number={
            data.time_in && data.time_out
              ? `${formattedTimeIn} - ${formattedTimeOut}`
              : "00:00 - 00:00"
          }
          description={"Rendered Time(Hr/s)"}
        />
      </View>
    </View>
  );
};

export default TimelogTime;
