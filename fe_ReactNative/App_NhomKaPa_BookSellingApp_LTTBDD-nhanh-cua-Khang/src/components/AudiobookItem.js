import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

export default function AudiobookItem() {
    const navigation = useNavigation(); // Lấy navigation để sử dụng
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        loadSound();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            { uri: 'https://res.cloudinary.com/dwjrf9fnz/video/upload/v1727879462/sachdongchay_lemecu.mp3' },
            {
                // shouldPlay: false,
                playAsync: false, // Đặt shouldPlay là false để không tự động phát
            }
        );


        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate); // Đặt callback cập nhật trạng thái phát
        setSound(sound);
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
        }
    };

    const playPauseAudio = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSliderValueChange = async (value) => {
        if (sound) {
            const newPosition = value * duration;
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Pressable
                    onPress={() => alert('Mua ngay')}
                    style={{ backgroundColor: '#C0C4CE', borderRadius: 30, width: 130, height: 45, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text>Mua Ngay</Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                    <Ionicons name="alert-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 60, justifyContent: 'center', alert: 'center', width: '100%' }}>
                <View style={{ flex: 70, alignItems: 'center' }}>
                    <Image source={require('../../img/book1.png')} style={{ width: 200, height: 280, borderRadius: 50 }} />
                </View>
                <View style={{ flex: 30, width: '100%' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, marginLeft: 20 }}>Giao tiếp với thiên nhiên</Text>
                    <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginLeft: 20 }}>
                        <Text style={{ color: '#fff' }}>Thiên nhiên là mẹ </Text>
                        <Image source={require('../../img/additem.png')} style={{ width: 30, height: 30 }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Slider
                            style={{ width: '100%', height: 50 }}
                            minimumValue={0}
                            maximumValue={1}
                            value={duration > 0 ? position / duration : 0}
                            onValueChange={handleSliderValueChange}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginLeft: 10, color: '#fff' }}>
                            <Text>{Math.floor(position / 1000)}</Text>
                            <Text>{Math.floor(position / 1000)}:{Math.floor(duration / 1000)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ flex: 25, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Pressable>
                        <Ionicons name="play-skip-back" size={24} color="#fff" />
                    </Pressable>
                    <Pressable
                        onPress={() => setPosition(position - 10)}
                    >
                        <Image source={require('../../img/forward.png')} style={{ width: 20, height: 20 }} />
                    </Pressable>
                    <Pressable
                        style={{
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            backgroundColor: '#576796'
                        }}
                        onPress={() => playPauseAudio}
                    >
                        <Ionicons name={isPlaying ? "pause-circle-outline" : "play"} size={40} color="#fff" />
                    </Pressable>
                    <Pressable
                        onPress={() => setPosition(position + 10)}
                    >
                        <Ionicons name="refresh-outline" size={28} color="#fff" />
                    </Pressable>
                    <Pressable>
                        <Ionicons name="play-skip-forward" size={24} color="#fff" />
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Pressable style={styles.item}>
                        <Ionicons name="moon" size={26} color="#fff" />
                        <Text>Hẹn giờ</Text>
                    </Pressable>
                    <Pressable style={styles.item}>
                        <Ionicons name="list-outline" size={26} color="#fff" />
                        <Text>Chương</Text>
                    </Pressable>
                    <Pressable style={styles.item}>
                        <Text style={{ color: '#fff' }}>1.0x</Text>
                        <Text>Tốc độ</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: '#3A6FB1',
    },
    header: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
    },
    headerbox: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#000',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 5,
        color: '#fff'
    }
});
