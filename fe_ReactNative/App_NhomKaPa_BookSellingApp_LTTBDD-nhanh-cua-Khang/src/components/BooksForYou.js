import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const data = [
  { id: '1', name: 'Giao Tiếp Với Thiên Nhiên',author: 'Khang Dinh', imgsrc:'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F1268ac50-e8d2-11ee-ad4f-f39af80689d7%2FcoverImage%2F1711169944469_2x.webp&w=640&q=75', audioSrc: 'https://audio.transistor.fm/m/shows/21811/442cc0e3ea275c002d29ee93a5dd1445.mp3' },
  { id: '2', name: 'Osho: Cuộc sống & Chân lý',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2Fcc150f50-e692-11ee-8e11-77483981a95e%2FcoverImage%2F1710922865861_3x.webp&w=640&q=75',  audioSrc: 'https://media.transistor.fm/7e925c11/aeebcc4a.mp3' },
  { id: '3', name: 'Trải Nghiệm Khách Hàng',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F21694ea0-e691-11ee-8e11-77483981a95e%2FcoverImage%2F1710922150027_3x.webp&w=640&q=75',  audioSrc: 'https://media.transistor.fm/e4da04fc/4d9f6ae5.mp3' },
  { id: '4', name: 'Sức Mạnh Của Sự Tĩnh Lặng',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F06ba1570-db5e-11ec-abf0-1b80896d4f94%2FcoverImage%2F1653395742791_3x.webp&w=1200&q=75',  audioSrc: 'https://audio.transistor.fm/m/shows/21811/442cc0e3ea275c002d29ee93a5dd1445.mp3' },
  { id: '5', name: 'Người đàn bà trong tôi',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F771304f0-eb45-11ee-a458-7dbd877b160d%2FcoverImage%2F1711439407807_3x.webp&w=1200&q=75',  audioSrc: 'https://media.transistor.fm/7e925c11/aeebcc4a.mp3' },
  { id: '6', name: 'Giao Tiếp Với Thiên Nhiên',author: 'Khang Dinh', imgsrc:'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F1268ac50-e8d2-11ee-ad4f-f39af80689d7%2FcoverImage%2F1711169944469_2x.webp&w=640&q=75', audioSrc: 'https://audio.transistor.fm/m/shows/21811/442cc0e3ea275c002d29ee93a5dd1445.mp3' },
  { id: '7', name: 'Osho: Cuộc sống & Chân lý',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2Fcc150f50-e692-11ee-8e11-77483981a95e%2FcoverImage%2F1710922865861_3x.webp&w=640&q=75',  audioSrc: 'https://media.transistor.fm/7e925c11/aeebcc4a.mp3' },
  { id: '8', name: 'Trải Nghiệm Khách Hàng',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F21694ea0-e691-11ee-8e11-77483981a95e%2FcoverImage%2F1710922150027_3x.webp&w=640&q=75',  audioSrc: 'https://media.transistor.fm/e4da04fc/4d9f6ae5.mp3' },
  { id: '9', name: 'Sức Mạnh Của Sự Tĩnh Lặng',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F06ba1570-db5e-11ec-abf0-1b80896d4f94%2FcoverImage%2F1653395742791_3x.webp&w=1200&q=75',  audioSrc: 'https://audio.transistor.fm/m/shows/21811/442cc0e3ea275c002d29ee93a5dd1445.mp3' },
  { id: '10', name: 'Người đàn bà trong tôi',author: 'Khang Dinh', imgsrc: 'https://fonos.vn/_next/image?url=https%3A%2F%2Ffonos-cdn.azureedge.net%2Fbooks%2F771304f0-eb45-11ee-a458-7dbd877b160d%2FcoverImage%2F1711439407807_3x.webp&w=1200&q=75',  audioSrc: 'https://media.transistor.fm/7e925c11/aeebcc4a.mp3' },

]

// Chia dữ liệu thành các nhóm 3 sách
const groupData = (data) => {
  const grouped = [];
  for (let i = 0; i < data.length; i += 2) {
    grouped.push(data.slice(i, i + 2));
  }
  return grouped;
};

const BookItem = ({ name, author, imgsrc, onPress }) => (
  <View style={styles.bookItem}>
    <TouchableOpacity onPress={onPress}>
    

    <Image source={{uri: imgsrc }} style={styles.bookImage} />
    <View style={styles.tag}>
        <Text style={styles.tagText} >1 THẺ KAPA</Text>
    </View>
    </TouchableOpacity>
  </View>
);

const BookColumn = ({ books, user }) => {
    const navigation = useNavigation(); // Sử dụng useNavigation để lấy navigation
  
    return (
      <View style={styles.bookColumn}>
        {books.map((book) => (
          <BookItem
            key={book.id}
            name={book.name}
            author={book.author}
            imgsrc={book.imgsrc}
            onPress={() => navigation.navigate('CartBookItem', { book, user })} // Chuyển hướng khi ấn vào sách
          />
        ))}
      </View>
    );
  };

const BooksForYou = (user) => {
  const groupedData = groupData(data);

  return (
    <FlatList
      data={groupedData}
      renderItem={({ item }) => <BookColumn books={item} user={user} />}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tag: {
    backgroundColor: '#FFB74D',
    position: 'absolute',
    borderRadius: 4,
    bottom: -12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'center',
    marginBottom: 5,
},
tagText: {
    color: 'brown',
    fontSize: 12,
    fontWeight: 'bold',
},
  bookColumn: {
    marginRight: 15,
  },
  bookItem: {
    width: 120,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8, // Bo góc để bóng trông tự nhiên hơn
    // Đổ bóng trên iOS
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6,
    // Đổ bóng trên Android
    elevation: 8,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  bookAuthor: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
 
});

export default BooksForYou;
