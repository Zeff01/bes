import { View } from "react-native";
import { BASE_URL, GET_USER } from "@env";

// components
import Avatar from "./DataInfos/Avatar";
import Info from "./DataInfos/Info";
import PersonalInfos from "./DataInfos/PersonalInfos";

// api
// import getData from "../api/getData";

import { useDataContext } from "../../store/dataContext/DataContext";

const ProfileInformation = ({ themeIs }) => {
  // const { data, isLoading, error } = getData(`${BASE_URL}${GET_USER}`);

  const { userData: data } = useDataContext();

  return (
    <View
      className={`flex-[0.80] ${
        themeIs === "light"
          ? "bg-quinaryColor"
          : "bg-darkTertiary border border-darkSenary"
      } rounded-t-[50] items-center`}
    >
      <Avatar data={data} themeIs={themeIs} />
      <Info data={data} themeIs={themeIs} />
      <PersonalInfos data={data} themeIs={themeIs} />
    </View>
  );
};

export default ProfileInformation;
