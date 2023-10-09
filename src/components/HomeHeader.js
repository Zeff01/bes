import { useContext } from "react";
import { View, Text, Image } from "react-native";
import ThemeContext from "../store/darkMode/theme-context";

export default function HomeHeader({ name, src }) {
  const { themeIs } = useContext(ThemeContext);
  const newDate = new Date();
  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][newDate.getDay()];

  const formattedDate = newDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View
      className={`${
        themeIs === "light" ? "bg-white" : "bg-darkTertiary"
      } w-full py-5 px-4 rounded-[40px] mb-3`}
    >
      <View className="w-full mb-2 flex-row justify-between items-center">
        <View className="flex gap-2">
          <Text
            className={`${
              themeIs === "light" ? "text-black" : "text-whiteColor"
            } text-lg font-light`}
          >
            Good Day, {name}
          </Text>
          <Text
            className={`${
              themeIs === "light" ? "text-primaryColor" : "text-darkSenary"
            } text-5xl font-black`}
          >
            {dayName}
          </Text>
          <Text
            className={`${
              themeIs === "light" ? "text-black" : "text-whiteColor"
            } text-lg font-light`}
          >
            {formattedDate}
          </Text>
        </View>

        <View>
          <Image
            src={`https://bes.outposter.com.au/images/avatars/${src}`}
            className={"w-[100px] h-[100px] rounded-full"}
          />
        </View>
      </View>
    </View>
  );
}
