import { useContext } from "react";
import { View } from "react-native";
import ThemeContext from "../../../store/darkMode/theme-context";

const BackgroundColor = () => {
  const { themeIs } = useContext(ThemeContext);

  return (
    <>
      {themeIs === "light" && (
        <>
          <View className="h-[700] w-[700] rounded-full bg-primaryColor absolute left-[-260] top-[-90]"></View>
          <View className="h-[690] w-[690] rounded-full bg-secondaryColor absolute left-[50] top-[0]"></View>
        </>
      )}
    </>
  );
};

export default BackgroundColor;
