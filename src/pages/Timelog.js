import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogTime from "../components/TimelogTime";
import TimelogItem from "../components/TimelogItem";

const Timelog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseURL = "http://bes.outposter.com.au/api/timelogs";
        const token = await AsyncStorage.getItem("@auth_token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(baseURL, config);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching timelogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const flatData = data.data ? data.data.flat() : [];
  const sortedData = flatData.slice().sort((itemA, itemB) => {
    const timeA = new Date(itemA.started_at).getTime();
    const timeB = new Date(itemB.started_at).getTime();
    return timeB - timeA;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pages = Math.ceil(flatData.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = Array.from(
    { length: pages },
    (_, index) => index + 1
  )
    .filter(
      (page) =>
        page >= minPageNumberLimit &&
        page <= Math.min(maxPageNumberLimit, pages)
    )
    .map((page) => (
      <TouchableOpacity
        className={`mx-[5] rounded-full w-[40] h-[40] justify-center items-center ${
          currentPage === page ? "bg-primaryColor" : "bg-transparent"
        }`}
        key={page}
        onPress={() => handlePageClick(page)}
      >
        <Text
          style={{
            fontSize: 16,
            color: currentPage === page ? "white" : "black",
          }}
        >
          {page}
        </Text>
      </TouchableOpacity>
    ));

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item, index }) => (
    <View key={index}>
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

  const handlePrevButton = () => {
    if (minPageNumberLimit !== 1) {
      if (currentPage === minPageNumberLimit) {
        setCurrentPage(currentPage - 1);
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleNextButton = () => {
    if (maxPageNumberLimit < pages) {
      if (currentPage === maxPageNumberLimit) {
        setCurrentPage(currentPage + 1);
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  let pageDecrementButton = null;
  if (minPageNumberLimit > 1) {
    pageDecrementButton = (
      <TouchableOpacity
        className="w-[40] h-[40] justify-center items-center"
        onPress={handlePrevButton}
      >
        <Ionicons name={"caret-back-outline"} size={40} color={"#0B646B"} />
      </TouchableOpacity>
    );
  }

  let pageIncrementButton = null;
  if (maxPageNumberLimit < pages) {
    pageIncrementButton = (
      <TouchableOpacity
        className="justify-center items-center"
        onPress={handleNextButton}
      >
        <Ionicons name={"caret-forward-outline"} size={40} color={"#0B646B"} />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={styles.paginationContainer}>
        {pageDecrementButton}
        {renderPageNumbers}
        {pageIncrementButton}
      </View>
      <FlatList
        data={currentItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <View className="bg-primaryColor h-[150] rounded-bl-[40]"></View>
            <View className="mx-4 -mt-24 space-y-4 z-10">
              <Text className="text-lg font-light tracking-widest text-white uppercase text-center">
                Summary
              </Text>
              <TimelogTime
                total_ot_hrs={data.total_ot_hrs}
                total_hrs={data.total_hrs}
                total_late_hrs={data.total_late_hrs}
              />
            </View>
            <Text className="text-lg font-light tracking-widest text-[#0B646B] p-4 uppercase text-center">
              Time Logs
            </Text>
          </>
        )}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  flatList: {
    backgroundColor: "white",
    paddingVertical: 4,
    borderTopRightRadius: 40,
    marginTop: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
});

export default Timelog;
