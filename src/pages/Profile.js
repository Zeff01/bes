import React, { useContext} from "react";
import {SafeAreaView } from "react-native";

// context
import ThemeContext from "../store/darkMode/theme-context";

// components
import DarkModeSwitch from "../components/profile/darkMode/DarkModeSwitch";
import BackgroundColor from "../components/profile/DataInfos/BackgroundColor";
import ProfileInformation from "../components/profile/ProfileInformation";

export default function Profile() {
  const { themeIs } = useContext(ThemeContext);

  return (
    <SafeAreaView
      className={`flex-1 ${
        themeIs === "light" ? "bg-tertiaryColor" : "bg-darkPrimary"
      } justify-end relative`}
    >
      <BackgroundColor themeIs={themeIs} />
      <DarkModeSwitch />
      <ProfileInformation themeIs={themeIs} />
    </SafeAreaView>
  );
}
