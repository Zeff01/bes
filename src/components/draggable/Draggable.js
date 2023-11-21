import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MARGIN, getOrder, getPosition } from "../../utils/draggable";
import AsyncStorage from "@react-native-async-storage/async-storage";

// fix the positions here, it seems that we don't need it. DOUBLE CHECK!
const Draggable = ({ children, positions, item, isSort }) => {
  // initial positions
  const position = getPosition(positions.value[item]);
  const translateY = isNaN(position.y)
    ? useSharedValue(0)
    : useSharedValue(position.y);

  // isGestureActive = to know whenever it is active or not so that we can place the box at the very top of index.
  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[item],
    (newOrder) => {
      const newPositions = getPosition(newOrder);
      translateY.value = withTiming(newPositions.y);
    }
  );

  // gesture event handler func - hook provided by react-native-reanimated.
  // in mobile apps - gestures are away for users to interact with the app through touch-based actions like tapping, swiping, dragging, etc.
  // this useAnimatedGestureHandler - allows us to define how an animated component should respond.
  // it also returns an object that contains callback funcs(like onStart, onActive, onEnd, etc.) -- this will define how the component should behave during different stages of a gesture.
  const panGesture = useAnimatedGestureHandler({
    // this func handles the removement of a box. This is the reason why when you remove a box it won't go back to the original place.
    // this func will invoke when the user triggers the gesture(ex. touch)
    onStart: (_, ctx) => {
      // -- parameters 1. event -- contains  the information about the gesture event, such as the starting position, velocity, and other relevant details depending on the type of gesture. See console.log(e)
      // -- 2. context -- object you can use to store and retrieve values across different stages of the gesture. Allows you to maintain state during the gesture.
      ctx.startY = translateY.value;
      isGestureActive.value = true;
    },
    // this func handles the movement when onHold a box
    onActive: (evt, ctx) => {
      translateY.value = ctx.startY + evt.translationY;
      // this is for when dragging to new position.
      const oldOrder = positions.value[item];
      const newOrder = getOrder(translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder
        );
        // if idToSwap is not undefined it will go back to the original position. This is for when dragging an item to position that is not applicable.
        if (idToSwap) {
          // if value changes this will convert to string and then convert back again to javascript obj. To instantiate the new value which is the positions.value.
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[item] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
          // console.log(positions.value);
        }
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[item]);
      translateY.value = withTiming(destination.y);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const setNewArray = async () => {
    if (!isGestureActive.value) {
      try {
        const newArray = Object.entries(positions.value)
          .map(([task, value]) => ({ task, value }))
          .sort((a, b) => a.value - b.value)
          .map(({ task }) => ({ task }));
        // console.log(newArray);
        await AsyncStorage.setItem("tasks", JSON.stringify(newArray));
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };
  setNewArray();

  // useAnimatedStyle = move elements based on the transition
  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.02 : 1;
    return {
      position: "absolute",
      zIndex,
      transform: [{ translateY: translateY.value }, { scale }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      {isSort ? (
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View>{children}</Animated.View>
        </PanGestureHandler>
      ) : (
        <Animated.View>{children}</Animated.View>
      )}
    </Animated.View>
  );
};

export default Draggable;
