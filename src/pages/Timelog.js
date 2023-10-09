import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TimelogTime from "../components/TimelogTime";
import TimelogItem from "../components/TimelogItem";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ThemeContext from "../store/darkMode/theme-context";

const Timelog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
  const flatListRef = useRef();
  const isFocused = useIsFocused();
  const { themeIs } = useContext(ThemeContext);

  const handleScrollToTop = (offsetDistance) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: offsetDistance,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleScrollToTop(0);
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
      setCurrentPage(1);
      setMinPageNumberLimit(1);
      setMaxPageNumberLimit(5);
    }
  }, [isFocused]);

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
    handleScrollToTop(420);
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
        className={`mx-[2] rounded-full w-[34] h-[34] justify-center items-center ${
          currentPage === page ? "bg-primaryColor" : "bg-transparent"
        }`}
        key={page}
        onPress={() => handlePageClick(page)}
      >
        <Text
          className={`text-base ${
            currentPage === page ? "text-whiteColor" : "text-primaryColor"
          }`}
        >
          {page}
        </Text>
      </TouchableOpacity>
    ));

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-[10]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

  const handlePrevButton = () => {
    handleScrollToTop(420);
    if (currentPage > 1) {
      if (currentPage === minPageNumberLimit) {
        setCurrentPage(currentPage - 1);
        setMaxPageNumberLimit(minPageNumberLimit - 1);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleNextButton = () => {
    handleScrollToTop(420);
    if (currentPage < pages) {
      if (currentPage === maxPageNumberLimit) {
        setCurrentPage(currentPage + 1);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        if (maxPageNumberLimit + pageNumberLimit < pages) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        } else {
          setMaxPageNumberLimit(pages);
        }
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevSet = () => {
    handleScrollToTop(420);
    if (minPageNumberLimit > 1) {
      setCurrentPage(minPageNumberLimit - 5);
      setMaxPageNumberLimit(minPageNumberLimit - 1);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextSet = () => {
    handleScrollToTop(420);
    if (maxPageNumberLimit < pages) {
      setCurrentPage(maxPageNumberLimit + 1);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      if (maxPageNumberLimit + pageNumberLimit < pages) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      } else {
        setMaxPageNumberLimit(pages);
      }
    }
  };

  let pageDecrementButton = (
    <TouchableOpacity
      className="mx-[8] justify-center items-center"
      onPress={handlePrevButton}
      disabled={!(currentPage > 1)}
    >
      <FontAwesome
        name={"angle-left"}
        size={30}
        color={"#0B646B"}
        style={{ opacity: currentPage > 1 ? 1 : 0.2 }}
      />
    </TouchableOpacity>
  );

  let pageIncrementButton = (
    <TouchableOpacity
      className="mx-[8] justify-center items-center"
      onPress={handleNextButton}
      disabled={!(currentPage < pages)}
    >
      <FontAwesome
        name={"angle-right"}
        size={30}
        color={"#0B646B"}
        style={{ opacity: currentPage < pages ? 1 : 0.2 }}
      />
    </TouchableOpacity>
  );

  let prevSet = (
    <TouchableOpacity
      className="mx-[8] justify-center items-center"
      onPress={handlePrevSet}
      disabled={!(minPageNumberLimit > 1)}
    >
      <FontAwesome
        name={"angle-double-left"}
        size={30}
        color={"#0B646B"}
        style={{ opacity: minPageNumberLimit > 1 ? 1 : 0.2 }}
      />
    </TouchableOpacity>
  );

  let nextSet = (
    <TouchableOpacity
      className="mx-[8] justify-center items-center"
      onPress={handleNextSet}
      disabled={!(maxPageNumberLimit < pages)}
    >
      <FontAwesome
        name="angle-double-right"
        size={30}
        color="#0B646B"
        style={{ opacity: maxPageNumberLimit < pages ? 1 : 0.2 }}
      />
    </TouchableOpacity>
  );

  return (
    <View
      className={`${
        themeIs === "light" ? "bg-whiteColor" : "bg-darkPrimary"
      } flex-1`}
    >
      <FlatList
        ref={flatListRef}
        data={currentItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <View
              className={`${
                themeIs === "light"
                  ? "bg-primaryColor"
                  : "bg-darkTertiary  border-b border-darkSenary"
              } h-[150] rounded-bl-[40]`}
            ></View>
            <View className="mx-4 -mt-24 space-y-4 z-10">
              <Text className="text-lg font-light tracking-widest text-whiteColor uppercase text-center">
                Summary
              </Text>
              <TimelogTime
                total_ot_hrs={data.total_ot_hrs}
                total_hrs={data.total_hrs}
                total_late_hrs={data.total_late_hrs}
              />
            </View>
            <Text
              className={`${
                themeIs === "light" ? "text-[#0B646B]" : "text-whiteColor"
              } text-lg font-light tracking-widest p-4 uppercase text-center`}
            >
              Time Logs
            </Text>
          </>
        )}
      />
      <View className="items-center ">
        <View className="absolute bottom-0 ">
          <View className=" flex-row justify-center items-center mt-[35] bg-secondaryColor rounded-full px-[10] mb-[9] h-[60]">
            {prevSet}
            {pageDecrementButton}
            {renderPageNumbers}
            {pageIncrementButton}
            {nextSet}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Timelog;
