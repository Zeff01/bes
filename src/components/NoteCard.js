import { View, Text } from "react-native";

export default function NoteCard({ title }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-black font-normal text-lg">{title}</Text>
      <View className="flex-row gap-4">
        <Text className="border rounded-md px-3 py-1">Edit</Text>
        <Text className="border rounded-md px-3 py-1">Delete</Text>
      </View>
    </View>
  );
}
