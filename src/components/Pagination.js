import { A } from "@expo/html-elements";
import { View, Button } from "react-native";

export default function Pagination({ postPerPage, totalPost, paginate }) {
  const pageNumber = [];
  for (let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <View className="my-10">
      {pageNumber.map((number) => (
        <Button
          onPress={() => paginate(number)}
          key={number}
          className="text-black"
        >
          <A>{number}</A>;
        </Button>
      ))}
    </View>
  );
}
