import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyTabs from './src/navigate/MyTabs';
import AudioPlayerControlBar from './src/components/AudioPlayerControlBar';
import Login from './src/screens/Login'; // Capitalize component name
import Registration from './src/screens/Registration'; // Capitalize component name
import CartBookItem from './src/components/CartBookItem';
import AccountScreen from './src/screens/Account';
import VideoPlayer from './src/components/VideoPlayer';
import Podcourse from './src/components/Podcourse';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ChatBot from './src/components/chatBot/ChatBot';
import { AudioBookProvider } from './src/context/AudioContext';

const Stack = createStackNavigator();

export default function App() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <AudioBookProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="CartBookItem" component={CartBookItem} options={{ headerShown: false }} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="Podcourse" component={Podcourse} />
            
                <Stack.Screen name="VideoScreen" component={VideoPlayer} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AudioBookProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
