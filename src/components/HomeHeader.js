import { View, Text, Image } from "react-native";

export default function HomeHeader({ name, src, dayName, formattedDate }) {
  return (
    <>
      <View className="w-full mb-2 flex-row justify-between items-center">
        <View className='flex gap-2'>
          {/* <Image
            source={require("../../assets/outposter_logo.png")}
            className="w-[250px] h-[50px] justify-end"
          /> */}
          <Text className="text-md font-light">Good morning, {name}</Text>
          <Text className="text-4xl font-black text-primaryColor uppercase">{dayName}</Text>
          <Text className="text-md font-light">{formattedDate}</Text>
        </View>

        <View>
          <Image
            src={`https://bes.outposter.com.au/images/avatars/${src}`}
            className={"w-[100px] h-[100px] rounded-full"}
          />
        </View>

      </View>
    </>
  );
}
