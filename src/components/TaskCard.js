import { View, Text, ScrollView } from "react-native";
import Task from "./Task";

export default function TaskCard() {
  return (
    <View className="bg-[#0B646B]  rounded-xl py-5 px-3 w-full h-[265px]">
      <Text className="text-white font-bold text-xl">My Tasks</Text>
      <ScrollView className="mt-2">
        <Task task="Task 1" />
        <Task task="Task 2" />
        <Task task="Task 3" />
        <Task task="Task 4" />
      </ScrollView>
    </View>
  );
}
