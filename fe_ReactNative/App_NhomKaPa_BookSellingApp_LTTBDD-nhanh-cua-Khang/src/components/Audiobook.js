import React, { useState, useEffect } from 'react';
import {FlatList, View, Text, Animated, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Modal, Image, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import AudioPlayerControlBar from '../components/AudioPlayerControlBar';
import { Audio } from 'expo-av';
import { useAudioContext } from '../context/AudioContext';


export default function AudioBookScreen() {
    
    const navigation = useNavigation();
    const route = useRoute();
    const { book } = route.params; // Lấy dữ liệu sách từ params
    const {
        sound,
        isPlaying,
        duration,
        position,
        selectedSpeedOption,
        loadSound,
        playPauseAudio,
        onSpeedChange,
        loadBook,  // Lấy phương thức loadBook từ context
    } = useAudioContext();
    navigation.setOptions({
        headerShown: false,
    });
    const rewindAudio = async () => {
        if (sound) {
            const newPosition = position - 10000; // Tua lại 10 giây
            if (newPosition < 0) {
                setPosition(0);
                await sound.setPositionAsync(0); // Đảm bảo không tua ra ngoài phạm vi
            } else {
                setPosition(newPosition);
                await sound.setPositionAsync(newPosition);
            }
        }
    };
    const forwardAudio = async () => {
        if (sound) {
            const newPosition = position + 10000; // Tua tới 10 giây
            if (newPosition > duration) {
                setPosition(duration);
                await sound.setPositionAsync(duration); // Đảm bảo không tua quá giới hạn
            } else {
                setPosition(newPosition);
                await sound.setPositionAsync(newPosition);
            }
        }
    };
    

    // const [sound, setSound] = useState(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [position, setPosition] = useState(0);
    // const [selectedSpeedOption, setSelectedSpeedOption] = useState("1.0");
    const [isTimerModalVisible, setTimerModalVisible] = useState(false);
    const [isSpeedModalVisible, setSpeedModalVisible] = useState(false);
    const [isChapterModalVisible, setChapterModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedTimerOption, setSelectedTimerOption] = useState(null); // Fix for error

    const toggleChapterModal = () => setChapterModalVisible(!isChapterModalVisible);
    const toggleTimerModal = () => setTimerModalVisible(!isTimerModalVisible);
    const toggleSpeedModal = () => setSpeedModalVisible(!isSpeedModalVisible);

   
    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
        }
    };


    

    const handleSliderValueChange = async (value) => {
        if (sound) {
            const newPosition = value * duration;
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };
    
    
    
    // useEffect(() => {
    //     // Lưu thông tin book vào context
    //     loadBook(book);

    //     loadSound(require('../../assets/audio/sachdongchay.mp3'));  // Tải file audio

    //     return () => {
    //         if (sound) {
    //             sound.unloadAsync();  // Giải phóng tài nguyên khi component bị unmount
    //         }
    //     };
    // }, []);
    useEffect(() => {
        const setupSound = async () => {
            // Lưu thông tin book vào context
            loadBook(book);
    
            // Kiểm tra nếu `book.audiosrc` tồn tại
            if (book?.audioSrc) {
                await loadSound({ uri: book.audioSrc }); // Tải file từ URL
            } else {
                console.error("No audio source provided in book.");
            }
        };
    
        setupSound();
    
        return () => {
            if (sound) {
                sound.unloadAsync(); // Giải phóng tài nguyên khi component bị unmount
            }
        };
    }, [book]);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Pressable onPress={() => alert('Mua ngay')} style={styles.buyButton}>
                    <Text>Mua Ngay</Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                    <Ionicons name="alert-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 60, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <View style={{ paddingHorizontal: 88,height: '', marginBottom: 30, marginTop: 20, alignItems: 'center' }}>
                    <Image source = {{ uri: book.imgsrc }} style={{ width: 220, height: 330, borderRadius: 17 }} />
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, marginLeft: 20 }}>
                        {book.name}
                    </Text>
                    <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginLeft: 20 }}>
                        <Text style={{ color: '#fff' }}>{book.author}</Text>
                        <Image source={require('../../assets/audiobook/additem.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Slider
                    style={{ width: '90%', height: 50, color: '#fff' }}
                    minimumValue={0}
                    maximumValue={1}
                    value={position / duration}
                    onValueChange={handleSliderValueChange}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginLeft: 10, color: '#fff' }}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>
                        {`${Math.floor(position / 60000)}:${Math.floor((position % 60000) / 1000).toString().padStart(2, '0')}`}
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 12 }}>
                        {`${Math.floor(duration / 60000)}:${Math.floor((duration % 60000) / 1000).toString().padStart(2, '0')}`}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 25, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Pressable>
                        <Ionicons name="play-skip-back" size={24} color="#fff" />
                    </Pressable>
                    <Pressable  onPress={rewindAudio}>
                        <Ionicons name="play-back-sharp" size={28} color="white" />
                    </Pressable>
                    <Pressable
                        style={{
                            width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#576796'
                        }}
                        onPress={playPauseAudio}
                    >
                        <Ionicons name={isPlaying ? "pause-circle-outline" : "play"} size={40} color="#fff" />
                    </Pressable>
                    <Pressable onPress={forwardAudio }>
                         <Ionicons name="play-forward" size={28} color="white" />
                    </Pressable>
                    <Pressable >
                        <Ionicons name="play-skip-forward" size={24} color="#fff" />
                    </Pressable>
                    
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 40 }}>
                <Pressable style={styles.item} onPress={toggleTimerModal}>
                        <Ionicons name="moon" size={26} color="#fff" />
                        <Text style={{ color: '#8C99B9', fontSize: 10 }}>Hẹn giờ</Text>
                    </Pressable>
                    <Pressable style={styles.item}>
                        <Ionicons name="list-outline" size={26} color="#fff" onPress={toggleChapterModal} />
                        <Text style={{ color: '#8C99B9', fontSize: 10 }}>Chương</Text>
                    </Pressable>
                    <Pressable style={styles.item} onPress={toggleSpeedModal}>
                        <Text style={{ color: '#fff', fontSize: 17 }}>{selectedSpeedOption}x</Text>
                        <Text style={{ color: '#8C99B9', fontSize: 10 }}>Tốc độ</Text>
                    </Pressable>
                </View>
                

            </View>
            {/* Modal Hẹn Giờ */}
            <Modal
                visible={isTimerModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleTimerModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Hẹn giờ</Text>
                        {["Không hẹn giờ", "8 phút", "15 phút", "30 phút", "45 phút", "60 phút", "Hết chương"].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => setSelectedTimerOption(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                                {selectedTimerOption === option ? (
                                    <Ionicons name="radio-button-on" size={20} color="#3A6FB1" />
                                ) : (
                                    <Ionicons name="radio-button-off" size={20} color="#ccc" />
                                )}
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={toggleTimerModal} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            {/* Modal Tốc độ phát */}
            <Modal
                visible={isSpeedModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleSpeedModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContentSpeed}>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="speedometer" size={24} color="black" />
                            <Text style={styles.modalTitle}>Tốc độ phát</Text>
                        </View>

                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={0.5}
                            maximumValue={2.0}
                            step={0.1}
                            value={parseFloat(selectedSpeedOption)}  // Đảm bảo giá trị slider là số
                            onValueChange={onSpeedChange} // Cập nhật tốc độ phát khi giá trị slider thay đổi
                        />
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>{selectedSpeedOption}x</Text>
                        <TouchableOpacity onPress={toggleSpeedModal} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


             {/* Modal hiển thị danh sách chương */}
             <Modal
                visible={isChapterModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleChapterModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Danh sách chương</Text>
                        <FlatList
                            // data={chapters}
                            // keyExtractor={(item) => item.id}
                            // renderItem={renderChapterItem}
                        />
                        <TouchableOpacity onPress={toggleChapterModal} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

                        
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       zIndex: 0,
        backgroundColor: '#3A6FB1',


    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
    },
    headerbox: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#000',

    },
    buyButton: {
        backgroundColor: '#C0C4CE',
        borderRadius: 30,
        width: 130,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    slider: {
        width: '90%',
        height: 40,

    },
    time: {
        color: '#FFF',

    },
    item: {


        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 5,
        color: '#fff'


    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 0,
    },
    
    modalContent: {
        width: '90%',
        height: '65%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    modalContentSpeed: {
        width: '90%',
        height: '40%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    modalTitle: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
    confirmButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#34C8E8',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    },
    speedText: {
            color: '#fff',
            fontSize: 20,
        },

})

