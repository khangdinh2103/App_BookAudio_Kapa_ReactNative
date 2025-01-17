import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { Animated, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../screens/Home";
import Account from "../screens/Account";
import Heart from '../screens/LibraryScreen';
import AudioBookScreen from '../components/Audiobook';
import AudioPlayerControlBar from '../components/AudioPlayerControlBar';  // Import AudioPlayerControlBar
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

export default function MyTabs({ route }) {
  const { user } = route.params || {};
  const [animation] = useState(new Animated.Value(0));
  return (
    <View style={{ flex: 1 }}>
      

      <Tab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search-outline' : 'search-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person-outline' : 'person-outline';
            } else if (route.name === 'Heart') {
              iconName = focused ? 'heart-outline' : 'heart-outline';
            }

            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarLabel: ({ focused }) => {
            if (focused) {
              Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }).start();
            } else {
              Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }

            return (
              <Animated.View
                style={{
                  opacity: animation,
                  transform: [
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                }}
              >
                {focused && <Text style={{ color: 'red' }}></Text>}
              </Animated.View>
            );
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: '#d1cfcf',
          tabBarStyle: {
            backgroundColor: '#007380',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 75,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} initialParams={{ user }} />
        <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} initialParams={{ user }}/>
        <Tab.Screen name="Heart" component={Heart} options={{ headerShown: false }} initialParams={{ user }}/>
        <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} initialParams={{ user }}/>
      </Tab.Navigator>
      <View style={{position: 'absolute',bottom: 20, left: 0, right: 0, zIndex: 1 }}>
        <AudioPlayerControlBar />
      </View>
    </View>
  );
}
