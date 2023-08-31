import { View, Text, ScrollView } from "react-native";
import Task from "./Task";

export default function TaskCard() {
  return (
    <View className=" rounded-xl py-2 w-full border-2 border-[#0B646B] px-5 mb-2">
      <Text className="text-[#0B646B] font-bold text-xl">My Tasks</Text>
      <ScrollView className="mt-2 ">
        <Task task="Task 1" />
        <Task task="Task 2" />
        <Task task="Task 3" />
        <Task task="Task 4" />
      </ScrollView>
    </View>
  );
}
