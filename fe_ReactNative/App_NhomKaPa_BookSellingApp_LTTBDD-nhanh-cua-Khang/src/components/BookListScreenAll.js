import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const books = [
  { id: '1', name: 'Giao Tiếp Với Thiên Nhiên',author: 'Khang Dinh', imgsrc:'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F1268ac50-e8d2-11ee-ad4f-f39af80689d7%2FcoverImage%2F1711169944469_2x.webp&w=640&q=75', audioSrc: 'https://audio.transistor.fm/m/shows/21811/442cc0e3ea275c002d29ee93a5dd1445.mp3' },
  { id: '2', name: 'Osho: Cuộc sống & Chân lý',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2Fcc150f50-e692-11ee-8e11-77483981a95e%2FcoverImage%2F1710922865861_3x.webp&w=640&q=75',  audioSrc: 'https://media.transistor.fm/7e925c11/aeebcc4a.mp3' },
  { id: '3', name: 'Trải Nghiệm Khách Hàng',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F21694ea0-e691-11ee-8e11-77483981a95e%2FcoverImage%2F1710922150027_3x.webp&w=640&q=75',  audioSrc: 'https://media.transistor.fm/e4da04fc/4d9f6ae5.mp3' },
  { id: '4', name: 'Sức Mạnh Của Sự Tĩnh Lặng',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F06ba1570-db5e-11ec-abf0-1b80896d4f94%2FcoverImage%2F1653395742791_3x.webp&w=1200&q=75',  audioSrc: 'https://audio.transistor.fm/m/shows/21811/442cc0e3ea275c002d29ee93a5dd1445.mp3' },
  { id: '5', name: 'Người đàn bà trong tôi',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F771304f0-eb45-11ee-a458-7dbd877b160d%2FcoverImage%2F1711439407807_3x.webp&w=1200&q=75',  audioSrc: 'https://media.transistor.fm/7e925c11/aeebcc4a.mp3' },

];

export default function LibraryScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { title } = route.params || {};
    const renderItem = ({ item }) => (
      <TouchableOpacity
      onPress={() => navigation.navigate('AudioBook', { book: item })}
      >
          <View style={styles.itemContainer}>
          <Image source={{uri: item.imgsrc}} style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </View>
          <TouchableOpacity style={styles.moreIcon}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{title || 'Thư viện'}</Text>
            </View>

            {/* Book List */}
            <ScrollView style={{paddingTop: 10}}>
                <View style={styles.bookListContainer}>
                    <View style={styles.filterSortRow}>
                        <Text style={styles.filterText}>Tất cả ({books.length})</Text>
                        <TouchableOpacity>
                            <Text style={styles.sortText}>Sắp xếp</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    />
                </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b6b7f7'
    },
    header: {
      height: 140,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerbox: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#878787',
        opacity: 0.8,
    },
    headerText: {
        paddingLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    filterSortRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    filterText: {
        fontSize: 16,
        fontWeight: '600',
    },
    sortText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4a90e2',
    },
    bookListContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    bookImage: {
        width: 90,
        height: 120,
        borderRadius: 4,
        marginRight: 15,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    moreIcon: {
        padding: 5,
    },
});
