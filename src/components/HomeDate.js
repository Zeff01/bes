import { View, Text } from "react-native";
import HomeHeader from "../components/HomeHeader";

export default function HomeDate({ dayName, formattedDate, name, src }) {
  return (
    <View className="bg-white w-full py-5 px-4  rounded-xl mb-3">
      <HomeHeader name={name} src={src} dayName={dayName} formattedDate={formattedDate}/>
    </View>
  );
}
