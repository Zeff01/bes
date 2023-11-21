import React from "react";
import { View } from "react-native";

// ui
import PersonalInfoCard from "../../ui/PersonalInfoCard";

// utils
import formatDate from "../../../utils/formatDate";
import SignOut from "./SignOut";

const PersonalInfos = ({ themeIs, data }) => {
    // 2022-02-01T00:00:01-04:00
  const formattedBirthDate = formatDate("2022-02-01T00:00:01-04:00");

  return (
    <View className="flex-1 px-12">
      <PersonalInfoCard
        themeIs={themeIs}
        iconName={"mail"}
        content={data.email}
      />
      <PersonalInfoCard
        themeIs={themeIs}
        iconName={"call"}
        content={data.phone}
      />
      <PersonalInfoCard
        themeIs={themeIs}
        iconName={"calendar"}
        content={formattedBirthDate}
      />
      <SignOut />
    </View>
  );
};

export default PersonalInfos;
