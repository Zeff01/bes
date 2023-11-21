import React from "react";
import { Text, TouchableOpacity } from "react-native";

const RenderPageNum = ({
  handleScrollToTop,
  pages,
  currentPage,
  minPageNumberLimit,
  maxPageNumberLimit,
  setCurrentPage,
}) => {
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

  return <>{renderPageNumbers}</>;
};

export default RenderPageNum;
