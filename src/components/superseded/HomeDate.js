import { View } from "react-native";
import HomeHeader from "../components/HomeHeader";

export default function HomeDate({ name, src }) {
  return (
    <View className="bg-white w-full py-5 px-4 rounded-xl mb-3 dark:bg-primary">
      <HomeHeader name={name} src={src} />
    </View>
  );
}
