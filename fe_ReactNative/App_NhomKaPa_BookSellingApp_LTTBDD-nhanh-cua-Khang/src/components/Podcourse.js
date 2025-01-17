import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Podcourse = () => {
    const [podcourses, setPodcourses] = useState([]); // State để lưu dữ liệu từ API
    const navigation = useNavigation();

    // Hàm lấy dữ liệu từ API
    const fetchPodcourses = async () => {
        try {
            const response = await axios.get('http://172.20.10.2:5000/api/v1/podcast/all');
            setPodcourses(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
        }
    };

    useEffect(() => {
        fetchPodcourses(); // Gọi hàm lấy dữ liệu khi component được render
    }, []);

    const navigateToVideoScreen = (uri) => {
        navigation.navigate('VideoScreen', { uri });
    };

    return (
        <FlatList
            horizontal
            data={podcourses}
            keyExtractor={(item, index) => index.toString()} // Dùng index nếu không có id
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={styles.popularPodcourseCard}
                    onPress={() => navigateToVideoScreen(item.audioSrc)} // Navigate to VideoScreen on press
                >
                    <View style={styles.bookNumberContainer}>
                        <Text style={styles.bookNumberText}>{index + 1}</Text>
                    </View>
                    <Image source={{ uri: item.imgsrc }} style={styles.popularPodcourseImage} />
                    <View style={styles.titleContainer}>
                        <View style={{ flexDirection: 'row', opacity: 0.5, paddingTop: 3 }}>
                            <Image source={require('../../assets/Podcourse/Podcast-Icon-White.png')} style={styles.podcourseImage} />
                            <Text style={{ color: 'white', marginLeft: 7, justifyContent: 'center', alignSelf: 'center' }}>Podcourse</Text>
                        </View>
                        <Text style={styles.podcourseTitle}>{item.name}</Text>
                        <Text style={styles.podcourseAuthor}>{item.host}</Text>
                    </View>

                    {/* Play button */}
                    <TouchableOpacity style={styles.playButton}>
                        <View style={styles.playButtonBackground}>
                            <Ionicons style={{ alignItems: 'center', justifyContent: 'center' }} name="play" size={35} color="white" />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    podcourseSection: {
        marginVertical: 20,
        marginTop: 20,
    },
    popularPodcourseCard: {
        width: 250,
        height: 370,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 0,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        alignItems: 'center',
    },
    popularPodcourseImage: {
        width: 230,
        height: 350,
        borderRadius: 14,
    },
    podcourseImage: {
        width: 30,
        height: 30,
        borderRadius: 14,
        marginLeft: 17,
        paddingTop: 5,
    },
    titleContainer: {
        width: 230,
        bottom: 20,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    podcourseTitle: {
        fontSize: 19,
        width: 230,
        paddingLeft: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 5, 
        color: 'white',
    },
    podcourseAuthor: {
        fontSize: 15,
        width: 230,
        paddingLeft: 17,
        fontWeight: 'normal',
        textAlign: 'left',
        color: 'white',
        marginBottom: 10,
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
    playButtonBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        borderRadius: 25,
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    bookNumberContainer: {
        position: 'absolute',
        height: 45,
        width: 45,
        top: -5,
        left: -12,
        backgroundColor: '#007280FA',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 1,
    },
    bookNumberText: {
        color: 'white',
        fontSize: 26,
        marginTop: 4,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Podcourse;
