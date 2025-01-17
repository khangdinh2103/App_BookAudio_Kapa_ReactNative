import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import ItemBookrank from '../components/ItemBookrank';
import ItemBook from '../components/ItemBook';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookList from '../components/BookList';
import { LinearGradient } from 'expo-linear-gradient';


export default function Search({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const route = useRoute();
  const { user } = route.params;

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await axios.get('http://172.20.10.2:5000/api/v1/book/all');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books.');
        setLoading(false);
      }
    };

    fetchBookList();
  }, []);

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://172.20.10.2:5000/api/v1/book/search?name=${query}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setSearchResults([]);
    }
  };

  return (
    <LinearGradient
      colors={[
        '#504B72',
        'rgba(127, 122, 206, 0.9975)',
        'rgba(152, 153, 244, 0.995)',
        'rgba(178, 184, 249, 0.9925)',
        '#FBFBFB',
        'rgba(254, 254, 254, 0.99)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.logo}>Tìm kiếm</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => navigation.navigate('Account', {user}) }
                    >
              <Image
                style={styles.profile}
                source={require("../../assets/BookScreen/profile.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={24} color="#757575" style={styles.searchIcon} />
            <TextInput
              placeholder="Tìm tên sách, tác giả, mentor..."
              style={styles.input}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                fetchSearchResults(text);
              }}
            />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
           
            {searchText && searchResults.length === 0 && (
               <>
               <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
              
              <Text style={{ textAlign: 'center', color: '#757575', width:370, height: 400 }}>Không tìm thấy kết quả.</Text>
           
               </>
                )}
            {searchText && searchResults.map((item, index) => (
              <>
              
                <TouchableOpacity
                key={item.id}
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate('CartBookItem', { book: item, user })}
              >
                <ItemBook
                  url={item.imgsrc}
                  title={item.name}
                  author={item.author}
                />
              </TouchableOpacity>
              </>

            ))}
            {!searchText && (
              <>
                <Text style={styles.sectionTitle}>Sách hot mới ra mắt</Text>
                <BookList user={user} />
                <Text style={styles.sectionTitle}>Tìm kiếm nhiều nhất</Text>
                {!loading && !error &&
                  books.map((item, index) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{ marginTop: 25 }}
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
                }
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  gradient: {
    flex: 1, 

},
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 15,
  paddingTop: 30,
  marginBottom: 10,
  // backgroundColor: '#6200ee',
},
logo: {
 
color: "#E3E7EB",
fontSize: 20,
fontWeight: "bold",
  marginLeft: 10,

},
profile: {
  height: 60,
  width: 60,
  borderRadius: 14,
  padding: 10,
},

searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 8,
  paddingHorizontal: 17,
  marginHorizontal: 16,
  paddingVertical: 5,
  backgroundColor: '#FFF',
  marginBottom: 16,
},
searchIcon: {
  marginRight: 8, // Khoảng cách giữa biểu tượng và TextInput
},
input: {
  flex: 1,
  paddingVertical: 8,
  fontSize: 16,
},
  sectionTitle: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  bookItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#757575',
  },
  scrollViewContent: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
content: {
  paddingBottom: 200,
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
});
