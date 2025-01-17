import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioBookProvider = ({ children }) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [selectedSpeedOption, setSelectedSpeedOption] = useState("1.0");
    const [book, setBook] = useState(null);  // State để lưu thông tin sách

    // const loadSound = async (audioUri) => {
    //     const { sound } = await Audio.Sound.createAsync(
    //         audioUri, 
    //         { shouldPlay: true },
    //         onPlaybackStatusUpdate
    //     );
    //     setSound(sound);
    //     sound.playAsync(); 
    //     setIsPlaying(true);
    // };
    const loadSound = async (audioUri) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                audioUri, // Đây có thể là { uri: <URL> } hoặc require(...)
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
            setSound(sound);
            sound.playAsync(); // Phát audio
            setIsPlaying(true);
        } catch (error) {
            console.error("Error loading or playing sound:", error);
        }
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

    const onSpeedChange = async (value) => {
        if (sound) {
            setSelectedSpeedOption(value.toFixed(1));
            await sound.setRateAsync(value, true); 
        }
    };

    const loadBook = (bookData) => {
        setBook(bookData);  // Cập nhật thông tin sách vào state
    };

    return (
        <AudioContext.Provider value={{
            sound,
            isPlaying,
            duration,
            position,
            selectedSpeedOption,
            book,  // Cung cấp book qua context
            loadSound,
            playPauseAudio,
            onSpeedChange,
            loadBook,  // Cung cấp phương thức để load book
        }}>
            {children}
        </AudioContext.Provider>
    );
};
