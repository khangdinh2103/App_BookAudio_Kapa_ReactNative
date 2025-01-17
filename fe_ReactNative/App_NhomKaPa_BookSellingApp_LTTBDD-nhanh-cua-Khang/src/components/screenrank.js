import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import ItemBookrank from './ItemBookrank';

export default class ScreenRank extends Component {
    
    constructor(props) {
        super(props);
        const { user } = props.route.params;
        this.state = {
            books: [],
            loading: true,
            error: null,
            user: user,

        };
    }

    // Hàm fetch danh sách sách từ API
    fetchBookList = async () => {
        try {
            const response = await axios.get('http://192.168.1.8:3000/api/v1/books');
            this.setState({ books: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching books:', error);
            this.setState({ error: 'Failed to fetch books.', loading: false });
        }
    };

    componentDidMount() {
        this.fetchBookList();
    }

    render() {
        const { books, loading, error, user } = this.state;
        const { navigation } = this.props;
        console.log('User in CartBookItem:', user);

        return (
            <SafeAreaView style={styles.container}>
                {/* Header */}
                 
                <View style={{ gap: 10, paddingLeft: 0, paddingBottom: 20, paddingTop:17 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 14, paddingLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                                <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bảng xếp hạng</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>Top sách nói thịnh hành</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Nội dung */}
                 <View style={styles.content}>
                        {loading ? (
                            <Text style={styles.loadingText}>Đang tải...</Text>
                        ) : error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : (
                            books.map((item, index) => (
                                <TouchableOpacity key={item.id} style={{ marginTop: 25 }}
                                onPress={() => navigation.navigate('CartBookItem', { book: item, user })}
                                >
                                    <ItemBookrank
                                        url={item.imgsrc}
                                        title={item.name}
                                        author={item.author}
                                        rank={index + 1}
                                    />
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b6b7f7',
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
    headerTitle: {
        paddingLeft: 19,
        paddingTop: 0,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        paddingLeft: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        paddingBottom: 200,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    loadingText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#ff0000',
    },
    scrollViewContent: {
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
