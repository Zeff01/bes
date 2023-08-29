import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const LogoutScreen = ({ navigation }) => {
    const handleLogout = () => {
      // Implement your logout logic here
      // For example, reset authentication token, clear user data, etc.
      // After logging out, navigate to the Home screen or the Login screen
      navigation.navigate('HomeScreen');
    };
  
    return (
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    );
  };

export default LogoutScreen
  