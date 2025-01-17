import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ItemBookrank({ url, title, textbook, author, rank }) {
    // Xác định hình ảnh hoặc số thứ hạng
    const rankImage =
        rank === 1
            ? require('../../assets/rank/top1.png')
            : rank === 2
            ? require('../../assets/rank/top2.png')
            : rank === 3
            ? require('../../assets/rank/top3.png')
            : null;

    return (
        <View style={styles.container}>
            {/* Ảnh thứ hạng hoặc số thứ tự */}
            <View style={styles.rankContainer}>
                {rankImage ? (
                    <Image source={rankImage} style={styles.rankImage} />
                ) : (
                    <View style={styles.rankCircle}>
                        <Text style={styles.rankText}>{rank}</Text>
                    </View>
                )}
            </View>

            {/* Hình ảnh sách */}
            <View style={styles.bookImageContainer}>
                <Image source={{ uri: url }} style={styles.bookImage} />
            </View>

            {/* Thông tin sách */}
            <View style={styles.bookInfo}>
                <Text numberOfLines={3} style={styles.bookTitle}>
                    {title}
                </Text>
                <Text style={styles.bookAuthor}> {author}</Text>
            </View>

            {/* Icon điều hướng */}
            <Ionicons name="ellipsis-horizontal" size={20} color="#333" style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        elevation: 2,
    },
    rankContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        width: 45,
        height: 45,
    },
    rankImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    rankCircle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    bookImageContainer: {
        width: 100,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 15,
    },
    bookImage: {
        width: '100%',
        height: '100%',
    },
    bookInfo: {
        width: '45%',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    textbook: {
        fontSize: 13,
        color: '#999',
    },
    icon: {
        paddingRight: 4,
        paddingLeft: 8,
    },
});

export default ItemBookrank;
