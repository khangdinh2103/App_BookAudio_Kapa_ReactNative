import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Hàm chia dữ liệu thành các nhóm
const chunkArray = (array, size) => {
    return array.reduce((acc, _, index) => {
        if (index % size === 0) acc.push(array.slice(index, index + size));
        return acc;
    }, []);
};

const BookList = ({user}) => {
    const [books, setBooks] = useState([]);
    
    const navigation = useNavigation();

    const fetchBookList = async () => {
        try {
            const response = await axios.get('http://172.20.10.2:5000/api/v1/book/all');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    const bookRows = chunkArray(books, 3);

    useEffect(() => {
        fetchBookList();
    }, []);

    const renderRow = ({ item }) => (
        <View style={styles.row}>
            {item.map((book) => (
                <TouchableOpacity
                    key={book.id}
                    style={styles.bookCard}
                    onPress={() => navigation.navigate('CartBookItem', { book, user })}
                >
                    <Image
                        source={{ uri: book.imgsrc }}
                        style={styles.bookImage}
                    />
                    <View style={styles.bookInfo}>
                        <Text style={styles.bookTitle} numberOfLines={2}>
                            {book.name}
                        </Text>
                        <Text style={styles.bookAuthor}>{book.author}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.moreButtonText}>...</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={bookRows}
            renderItem={renderRow}
            horizontal // Hiển thị ngang
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
        />
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingVertical: 20,
    },
    row: {
        flexDirection: 'column',
        marginRight: 15,
    },
    bookCard: {
        flexDirection: 'row', // Đặt ngang
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: 300, // Đặt chiều rộng cố định cho thẻ sách
    },
    bookImage: {
        width: 70,
        height: 100,
        borderRadius: 8,
        marginRight: 10, // Tạo khoảng cách giữa hình ảnh và thông tin sách
    },
    bookInfo: {
        flex: 1, // Để thông tin sách chiếm hết không gian còn lại
    },
    tag: {
        backgroundColor: '#FFB74D',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 6,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    bookTitle: {
        fontSize: 14,
        width: 180,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        flexWrap: 'wrap', // Cho phép xuống dòng
        height: 'auto', // Tự động điều chỉnh chiều cao theo nội dung
    },
    bookAuthor: {
        fontSize: 12,
        color: '#666',
    },
    moreButton: {
        padding: 5,
        marginLeft: 10,
    },
    moreButtonText: {
        fontSize: 18,
        color: '#666',
    },
});

export default BookList;
