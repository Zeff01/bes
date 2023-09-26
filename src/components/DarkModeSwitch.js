import React, { useState } from "react";
import { StatusBar, Switch } from "react-native";
import { useColorScheme } from "nativewind";

const DarkModeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <Switch
        trackColor={{ false: "#2B6673", true: "#11292e" }}
        thumbColor="#E5E4E2"
        className="border-5 border-red-500"
        value={colorScheme === "dark"}
        onValueChange={toggleColorScheme}
      />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
};

export default DarkModeSwitch;
