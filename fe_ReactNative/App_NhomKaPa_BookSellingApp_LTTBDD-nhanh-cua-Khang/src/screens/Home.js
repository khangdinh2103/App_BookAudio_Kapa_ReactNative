import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import BookScreen from '../components/BookScreen'
import screenrank from '../components/screenrank'
import CartBookItem from '../components/CartBookItem'
import  AudioBookScreen from '../components/Audiobook'
import BookList from '../components/BookList'
import AccountScreen from './Account'
import BookListScreenAll from '../components/BookListScreenAll'
import { createStackNavigator } from '@react-navigation/stack';
import Podcourse from '../components/Podcourse'
import VideoPlayer from '../components/VideoPlayer'
import MyCarousel from '../components/Slide'

import { useNavigation, useRoute } from '@react-navigation/native';
const Stack = createStackNavigator();
export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const { user } = route.params;
    return (

        <Stack.Navigator initialRouteName="Book" >
            <Stack.Screen name="Home" component={MyCarousel} />
            <Stack.Screen name="Book" component={BookScreen} options={{ headerShown: false }} initialParams={{ user }}  />
            <Stack.Screen name="rank" component={screenrank} options={{ headerShown: false }} />
            <Stack.Screen name="BookListScreenAll" component={BookListScreenAll} options={{ headerShown: false }} />
            <Stack.Screen name="BookList" component={BookList} options={{ headerShown: false }} />
            <Stack.Screen name="CartBookItem" component={CartBookItem} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Podcourse" component={Podcourse} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
            <Stack.Screen 
                name="AudioBook" 
                component={AudioBookScreen} 
                options={{ 
                headerShown: false,
                tabBarStyle: { display: 'none' },  // Ẩn tab bar khi chuyển đến AudioBook
                }} 
            />
        </Stack.Navigator>

    )
}
