import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Dimensions, Animated, Alert, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const { width } = Dimensions.get('window');

// Kích thước của ảnh giữa
const centerImageWidth = 220;
const centerImageHeight = 290;

// Mảng mô tả cố định cho các ảnh
const descriptions = [
  'Sách nói mới',
  'Top 10 sách bán chạy',
  'Podcast mới',
  // Thêm các mô tả cho các sách ở đây
];

const MyCarousel = ({user}) => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]); // Dữ liệu ảnh
  const [activeIndex, setActiveIndex] = useState(0); // Trạng thái chỉ số ảnh đang hoạt động
  const animatedValues = useRef(
    Array(5).fill().map(() => ({
      translateY: new Animated.Value(20),
      opacity: new Animated.Value(0),
    }))
  ).current;

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://172.20.10.2:5000/api/v1/book/ranking');
        const data = response.data.map((item, index) => ({
          ...item, // Lưu toàn bộ đối tượng item
          description: descriptions[index] || 'Mô tả sách chưa có.', // Thêm mô tả từ mảng cố định
        }));
        setImages(data); // Cập nhật state với dữ liệu lấy từ API
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách sách.');
      }
    };

    fetchImages();
  }, []);

  const renderItem = ({ item, index }) => {
    const { translateY, opacity } = animatedValues[index];

    // Cập nhật animation khi ảnh ở giữa
    Animated.timing(translateY, {
      toValue: activeIndex === index ? -15 : 20,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: activeIndex === index ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return (
      <View style={styles.slide}>
         <TouchableOpacity onPress={() => navigation.navigate('CartBookItem', { book: item, user })}>
        <Image source={{ uri: item.imgsrc }} style={styles.image} />
        <Animated.View style={[styles.textContainer, { opacity, transform: [{ translateY }] }]}>
          <View style={styles.iconWithText}>
            <Image source={require("../../assets/slide/saoSlide.png")} style={styles.icon} />
            <Text style={styles.text}>{item.description}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
      </View>
    );
  };

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={centerImageWidth}
      layout="default"
      inactiveSlideScale={0.8}
      inactiveSlideOpacity={0.5}
      onSnapToItem={(index) => setActiveIndex(index)} // Cập nhật chỉ số khi kéo
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end', // Đặt nội dung ở dưới cùng
  },
  image: {
    width: centerImageWidth,
    height: 330,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    backgroundColor: 'white', // Nền màu trắng
    padding: 10, // Khoảng cách bên trong
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 27,  // Kích thước của hình ảnh sao
    height: 20,
    marginRight: 5,  // Khoảng cách giữa icon và text
  },
});

export default MyCarousel;
