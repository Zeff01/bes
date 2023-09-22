import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Switch } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import * as Notifications from "expo-notifications";

const Login = () => {
  const [email, setEmail] = useState("jeronealimpia@gmail.com");
  const [password, setPassword] = useState("admin1234");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  };

  useEffect(() => {
    registerForPushNotificationsAsync();

    if (!keepLoggedIn) {
      AsyncStorage.removeItem("@auth_token");
    }
  }, [keepLoggedIn]);

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError("");
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError("");
  };

  const handleLogin = async () => {
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (email && password) {
      try {
        const response = await axios.post(
          "http://bes.outposter.com.au/api/auth/login",
          { email, password }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const data = response.data;
        await AsyncStorage.setItem("@auth_token", data.success.token);
        navigation.navigate("BottomTabs");
        console.log(data.success.token);
      } catch (error) {
        console.error("Error:z", error);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center ">
      <View className=" w-full  items-center justify-center ">
        <Image
          source={require("../../assets/outposter_logo.png")}
          className="w-[250px] h-[50px]"
        />
      </View>

      <View className=" p-2">
        <Text className="text-center text-gray-500 text-lg">
          Welcome back! Please login to your account.
        </Text>
      </View>

      <View className="p-4">
        <TouchableOpacity className="rounded bg-primary p-3 mb-1">
          <Text className="text-white text-center text-lg">
            Login via Outposter Email
          </Text>
        </TouchableOpacity>

        <View className="border-t border-gray-300 my-2"></View>
        <View className=" mb-2">
          <TextInput
            color="#0B646B"
            label="Email address"
            placeholderTextColor="#999999"
            onChangeText={handleEmailChange}
            value={email}
          />
        </View>
        <View>
          {emailError ? (
            <Text className="text-red-500 my-2 ">{emailError}</Text>
          ) : null}
        </View>

        <View className="">
          <TextInput
            color="#0B646B"
            label="Password"
            placeholderTextColor="#999999"
            secureTextEntry
            onChangeText={handlePasswordChange}
            value={password}
          />
        </View>
        <View>
          {passwordError ? (
            <Text className="text-red-500 my-2">{passwordError}</Text>
          ) : null}
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={keepLoggedIn ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setKeepLoggedIn}
              value={keepLoggedIn}
            />
            <Text className="text-gray-600 text-sm mr-2">
              Keep me logged in
            </Text>
          </View>

          <TouchableOpacity>
            <Text className="text-gray-40 text-sm text-primary">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Login"
          onPress={handleLogin}
          color="#009598"
          tintColor="white"
        ></Button>
      </View>

      <View className="p-4 border-t border-gray-300 mx-4 mt-4">
        <Text className="text-gray-400 text-center text-sm ">
          Don't have an account? Contact your System Administrator.
        </Text>
      </View>
    </View>
  );
};

export default Login;
