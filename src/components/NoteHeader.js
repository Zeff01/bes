import { View, Text } from "react-native";
import { Button } from "@react-native-material/core";

export default function NoteHeader({ headerTitle }) {
  return (
    <View className="flex-row justify-between items-center mb-3 border-b  pb-5">
      <Text className="text-black font-bold text-xl">{headerTitle}</Text>
      <Button title="Create Notes" color="#5B5B5B" tintColor="white" />
    </View>
  );
}
