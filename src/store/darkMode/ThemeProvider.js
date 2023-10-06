import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "./theme-context";

const ThemeProvider = (props) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    // set theme to system selected theme
    if (colorScheme) {
      setTheme(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme) => {
    // console.log(newTheme);
    setTheme(newTheme);
    // Save selected theme to storage
    AsyncStorage.setItem("theme", newTheme);
  };

  const themeContext = {
    themeIs: theme,
    setToggleTheme: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
