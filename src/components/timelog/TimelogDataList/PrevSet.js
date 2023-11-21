import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PrevSet = ({
  handleScrollToTop,
  pageNumberLimit,
  setCurrentPage,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
}) => {

  const handlePrevSet = () => {
    handleScrollToTop(420);
    if (minPageNumberLimit > 1) {
      setCurrentPage(minPageNumberLimit - 5);
      setMaxPageNumberLimit(minPageNumberLimit - 1);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
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
};

export default PrevSet;
