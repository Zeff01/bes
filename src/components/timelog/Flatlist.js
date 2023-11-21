import React from "react";
import { FlatList } from "react-native";
import SummaryHeader from "./FlatListData/SummaryHeader";
import TimelogSummaryDetails from "./FlatListData/TimelogSummaryDetails";
import TimelogHeader from "./FlatListData/TimelogHeader";
import { View } from "react-native";
import TimelogItem from "../TimelogItem";

const Flatlist = ({ data, themeIs, flatListRef, flatData, currentPage }) => {
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = flatData.slice().sort((itemA, itemB) => {
    const timeA = new Date(itemA.started_at).getTime();
    const timeB = new Date(itemB.started_at).getTime();
    return timeB - timeA;
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const renderItem = ({ item, index }) => {
    const isLastItem = index === currentItems.length - 1;

    return (
      <View key={index} style={{ marginBottom: isLastItem ? 60 : 0 }}>
        <TimelogItem
          id={item.id}
          note={item.note}
          user_id={item.user_id}
          created_at={item.created_at}
          stopped_at={item.stopped_at}
          started_at={item.started_at}
        />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={currentItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <>
          <SummaryHeader themeIs={themeIs} />
          <TimelogSummaryDetails data={data} />
          <TimelogHeader themeIs={themeIs} />
        </>
      )}
    />
  );
};

export default Flatlist;
