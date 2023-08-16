import { View, Text, Image } from "react-native";
import { Avatar } from "@react-native-material/core";

export default function HomeHeader({ dayName, formattedDate }) {
  return (
    <>
      <View className="w-full mb-2 flex-row justify-between items-center">
        <View>
          <Image
            source={require("../../assets/outposter_logo.png")}
            className="w-[250px] h-[50px] justify-end"
          />
          <Text className="text-lg font-bold">Good PM, Jzeff Zomers</Text>
        </View>

        <Avatar
          image={require("../../assets/profile.jpg")}
          className="w-[70px] h-[70px] rounded-full"
        />
      </View>
    </>
  );
}
