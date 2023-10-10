import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ThemeContext from "../store/darkMode/theme-context";
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isKeyboardOn, setIsKeyboardOn] = useState(false);
    const { themeIs } = useContext(ThemeContext);
    const navigation = useNavigation();

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

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailError("");
    };

    const handleSubmit = () => {
        navigation.goBack(); //Back to previous screen for the meantime.
    };

    return (
        <View
        className={`${
            themeIs === "light" ? "bg-primaryColor" : "bg-darkPrimary"
        } flex-1 justify-start`}
        >
        <View
            className={`${
            themeIs === "light"
                ? "bg-tertiaryColor"
                : "bg-darkTertiary border border-darkSenary"
            } pt-[70] w-full h-[85%] items-center justify-end rounded-b-[70]`}
        >
        <View className={isKeyboardOn ? "" : "my-auto"}>
            <View className="justify-center items-center">
                <Image
                    source={require("../../assets/outposter_logo.png")}
                    className="w-[300px] h-[60px]"
                />
            </View>
                <View className="pb-4 justify-center items-center">
                    <Text className='text-xl font-bold text-white mt-5'>
                        Forgot Password?
                    </Text>           
                    <View className="border-t border-red-300 bg-red-500"></View>
                        <View
                            className={
                            themeIs === "light"
                                ? emailError
                                ? "mt-4 mb-2 pl-5 bg-white h-[40] w-[250] rounded-full justify-center"
                                : "mt-4 mb-3 pl-5 bg-white h-[40] w-[250] rounded-full justify-center"
                                : themeIs === "dark"
                                ? emailError
                                ? "mt-4 mb-2 pl-5 bg-darkSenary h-[40] w-[250] rounded-full justify-center"
                                : "mt-4 mb-3 pl-5 bg-darkQuarternary h-[40] w-[250] rounded-full justify-center"
                                : null
                            }
                        >
                            <TextInput
                            color={themeIs === "light" ? "#2B6673" : "#F5F5FA"}
                            label="Email address"
                            placeholder="Email"
                            placeholderTextColor={
                                themeIs === "light" ? "#808080" : "#F5F5FA"
                            }
                            onChangeText={handleEmailChange}
                            value={email}
                            />
                        </View>
                        <View>
                            {emailError ? (
                            <Text className="text-red-500">{emailError}</Text>
                            ) : null}
                        </View>
                        <View className="flex-row items-center">
                            <Text
                                className={`${
                                themeIs === "light"
                                    ? "text-primaryColor"
                                    : "text-darkSenary"
                                } text-sm mr-2`}
                            >
                                Please enter your email.
                            </Text>
                        </View>                    
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
                onPress={handleSubmit}
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
                <Text className="text-white font-bold text-center">SUBMIT</Text>
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
}

export default ForgotPassword;
