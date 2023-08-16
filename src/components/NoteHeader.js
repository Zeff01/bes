import { View, Text, TouchableOpacity } from "react-native";

export default function NoteHeader({ headerTitle }) {
  return (
    <View className="flex-row justify-between items-center mb-3 border-b  pb-5">
      <Text className="text-black font-bold text-2xl">{headerTitle}</Text>
      <TouchableOpacity>
        <Text className="border  py-2 px-2 rounded-lg">Create Notes</Text>
      </TouchableOpacity>
    </View>
  );
}
