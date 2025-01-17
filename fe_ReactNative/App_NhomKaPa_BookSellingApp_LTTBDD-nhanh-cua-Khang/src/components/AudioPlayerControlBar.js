import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioContext } from '../context/AudioContext';

export default function AudioPlayerControlBar() {
    const [fadeAnim] = useState(new Animated.Value(0));  // Điều khiển độ mờ của thanh điều khiển
    const [isControlVisible, setIsControlVisible] = useState(true);  // Điều khiển hiển thị thanh điều khiển
    const { book, isPlaying, playPauseAudio, duration, position } = useAudioContext();

    useEffect(() => {
        if (isPlaying) {
            Animated.timing(fadeAnim, {
                toValue: 1, // Hiển thị thanh điều khiển khi đang phát
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0, // Hiển thị thanh điều khiển khi đang pause
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isPlaying]);

    // Kiểm tra nếu book là null, không render AudioPlayerControlBar
    if (!book) {
        return null;
    }

    // Hàm ẩn thanh điều khiển khi nhấn nút đóng
    const handleCloseControlBar = () => {
        setIsControlVisible(false);
    };

    // Hàm phát/pause audio
    const handlePlayPause = () => {
        playPauseAudio();
    };

    return (
        isControlVisible && (  // Chỉ render thanh điều khiển khi isControlVisible là true
            <Animated.View style={[styles.controlBar, { opacity: fadeAnim }]}>
                <View style={styles.leftContainer}>
                    <Image source = {{ uri: book.imgsrc }} style={styles.bookImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>{book.name}</Text>
                        <Text style={styles.bookAuthor}>{book.author}</Text>
                    </View>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCloseControlBar} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    );
}

const styles = StyleSheet.create({
    controlBar: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(51, 51, 51, 0.9)', // Màu nền mờ
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 30,
        // Đổ bóng cho thanh điều khiển
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Cho Android
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookImage: {
        width: 40,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    textContainer: {
        marginLeft: 10,
    },
    bookTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        width:200
    },
    bookAuthor: {
        color: 'white',
        fontSize: 12,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginHorizontal: 10,
    },
    closeButton: {
        marginLeft: 20,
    },
});
