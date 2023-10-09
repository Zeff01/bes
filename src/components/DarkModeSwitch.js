import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Text, Switch } from "react-native";
import ThemeContext from "../store/darkMode/theme-context";

const DarkModeSwitch = () => {
  const { themeIs, setToggleTheme } = useContext(ThemeContext);
  // console.log(theme);

  return (
    <>
      <Switch
        trackColor={{ false: "#2B6673", true: "#11292e" }}
        thumbColor="#E5E4E2"
        className="border-5 absolute top-3 right-2"
        value={themeIs === "dark"}
        onChange={() => setToggleTheme(themeIs === "dark" ? "light" : "dark")}
      />
      <StatusBar style={themeIs === "dark" ? "light" : "dark"} />
    </>
  );
};

export default DarkModeSwitch;
