import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,Alert
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import GooglePNG from '../../assets/Login/Wrappergg.png';
import FacebookPNG from '../../assets/Login/Shapeapple.png';
import ApplePNG from '../../assets/Login/Shapefb.png';
import axios from 'axios';
const LoginScreen = (props) => {
  const navigation = useNavigation();
  
  // Sử dụng useLayoutEffect để thiết lập header options sau khi render lần đầu tiên
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState(""); // State lưu trữ username
  const [password, setPassword] = useState(""); // State lưu trữ password
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");

  const [token, setToken] = useState(""); // State for token after successful login

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.8:3000/api/v1/login', {
        email: email,
        password: password,
      });

      if (response.data.token) {
        setIsLogin(true);
        setToken(response.data.token);
        setUserId(response.data.user.id);
        // Alert.alert("Login Successful", "You have logged in successfully.");
        Alert.alert("Đăng nhập thành công!", `Chào mừng,  ${response.data.user.name}`);
        navigation.navigate('MyTabs', {
                user: {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                },
            });
      } else {
        Alert.alert("Đăng nhập không thành công", response.data.message);
       setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error logging in.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/Login/image 20bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Image
          source={require('../../assets/Login/AvatarLoginImg.png')}
          style={{ top: 20, left: 0, right: 0, bottom: 0, position: 'absolute', width: 389, height: 338 }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{"Đăng nhập"}</Text>
            <Text style={styles.subtitle}>{"Vui lòng đăng nhập để tiếp tục"}</Text>

            {/* Input username */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="email"
                value={email}
                onChangeText={(text) => setEmail(text)} // Cập nhật state username
              />
              <Icon name="user" size={20} color="#A3A3A3" />
            </View>

            {/* Input password */}
            <View style={styles.inputPasswordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible} // Ẩn/mở password
                value={password}
                onChangeText={(text) => setPassword(text)} // Cập nhật state password
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={isPasswordVisible ? "eye-slash" : "eye"}
                  size={20}
                  color="#A3A3A3"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>{"Quên mật khẩu?"}</Text>
            </TouchableOpacity>

            {/* Nút Đăng nhập */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin} // Chuyển đến MyTabs khi nhấn nút
            >
              <Text style={styles.loginButtonText}>{"Đăng nhập"}</Text>
            </TouchableOpacity>

            {/* Dòng thông báo cho người dùng chưa có tài khoản */}
            <View style={styles.signupPrompt1}>
              <Text style={styles.signupText}>{"Chưa có tài khoản?"}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.signupLink}>{" Đăng ký"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signupPrompt2}>
              <Text style={styles.signupText}>{"Đăng nhập bằng"}</Text>
            </View>

            {/* Các biểu tượng đăng nhập bằng mạng xã hội */}
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.socialIcon}>
                <Image source={GooglePNG} style={{ height: 28, width: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.socialIcon}>
                <Image source={ApplePNG} style={{ height: 28, width: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.socialIcon}>
                <Image source={FacebookPNG} style={{ height: 28, width: 24 }} />
              </TouchableOpacity>
            </View>
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
    height: 483,
    marginTop: 390,
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
  inputContainer: {
    width: 326,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 17,
    paddingHorizontal: 16,
    marginBottom: 18,
    marginHorizontal: 27,
  },
  inputText: {
    color: "#A3A3A3",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputPasswordContainer: {
    marginBottom: 21,
    marginHorizontal: 28,
    width: 326,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    color: "#A3A3A3",
    fontSize: 14,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "right",
    marginRight: 36,
    marginBottom: 29,
  },
  loginButton: {
    backgroundColor: "#34C8E8",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 100,
    marginBottom: 0,
    marginHorizontal: 36,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: 'center',
  },
  signupPrompt1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
  },
  signupPrompt2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 13,
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  signupLink: {
    color: "#34C8E8",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
  },
  socialIcon: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default LoginScreen;
