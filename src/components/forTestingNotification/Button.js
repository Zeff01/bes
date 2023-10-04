import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = (props) => {
  //   console.log(props);
  return (
    <View style={props.style}>
      <TouchableOpacity onPress={props.scheduleNotifFunc} style={styles.button}>
        <Text style={styles.buttonText}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Button;
