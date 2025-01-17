import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native"; // Đảm bảo import 'Image'
import Icon from 'react-native-vector-icons/FontAwesome';
import GooglePNG from '../../assets/Login/Wrappergg.png';
import FacebookPNG from '../../assets/Login/Shapefb.png';
import TwitterPNG from '../../assets/Login/Shapeapple.png';
import axios from "axios";

const RegistrationScreen = (props ) => {
  const navigation = useNavigation();

  navigation.setOptions({
    headerShown: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");           // State lưu trữ email
  const [username, setUsername] = useState("");     // State lưu trữ username
  const [password, setPassword] = useState("");     // State lưu trữ password
 const [result, setResult] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSignUp = async () => {
    try{
      const res = await axios.post('http://172.20.10.2:5000/api/v1/auth/register', {
        email: email,
        name: username,
        password: password
      })
      return res.data;

    }catch(error){
      console.log(error);
      return { err: 1, message: "An error occurred" };
    }
  }
  
  const handleSingUpAcc= async()=>{
    const resultapi= await handleSignUp();

    if(resultapi.err===0){
      navigation.navigate('Login');
      return alert( result.message||'Đăng ký thành công');
    }
    return alert(result.message||'Đăng ký thất bại');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/Login/image 20bg.png')}
        style={styles.backgroundImage}
        resizeMode=""
      >
        {/* <ScrollView style={styles.scrollView}> */}
          <Image
            source={require('../../assets/Login/Illustrationchube.png')}
            style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', width: 380, height: 300 }}
          />
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{"Đăng ký tài khoản"}</Text>
              <Text style={styles.subtitle}>{"Bắt đầu miễn phí!"}</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}   // Cập nhật state email
                />
                <Icon name="envelope" size={16} color="#A3A3A3" />
              </View>

              {/* Input username */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter username"
                  value={username}
                  onChangeText={(text) => setUsername(text)} // Cập nhật state username
                />
                <Icon name="user" size={20} color="#A3A3A3" />
              </View>

              {/* Input password */}
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  secureTextEntry={!isPasswordVisible}   // Ẩn/mở password
                  value={password}
                  onChangeText={(text) => setPassword(text)}  // Cập nhật state password
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={isPasswordVisible ? "eye-slash" : "eye"}
                    size={20}
                    color="#A3A3A3"
                  />
                </TouchableOpacity>
              </View>

              {/* Đổi nút Đăng ký thành TouchableOpacity */}
              <TouchableOpacity style={styles.signupButton}
              onPress={handleSingUpAcc}
              >
                <Text style={styles.signupButtonText}>{"Đăng ký"}</Text>
              </TouchableOpacity>

              {/* Dòng thông báo cho người dùng đã có tài khoản */}
              <View style={styles.loginPrompt}>
                <Text style={styles.loginText}>{"Bạn đã có tài khoản?"}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                  <Text style={styles.loginLink}>{" Đăng nhập"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.socialIconsContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.socialIcon}
                >
                  <Image source={GooglePNG} style={{ height: 28, width: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.socialIcon}
                >
                  <Image source={FacebookPNG} style={{ height: 28, width: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.socialIcon}
                >
                  <Image source={TwitterPNG} style={{ height: 28, width: 24 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: '120%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -45,
  },
  contentContainer: {
    height: 550,
    marginTop: 290,
    
  },
  header: {
    flex: 1,
    backgroundColor: "#A3A3A3B0",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    paddingBottom: 34,
  },
  title: {
    color: "#EFEFEF",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 14,
    marginLeft: 0,
    textAlign: 'center',
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 30,
    marginLeft: 0,
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
  signupButton: {
    backgroundColor: "#34C8E8",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 107,
    marginBottom: 29,
    marginHorizontal: 36,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  loginLink: {
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

export default RegistrationScreen;
