import { View, Text } from "react-native";
import HomeHeader from "../components/HomeHeader";

export default function HomeDate({ dayName, formattedDate, name, src }) {
  return (
    <View className="w-full p-6 pt-14 mb-3">
      <HomeHeader name={name} src={src} dayName={dayName} formattedDate={formattedDate}/>
    </View>
  );
}
