import { View, Text } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NoteCard({ title }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-black font-normal text-lg">{title}</Text>
      <View className="flex-row">
        <IconButton icon={<AntDesign name="edit" size={20} color="black" />} />
        <IconButton
          icon={<MaterialCommunityIcons name="delete" size={20} color="red" />}
        />
      </View>
    </View>
  );
}
