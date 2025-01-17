import React, { useState, useLayoutEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image,Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

const ResetPasswordScreen = ({route}) => {

  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Xác nhận mật khẩu
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const { email } = route.params;
  const handleReset = async () => {
    try {
      const response = await axios.post('http://172.20.10.2:5000/api/v1/auth/updatepassword', {
        email: email,
        password: newPassword,
      });
  
      // Assuming response.data contains the fields 'err', 'message', and 'Stt'
      return response.data;
    } catch (error) {
      console.error("Error updating password:", error);
      return { err: 1, message: "An error occurred" }; // Return an error object if request fails
    }
  };
  
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
  
    console.log("Mật khẩu mới:", newPassword);
    
    // Call the handleReset function and wait for the response
    const resnote = await handleReset();  // Make sure to use 'await' to resolve the promise
  
    // Check the response and navigate accordingly
    if (resnote.err === 0) {
      alert(resnote.message);  // Show success message from response
      navigation.navigate("Login");  // Navigate to the login screen
    } else {
      alert(resnote.message || "Đặt lại mật khẩu không thành công!");  // Show error message from response
    }
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/Login/image 20bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Image
          source={require('../../assets/BookScreen/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.greetingText}>{"Xin Chào, Khang Đing!"}</Text>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{"Đặt lại mật khẩu"}</Text>
            <Text style={styles.subtitle}>
              {"Vui lòng nhập mật khẩu mới và xác nhận mật khẩu"}
            </Text>

            {/* Input mật khẩu mới */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={isPasswordVisible ? "eye-slash" : "eye"}
                  size={18}
                  style={{ marginRight: 10, paddingBottom: 20 }}
                  color="#A3A3A3"
                />
              </TouchableOpacity>
            </View>

            {/* Input xác nhận mật khẩu */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={!isConfirmPasswordVisible}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Icon
                  name={isConfirmPasswordVisible ? "eye-slash" : "eye"}
                  size={18}
                  style={{ marginRight: 10, paddingBottom: 20 }}
                  color="#A3A3A3"
                />
              </TouchableOpacity>
            </View>

            {/* Nút đặt lại mật khẩu */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.resetButtonText}>{"Đặt lại mật khẩu"}</Text>
            </TouchableOpacity>

            {/* Nút quay lại */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backToLoginText}>{"Quay lại"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    height: '120%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -45,
  },
  profileImage: {
    top: 100,
    
    bottom: 0,
    borderRadius: 100,
    position: 'absolute',
    width: 200,
    height: 200,
  },
  greetingText: {
    position: 'absolute',
    color: "#EFEFEF",
    top: 320,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
  contentContainer: {
    height: 400,
    marginTop: 450,
  },
  header: {
    flex: 1,
    backgroundColor: "#A3A3A3B0",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 12,
    paddingBottom: 34,
  },
  title: {
    color: "#EFEFEF",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 15,
    width: 326,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 17,
    paddingHorizontal: 16,
    marginHorizontal: 27,
  },
  inputText: {
    color: "#A3A3A3",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  resetButton: {
    backgroundColor: "#34C8E8",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 50,
    marginHorizontal: 36,
    alignItems: "center",
    marginTop: 25,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: 'center',
  },
  backToLoginText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
