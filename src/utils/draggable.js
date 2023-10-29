// explain what is this?
import { Dimensions } from "react-native";

const COL = 1;
export const MARGIN = 8;
// size per box
export const SIZE = 90;

export const WIDTH = Dimensions.get("window").width - MARGIN * 6;

export const getPosition = (index) => {
  "worklet";
  return {
    y: Math.floor(index / COL) * SIZE,
  };
};

// the order of the positions
export const getOrder = (y) => {
  "worklet";
  const row = Math.round(y / SIZE);
  return row * COL;
};
