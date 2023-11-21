import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PageIncrementBtn = ({
  handleScrollToTop,
  pages,
  currentPage,
  maxPageNumberLimit,
  setCurrentPage,
  setMinPageNumberLimit,
  minPageNumberLimit,
  pageNumberLimit,
  setMaxPageNumberLimit,
}) => {
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

  return (
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
};

export default PageIncrementBtn;
