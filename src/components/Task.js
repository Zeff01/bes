import { ListItem } from "@react-native-material/core";

export default function Task({ task }) {
  return <ListItem  title="Task" secondaryText="Description....">{task}</ListItem>;
}
