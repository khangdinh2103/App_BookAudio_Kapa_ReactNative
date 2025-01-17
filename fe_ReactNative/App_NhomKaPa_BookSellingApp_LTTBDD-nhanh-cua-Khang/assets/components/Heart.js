import React, { useState, useEffect } from 'react';
import { View, Animated, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const HeartIcon = ({ userId, bookId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [colorAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.2:5000/api/v1/userbook/userId`,
          { params: { userId } }
        );
        const userBooks = response.data;
        const bookExists = userBooks.some((book) => book.bookId === bookId);

        setIsLiked(bookExists);
        // Cập nhật hiệu ứng màu
        if (bookExists) {
          startColorAnimation(1); // Chuyển màu thành đỏ nếu sách đã thích
        }
      } catch (error) {
        console.error('Error checking favorite books:', error);
      }
    };

    checkIfLiked();
  }, [userId, bookId]);

  const startColorAnimation = (toValue) => {
    Animated.timing(colorAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleHeart = async () => {
    if (isLiked) {
      Alert.alert('Thông báo', 'Sách này đã có trong danh sách yêu thích.');
      return;
    }

    // Gọi API thêm sách nếu chưa tồn tại
    try {
      const response = await axios.post(
        `http://172.20.10.2:5000/api/v1/userbook/adduserbook`,
        null,
        {
          params: {
            userId,
            bookId,
            status: 'in_progress',
            rating: 5,
          },
        }
      );
      console.log('Insert success:', response.data);

      setIsLiked(true);
      startColorAnimation(1); // Kích hoạt hiệu ứng đổi màu thành đỏ
    } catch (error) {
      console.error('Error adding book to favorites:', error);
      Alert.alert('Error', 'Không thể thêm sách vào danh sách yêu thích.');
    }
  };

  const heartColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'red'], // Trắng khi chưa thích, đỏ khi thích
  });

  return (
    <TouchableOpacity onPress={toggleHeart}>
      <Animated.View style={styles.viewHeart}>
        {/* Chuyển đổi color thành động */}
        <AntDesign name="heart" size={18} color={isLiked ? 'red' : 'white'} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = {
  viewHeart: {
    padding: 7,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
};

export default HeartIcon;
