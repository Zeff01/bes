
import { Text } from "react-native";

export default function Task({ task }) {
  return <Text  className="text-xl font-semibold border-b-[1px] pb-2 mt-3 text-[#0B646B] border-[#0B646B]">{task}</Text>;
}
