import React, { useState, useLayoutEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Alert
} from "react-native";
import { useNavigation ,useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  // Sử dụng useLayoutEffect để thiết lập header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [email, setEmail] = useState(""); // State lưu email người dùng
  const [otp, setOtp] = useState(""); // State lưu mã OTP
  const [showOtpInput, setShowOtpInput] = useState(false); // State để hiển thị/ẩn OTP input
  const [mailOTP, setMailOTP] = useState(""); // State lưu mã OTP được gửi qua email
  const fadeAnim = useRef(new Animated.Value(0)).current; // Giá trị animation ban đầu
 const handleResetOTP = async () => {
    try {
        const response = await axios.post('http://172.20.10.2:5000/api/v1/sendOTP', {
            email: email,
        });
      setMailOTP( response.data.code.toString());

       
    } catch (error) {
        console.error("Error sending email:", error);
        Alert.alert("Error", "There was an error sending the email.");
    }
}


  const handleResetPassword = () => {
    console.log("Email được gửi đến:", email);
    handleResetOTP();
    // Logic gửi email đặt lại mật khẩu

    // Hiển thị OTP input với animation
    setShowOtpInput(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleVerifyOtp = () => {
    if (otp.trim() !== mailOTP) {
      alert("Mã OTP không chính xác!");
      return;
    }
    console.log("OTP đã nhập:", otp);
    // Logic xác minh OTP
    alert("OTP xác minh thành công!");
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/Login/image 20bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Image
          source={require('../../assets/Login/forgetpass.png')}
          style={{
            top: 50,
            left: -2,
            right: 0,
            bottom: 0,
            position: 'absolute',
            width: 389,
            height: 380,
          }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{"Quên mật khẩu"}</Text>
            <Text style={styles.subtitle}>
              {"Vui lòng nhập email để nhận OTP đặt lại mật khẩu"}
            </Text>

            {/* Input email */}
            <View style={styles.inputContainerEmail}>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)} // Cập nhật state email
                keyboardType="email-address"
              />
              <Icon name="envelope" size={16} color="#A3A3A3" />
            </View>

            {/* Hiển thị input OTP với animation */}
            {showOtpInput && (
              <Animated.View
                style={[
                  styles.inputContainerOTP,
                  { opacity: fadeAnim }, // Kết hợp hiệu ứng mờ dần
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Nhập mã OTP"
                  value={otp}
                  onChangeText={(text) => setOtp(text)} // Cập nhật state otp
                  // keyboardType="numeric"
                />
                <Icon name="key" size={16} color="#A3A3A3" />
              </Animated.View>
            )}

            {/* Nút gửi yêu cầu */}
            {!showOtpInput && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resetButtonText}>{"Gửi yêu cầu"}</Text>
              </TouchableOpacity>
            )}

            {/* Nút nhập mã */}
            {showOtpInput && (
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => navigation.navigate("ResetPassword", { email: email })
              }
              >
                <Text style={styles.verifyButtonText}>{"Nhập mã"}</Text>
              </TouchableOpacity>
            )}

            {/* Nút quay lại */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backToLoginText}>{"Quay lại đăng nhập"}</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainerEmail: {
    marginTop: 20,
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
  inputContainerOTP: {
    marginTop: 20,
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
    paddingHorizontal: 100,
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
  verifyButton: {
    backgroundColor: "#34C8E8",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 100,
    marginHorizontal: 36,
    marginTop: 25,
    alignItems: "center",
  },
  verifyButtonText: {
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

export default ForgotPasswordScreen;
