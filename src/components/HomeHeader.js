import { View, Text, Image } from "react-native";

export default function HomeHeader({ name, src }) {
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
    <View className="bg-white w-full py-5 px-4  rounded-xl mb-3 dark:bg-primary">
      <View className="w-full mb-2 flex-row justify-between items-center">
        <View className="flex gap-2">
          <Text className="text-md font-light dark:text-quinary">
            Good PM, {name}
          </Text>
          <Text className="text-4xl font-black text-primaryColor dark:text-quinary">
            {dayName}
          </Text>
          <Text className="text-lg font-light text-black dark:text-quinary">
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
