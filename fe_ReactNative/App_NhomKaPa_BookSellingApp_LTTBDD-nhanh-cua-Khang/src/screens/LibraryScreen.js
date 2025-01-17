import React, { useState, useEffect }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItemBook from '../components/ItemBook';
import axios from 'axios';

export default function LibraryScreen() {
    const [books, setBooks] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    
    const { user } = route.params;

    const fetchBookList = async () => {
        if (!user?.id) {
            console.error('User ID is missing.');
            return;
        }
        try {
            const response = await axios.get(`http://172.20.10.2:5000/api/v1/userbook/userId?userId=${user.id}`);
            const transformedBooks = response.data.map(item => ({
                name: item['book.name'],
                author: item['book.author'],
                rating: item['book.rating'],
                description: item['book.description'],
                genre: item['book.genre'],
                durating: item['book.durating'],
                imgsrc: item['book.imgsrc'],
                audioSrc: item['book.audioSrc'],
                chapter: JSON.parse(item['book.chapter']),
                numericRating: null // Bạn có thể tính toán numericRating nếu cần
            }));
            setBooks(transformedBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBookList();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                                <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                <Text style={styles.headerText}>Thư viện</Text>
                
            </View>

            

            {/* Book List */}
            <ScrollView>
            <View style={styles.bookListContainer}>
                <View style={styles.filterSortRow}>
                <Text style={styles.filterText}>Tất cả ({books.length})</Text>
                <TouchableOpacity>
                    <Text style={styles.sortText}>Sắp xếp</Text>
                </TouchableOpacity>
                </View>

                {books.map((item) => (
                <TouchableOpacity 
                    key={item.id}
                    onPress={() => navigation.navigate('AudioBook', { book: item })}
                    style={styles.bookItem}
                >
                    <ItemBook url={item.imgsrc} title={item.name} author={item.author} />
                </TouchableOpacity>
                ))}
            </View>
            </ScrollView>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b6b7f7',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 15,
    },
    headerbox: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#878787',
        //thêm độ trong suất cho background
        opacity: 0.8,

    },
    headerText: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 15,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
   
    filterSortRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
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
        marginTop: 30,
        paddingBottom: 500,
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
    },
    bookItem: {
        marginTop: 20,
    },
    flatListContent: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});
