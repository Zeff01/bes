import { View, Text, Image } from "react-native";

export default function HomeHeader({ name,src }) {
  return (
    <>
      <View className="w-full mb-2 flex-row justify-between items-center">
        <View>
          <Image
            source={require("../../assets/outposter_logo.png")}
            className="w-[250px] h-[50px] justify-end"
          />
          <Text className="text-lg font-bold">Good PM, {name}</Text>
        </View>

        <Image
          src={src}
          className="w-[70px] h-[70px] rounded-full"
        />
      </View>
    </>
  );
}
