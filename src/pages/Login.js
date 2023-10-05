import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import * as Notifications from "expo-notifications";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);
  const navigation = useNavigation();

  //For responsiveness of UI when keyboard is on or off
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOn(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOn(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
        // console.log(data.success.token);
      } catch (error) {
        console.error("Error:z", error);
      }
    }
  };

  return (
    <View className="flex-1 bg-primaryColor justify-start">
      <View className="pt-[70] w-full h-[85%] items-center justify-end bg-tertiaryColor rounded-b-[70]">
        <View className={isKeyboardOn ? "" : "my-auto"}>
          <View className="justify-center items-center">
            <Image
              source={require("../../assets/outposter_logo.png")}
              className="w-[300px] h-[60px]"
            />
          </View>
          <View className="pb-4 justify-center items-center">
            <View className="border-t border-red-300 my-2 bg-red-500"></View>
            <View
              className={
                emailError
                  ? "mt-4 mb-2 pl-5 bg-white h-[40] w-[250] rounded-full justify-center"
                  : "mt-4 mb-3 pl-5 bg-white h-[40] w-[250] rounded-full justify-center"
              }
            >
              <TextInput
                color="#2B6673"
                label="Email address"
                placeholder="Email"
                placeholderTextColor="#808080"
                onChangeText={handleEmailChange}
                value={email}
              />
            </View>
            <View>
              {emailError ? (
                <Text className="text-red-500">{emailError}</Text>
              ) : null}
            </View>

            <View
              className={
                passwordError
                  ? "mt-2 mb-2 pl-5 bg-white h-[40] w-[250] rounded-full justify-center"
                  : "mt-2 mb-3 pl-5 bg-white h-[40] w-[250] rounded-full justify-center"
              }
            >
              <TextInput
                color="#2B6673"
                label="Password"
                placeholder="Password"
                placeholderTextColor="#808080"
                secureTextEntry
                onChangeText={handlePasswordChange}
                value={password}
              />
            </View>
            <View>
              {passwordError ? (
                <Text className="text-red-500">{passwordError}</Text>
              ) : null}
            </View>

            <View
              className={
                passwordError
                  ? "justify-between items-center"
                  : "justify-between items-center mt-4"
              }
            >
              <View className="flex-row items-center">
                <Switch
                  trackColor={{ false: "#87B0B6", true: "#87B0B6" }}
                  thumbColor={keepLoggedIn ? "#2B6673" : "#2B6673"}
                  ios_backgroundColor="#2B6673"
                  onValueChange={setKeepLoggedIn}
                  value={keepLoggedIn}
                />
                <Text className="text-primaryColor text-sm mr-2">
                  Keep me logged in.
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-right text-primaryColor text-sm text-secondaryColor">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View className=" p-2">
            <Text className="text-center text-gray-500 text-lg">
              Welcome back! Please login to your account.
            </Text>
          </View> */}

            {/* <TouchableOpacity className="rounded bg-primaryColor p-3 mb-1">
            <Text className="text-white text-center text-lg">
              Login via Outposter Email
            </Text>
          </TouchableOpacity> */}
          </View>
        </View>
        <View
          className={
            isKeyboardOn
              ? "justify-center bg-0 mb-[30]"
              : "justify-end bg-0 mb-[40]"
          }
        >
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primaryColor rounded-full w-[140] h-[50] bg-0 justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.35,
              shadowRadius: 1.84,
              elevation: 5,
            }}
          >
            <Text className="text-white font-bold text-center">LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mx-4 my-auto">
        <Text className="text-tertiaryColor text-center text-sm ">
          Don't have an account? Contact your System Administrator.
        </Text>
      </View>
    </View>
  );
};

export default Login;
