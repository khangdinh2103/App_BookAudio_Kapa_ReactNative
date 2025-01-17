import React, { useState, useEffect } from 'react';
import { View,ScrollView, Text, Animated, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import HeartIcon from '../../assets/components/Heart';
import Entypo from '@expo/vector-icons/Entypo';
import BookList from './BookList';
import BookListScreenAll from './BookListScreenAll';
import { Audio } from 'expo-av';
export default (props) => {
	const navigation = useNavigation();
	const route = useRoute();
    const { book, user } = route.params; 
	const chapters = book.chapter ? JSON.parse(book.chapter) : [];
	const [showAll, setShowAll] = useState(false);
	const displayedChapters = showAll ? chapters : chapters.slice(0, 3);

	const [bookInfo, setBookInfo] = useState({
		id : book.id,          // Lưu id sách
		title: book.name,      // Lưu tên sách
		author: book.author,    // Lưu tác giả sách
		image: book.imgsrc,      // Lưu ảnh sách
	  });
	return (
		<LinearGradient
    colors={[
		'#504B72', 
		'rgba(127, 122, 206, 0.9975)', 
		
    ]}
    start={{ x: 0, y: 0 }} // Điểm bắt đầu
    end={{ x: 1, y: 1 }}   // Điểm kết thúc
    style={styles.gradient}
>

		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.column2}>
						<View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                                <Ionicons name="chevron-back-outline" size={24} color="#fff" />
								
                            </TouchableOpacity>
							<View style={styles.boxImg}>
								<Image
									source = {{ uri: bookInfo.image }}
									
									style={styles.imageBook}
								/>
							</View>
							
							<View style={styles.box}>
							</View>
							<TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
							<AntDesign name="sharealt" size={24} color="#fff" />
							</TouchableOpacity>
						</View>
						<Text style={styles.text}>
							{bookInfo.title}
						</Text>
						<View style={styles.row2}>
							<Text style={styles.textAuthor}>
								{bookInfo.author}
							</Text>
							<AntDesign name="right" size={12} color="white" />
						</View>
						<View style={styles.row3}>
							<Fontisto name="star" size={13} color="white" />
							<Text style={styles.text3}>
								{"4.4 (13 dánh gia)"}
							</Text>
						</View>
						<View style={styles.column3}>
							<View style={styles.view3}>
								<View style={styles.viewHeart}>
								<HeartIcon userId={user.id} bookId={bookInfo.id} />
								</View>
								<TouchableOpacity
									onPress={() => navigation.navigate('AudioBook', { book: book })}
									>
								<View style={styles.row4}>
									<FontAwesome name="play" size={18} color="white" style={{paddingRight: 10}}/>
									
									<Text style={styles.text4}>
										{"Nghe chương đầu miễn phí"}
									</Text>
									
									
								</View>
								</TouchableOpacity>
							</View>
							
						</View>
						<View style={styles.columPrice}>
							<View style={styles.row5}>
								<Text style={styles.text5}>
									{"Giá bán lẻ:"}
								</Text>
								<Text style={styles.text6}>
									{"179.000 đ"}
								</Text>
							</View>
							<View style={styles.column5}>
								<View style={styles.column6}>
									<View style={styles.view5}>
										<View style={styles.viewButtonDk}>
										<LinearGradient
											colors={[
												'#fc4a1a', 
												'#f7b733',
												]}
												start={{ x: 0, y: 0 }} // Điểm bắt đầu
												end={{ x: 1, y: 1 }}   // Điểm kết thúc
												style={styles.gradientButton}
											>
									<Text style={{color: "#fff", textAlign: 'center',fontSize: 15, marginTop: 10,fontWeight: "bold",}}>
												Đăng ký Premium - 99.000đ
											</Text>
											</LinearGradient>
										</View>
									</View>
									<View style={styles.absoluteView}>
										<View style={styles.row6}>
											<Text style={styles.text7}>
												{"Mua với KaPa"}
											</Text>
											<Text style={styles.text8}>
												{"1 thẻ Kapa"}
											</Text>
											<Image
												source = {require('../../assets/CartBookItem/cicle.png')} 
												resizeMode = {"stretch"}
												style={styles.image9}
											/>
										</View>
									</View>
								</View>
								<View style={styles.absoluteBox}>
								</View>
								<View style={styles.absoluteColumn}>
									<Text style={styles.text9}>
										{"Số dư hiện tại: 0"}
									</Text>
									<View style={styles.row7}>
										<Image
											source = {require('../../assets/CartBookItem/kc.png')} 
											resizeMode = {"stretch"}
											style={styles.image10}
										/>
										<View style={styles.column7}>
											<View style={styles.row8}>
												<Text style={styles.text10}>
													{"Đăng Ký"}
												</Text>
												<Text style={styles.text11}>
													{"Premium"}
												</Text>
												<Text style={styles.text12}>
													{"để nhận"}
												</Text>
												<Text style={styles.text13}>
													{"1 thẻ KaPa"}
												</Text>
											</View>
											<View style={styles.row9}>
												<Text style={styles.text14}>
													{"Kapa"}
												</Text>
												<Text style={styles.text15}>
													{"Mỗi tháng chỉ từ 99.000đ"}
												</Text>
											</View>
										</View>
									</View>
								</View>
							</View>
						</View>
						
					</View>
					
					<View style={{backgroundColor: '#F3F8FC', borderRadius: 10, padding: 5, marginTop: 0, paddingTop: 40, paddingBottom: 0}}>
						<Text style={styles.text16}>
								{"Giới thiệu nội dung"}
						</Text>
						<Text style={styles.absoluteText}>
							{book.description}
						</Text>
					
					
					
					
						<TouchableOpacity>
							<View style={styles.row10}>
								<Text style={styles.text17}>
									{"Xem thêm"}
								</Text>
								<AntDesign name="down" size={15} color="black" />
							</View>
						</TouchableOpacity>
						
					
					
					<View style={styles.row11}>
						<AntDesign name="clockcircleo" size={17} style={{marginRight: 2}} color="black" />
						<Text style={styles.text18}>
							{"3 giờ"}
						</Text>
					</View>
				</View></View>
				<Text style={styles.text19}>
					{"Hội viên nói gì"}
				</Text>
				<View style={styles.row12}>
					<Image
						source = {{ uri: bookInfo.image }}
						resizeMode = {"stretch"}
						style={styles.image13}
					/>
					<View style={styles.column8}>
						<View style={styles.row13}>
							<Fontisto name="star" size={18} color="#fdbb2d" />
							<Text style={styles.text20}>
								{"4.4/5.0"}
							</Text>
						</View>
						<Text style={styles.text21}>
							{"Từ"} {book.rating}
						</Text>
					</View>
				</View>
				<View style={styles.row14}>
					<View style={styles.column9}>
						<Text style={styles.text22}>
							{"4.5/5.0"}
						</Text>
						<Text style={styles.text23}>
							{"Nội dung"}
						</Text>
					</View>
					<View style={styles.box2}>
					</View>
					<View style={styles.column9}>
						<Text style={styles.text22}>
							{"4.5/5.0"}
						</Text>
						<Text style={styles.text21}>
							{"Giọng đọc"}
						</Text>
					</View>
				</View>
				<View style={styles.column10}>
					<Text style={styles.text24}>
						{"Khang Đinh"}
					</Text>
					<View style={styles.row15}>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
					</View>
					<Text style={styles.text25}>
						{"Rất hay"}
					</Text>
					<Text style={styles.text26}>
						{"Sách giúp tôi có cách nhìn khác về lợi ích của sách cũng như xem sách là bạn chứ không phải 1 công cụ"}
					</Text>
					<View style={styles.row16}>
						<Text style={styles.text27}>
							{"5.0 Nội dung"}
						</Text>
						<Text style={styles.text28}>
							{"4.0 Giọng đọc"}
						</Text>
					</View>
					<View style={styles.row17}>
						<View style={styles.view7}>
						<AntDesign name="like2" size={15} color="black" />
						</View>
						<Text style={styles.text29}>
							{"2 ngày trước"}
						</Text>
					</View>
				</View>
				<View style={styles.column10}>
					<Text style={styles.text24}>
						{"Khang Đinh"}
					</Text>
					<View style={styles.row15}>
					<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
						<Fontisto name="star" size={15} color="#fdbb2d" style={{marginRight: 2}}/>
					</View>
					<Text style={styles.text25}>
						{"Rất hay"}
					</Text>
					<Text style={styles.text26}>
						{"Sách giúp tôi có cách nhìn khác về lợi ích của sách cũng như xem sách là bạn chứ không phải 1 công cụ"}
					</Text>
					<View style={styles.row16}>
						<Text style={styles.text27}>
							{"5.0 Nội dung"}
						</Text>
						<Text style={styles.text28}>
							{"4.0 Giọng đọc"}
						</Text>
					</View>
					<View style={styles.row17}>
						<View style={styles.view7}>
							<AntDesign name="like2" size={15} color="black" />
						</View>
						<Text style={styles.text29}>
							{"2 ngày trước"}
						</Text>
					</View>
				</View>
				<TouchableOpacity>
					<View style={styles.view8}>
						<Text style={styles.text30}>
							{"Xem tất cả 6 đánh giá >"}
						</Text>
					</View>
				</TouchableOpacity>
				
				<View style={styles.box3}>
				</View>
				<View style={styles.contentContainer}>
				<View style={styles.container}>
				<Text style={styles.text31}>{"Mục lục"}</Text>
				<Text style={styles.text32}>{"MIỄN PHÍ CHƯƠNG I"}</Text>

				{displayedChapters.map((chapter, index) => (
					<View key={index}>
					<View style={styles.row18}>
						<Text style={styles.text33}>{chapter.title}</Text>
						<TouchableOpacity
						onPress={() => navigation.navigate('AudioBook', { book: book, chapter })}
						>
						<View style={styles.view9}>
							<Entypo name="controller-play" size={24} color="white" />
						</View>
						</TouchableOpacity>
					</View>
					<Text style={styles.text34}>{chapter.description}</Text>
					</View>
				))}

				<TouchableOpacity onPress={() => setShowAll(!showAll)}>
					<View style={styles.row19}>
					<Text style={styles.text36}>
						{showAll ? "Thu gọn" : `Xem tất cả ${chapters.length} chương`}
					</Text>
					<AntDesign
						name={showAll ? "up" : "down"}
						size={15}
						color="#EF9D83"
					/>
					</View>
				</TouchableOpacity>
				</View>

				<View style={styles.box3}></View>
				<View style={styles.column11}>
					<TouchableOpacity
					 onPress={() => navigation.navigate('BookListScreenAll', { title: 'Sách tương tự' })}
					>
					<View style={styles.row20}>
						<Text style={styles.text37}>
							{"Sách tương tự"}
						</Text>
						<AntDesign name="right" size={20} color="black" style={{marginRight: 5}} />
						
					</View>
					</TouchableOpacity>
					
					<BookList/>
				</View>
				</View>
			</ScrollView>
			
		</SafeAreaView>
		</LinearGradient>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradient: {
        flex: 1, 

    },
	gradientButton: {
        flex: 1, 
		borderRadius: 10,
		height: 40,

    },
	headerbox: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#878787',

    },
	
	absoluteColumn: {
		position: "absolute",
		top: 51,
		right: 0,
		width: 341,
		height: 98,
		backgroundColor: "#00000000",
		paddingHorizontal: 21,
	},
	contentContainer: {
		backgroundColor: '#fff', // Nền trắng
		paddingVertical: 20,      // Khoảng cách trên dưới cho nội dung
		borderTopLeftRadius: 10,  // Bo góc trên trái (tùy chọn)
		borderTopRightRadius: 10, // Bo góc trên phải (tùy chọn)
	  },
	absoluteText: {
		
		color: "#919BAE",
		colorBackground: "#F3F8FC",
		fontSize: 15,
		fontWeight: "bold",
		width: 'auto',
		paddingHorizontal: 21,
		paddingBottom: 10,

	},
	absoluteView: {
		position: "absolute",
		top: 1,
		left: 0,
		width: 340,
		height: 53,
		backgroundColor: "#00000000",
		borderRadius: 10,
		paddingHorizontal: 21,
	},
	
	box2: {
		width: 1,
		height: 50,
		backgroundColor: "#D9D9D9",
	},
	box3: {
		height: 2,
		backgroundColor: "#D9D9D9",
		marginBottom: 31,
		marginHorizontal: 21,
	},
	box4: {
		width: 79,
		height: 20,
		backgroundColor: "#EE9A81",
		marginHorizontal: 42,
	},
	column: {
		marginBottom: 100,
	},
	column2: {
		backgroundColor: "#00000000",
		paddingTop: 63,
		paddingBottom: 39,
	},
	column3: {
		alignItems: "flex-start",
		marginBottom: 11,
	},
	columPrice: {
		marginTop: 20,
		backgroundColor: "#D9D9D9",
		paddingTop: 31,
		borderRadius: 10,
		paddingBottom: 10,
		marginBottom: 50,
		marginHorizontal: 15,
	},
	column5: {
		marginHorizontal: 7,
		
	},
	column6: {
		marginHorizontal: 4,
		paddingBottom: 7,
	},
	column7: {
		flex: 1,
	},
	column8: {
		width: 260,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingVertical: 35,
		paddingHorizontal: 69,
	},
	column9: {
		width: 68,
	},
	column10: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		paddingTop: 19,
		paddingBottom: 30,
		paddingHorizontal: 30,
		marginBottom: 22,
		marginHorizontal: 14,
		shadowColor: "#00000040",
		shadowOpacity: 0.3,
		shadowOffset: {
		    width: 0,
		    height: 4
		},
		shadowRadius: 4,
		elevation: 4,
	},
	column11: {
		alignItems: "flex-start",
		marginBottom: 37,
		marginHorizontal: 3,
	},
	column12: {
		backgroundColor: "#007280FA",
		borderRadius: 20,
		paddingTop: 16,
		paddingBottom: 34,
		paddingRight: 31,
	},
	image: {
		height: 17,
		marginTop: 5,
	},
	boxImg: {
		shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.35, 
        shadowRadius: 6,
        // Đổ bóng trên Android
        elevation: 8,
		
	},
	imageBook: {
		borderRadius: 15,
		width: 146,
		height: 216,
		alignSelf: "center",
		marginHorizontal: '19%',
		shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.35, 
        shadowRadius: 6,
        // Đổ bóng trên Android
        elevation: 8,
	},
	image3: {
		height: 15,
		marginTop: 7,
	},
	image4: {
		width: 7,
		height: 11,
	},
	image5: {
		width: 13,
		height: 12,
		marginRight: 8,
	},
	image6: {
		width: 15,
		height: 17,
		marginRight: 9,
	},
	image7: {
		width: 32,
		height: 32,
		marginTop: 13,
	},
	image8: {
		borderRadius: 22,
		height: 52,
		marginTop: 4,
	},
	image9: {
		borderRadius: 10,
		width: 21,
		height: 21,
	},
	image10: {
		borderRadius: 18,
		width: 37,
		height: 37,
		marginRight: 14,
	},
	image11: {
		width: 11,
		height: 7,
	},
	image12: {
		width: 18,
		height: 18,
		marginRight: 10,
	},
	image13: {
		borderRadius: 8,
		width: 90,
		height: 120,
	},
	image14: {
		width: 11,
		height: 12,
		marginRight: 5,
	},
	image15: {
		width: 11,
		height: 12,
	},
	image16: {
		height: 13,
		marginTop: 4,
	},
	image17: {
		height: 24,
		marginTop: 3,
	},
	image18: {
		width: 8,
		height: 13,
	},
	image19: {
		borderRadius: 16,
		width: 117,
		height: 173,
		marginHorizontal: 17,
	},
	image20: {
		borderRadius: 16,
		width: 117,
		height: 173,
		marginTop: -4,
		marginHorizontal: 138,
	},
	image21: {
		borderRadius: 17,
		width: 117,
		height: 175,
		marginTop: -4,
	},
	image22: {
		width: 25,
		height: 28,
	},
	image23: {
		width: 18,
		height: 23,
		marginRight: 79,
	},
	image24: {
		width: 25,
		height: 25,
		marginRight: 74,
	},
	image25: {
		width: 19,
		height: 24,
	},
	image26: {
		width: 8,
		height: 8,
		marginLeft: 348,
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 34,
		marginHorizontal: 17,
		marginTop: -50,
	},
	row2: {
		flexDirection: "row",
		width: 150,
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
		marginHorizontal: 120,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		marginHorizontal: 130,
	},
	row4: {
		flexDirection: "row",
		width: 300,
		alignItems: "center",
		backgroundColor: "#64798F",
		borderColor: "#5B738A",
		borderRadius: 23,
		borderWidth: 2,
		paddingVertical: 18,
		paddingHorizontal: 54,
		marginTop: 4,
		shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 6,
        // Đổ bóng trên Android
        elevation: 8,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 11,
		marginHorizontal: 23,
	},
	row6: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 17,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
	},
	row8: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
	},
	row9: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 2,
	},
	row10: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 27,
		marginHorizontal: 20,
	},
	row11: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 44,
		marginHorizontal: 20,
	},
	row12: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 23,
		marginHorizontal: 7,
	},
	row13: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	row14: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingVertical: 20,
		paddingHorizontal: 51,
		marginBottom: 37,
		marginHorizontal: 14,
	},
	row15: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	row16: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 14,
	},
	row17: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	row18: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 9,
		marginHorizontal: 26,
	},
	row19: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 23,
		marginHorizontal: 113,
	},
	row20: {
		width: 390,
		height: 'auto',
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#00000000",
		paddingVertical: 19,
		paddingHorizontal: 17,
	},
	row21: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
		marginLeft: 40,
	},
	scrollView: {
		flex: 1,
	},
	text: {
		color: "#ffff",
		fontSize: 19,
		fontWeight: "bold",
		marginBottom: 16,
		paddingHorizontal: 20,
		textAlign: "center",
		alignItems: "center",
		width: "100%",
	},
	textAuthor: {
		color: "#ffff",
		fontSize: 12,
		fontWeight: "bold",
	},
	text3: {
		color: "#CBD4DB",
		fontSize: 12,
		marginLeft: 5,
		flex: 1,
		alignItems: "center",
	},
	text4: {
		color: "#E0E5E9",
		fontSize: 12,
		fontWeight: "bold",
		flex: 1,
	},
	text5: {
		color: "#919BAE",
		fontSize: 15,
		fontWeight: "bold",
		marginRight: 4,
		flex: 1,
	},
	text6: {
		color: "#8895AA",
		fontSize: 15,
		fontWeight: "bold",
	},
	text7: {
		color: "#5B667A",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 4,
		flex: 1,
	},
	text8: {
		color: "#EF9D83",
		fontSize: 13,
		fontWeight: "bold",
		marginRight: 29,
	},
	text9: {
		color: "#3D4C67",
		fontSize: 13,
		fontWeight: "bold",
		marginTop: 22,
		marginBottom: 15,
	},
	text10: {
		color: "#8C97A9",
		fontSize: 12,
		fontWeight: "bold",
	},
	text11: {
		color: "#3B4C66",
		fontSize: 11,
		fontWeight: "bold",
	},
	text12: {
		color: "#8E99A9",
		fontSize: 12,
		fontWeight: "bold",
	},
	text13: {
		color: "#F0A18A",
		fontSize: 11,
		fontWeight: "bold",
	},
	text14: {
		color: "#EE9A81",
		fontSize: 11,
		fontWeight: "bold",
		marginRight: 17,
	},
	text15: {
		color: "#8F99AB",
		fontSize: 12,
		fontWeight: "bold",
		flex: 1,
	},
	text16: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 23,
		marginBottom: 20,
	},
	text17: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 9,
	},
	text18: {
		color: "#868686",
		fontSize: 13,
		flex: 1,
	},
	text19: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 24,
		marginLeft: 16,
	},
	text20: {
		marginLeft: 5,
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		flex: 1,
	},
	text21: {
		color: "#868686",
		fontSize: 12,
		fontWeight: "bold",
	},
	text22: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 6,
	},
	text23: {
		color: "#868686",
		fontSize: 13,
		fontWeight: "bold",
		marginLeft: 5,
	},
	text24: {
		color: "#677185",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 14,
	},
	text25: {
		color: "#000000",
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 13,
	},
	text26: {
		color: "#000000",
		fontSize: 13,
		marginBottom: 26,
		width: 302,
	},
	text27: {
		color: "#000000",
		fontSize: 13,
		marginRight: 39,
	},
	text28: {
		color: "#000000",
		fontSize: 13,
		flex: 1,
	},
	text29: {
		color: "#868686",
		fontSize: 12,
		marginTop: 12,
	},
	text30: {
		color: "#000000",
		fontSize: 13,
	},
	text31: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 14,
		marginLeft: 27,
	},
	text32: {
		color: "#EF9D83",
		fontSize: 13,
		fontWeight: "bold",
		marginBottom: 9,
		marginLeft: 26,
	},
	text33: {
		width: 290,
		color: "#000000",
		fontSize: 15,
		fontWeight: "bold",
	},
	text34: {
		width: 302,
		color: "#868686",
		fontSize: 13,
		marginBottom: 22,
		marginLeft: 27,
	},
	text35: {
		color: "#868686",
		fontSize: 13,
		marginBottom: 28,
		marginLeft: 27,
	},
	text36: {
		color: "#EF9D83",
		fontSize: 13,
		fontWeight: "bold",
	},
	text37: {
		color: "#334562",
		fontSize: 19,
		fontWeight: "bold",
	},
	view: {
		width: 27,
		backgroundColor: "#868686",
		borderRadius: 20,
		paddingHorizontal: 8,
		marginRight: 65,
	},
	view2: {
		width: 27,
		backgroundColor: "#868686",
		borderRadius: 20,
		paddingHorizontal: 5,
	},
	view3: {
		flexDirection: "row",
		alignItems: "center",

		backgroundColor: "#00000000",
		paddingHorizontal: 4,
		marginHorizontal: 14,
	},
	// viewHeart: {
	// 	padding: 5,
	// 	borderRadius: 25,
	// 	borderWidth: 1,
	// 	borderColor: "#fff",
	// 	marginRight: 10,
	// },
	view5: {
		backgroundColor: "#FEF6E9",
		borderRadius: 10,
		paddingHorizontal: 1,
	},
	viewButtonDk: {
		backgroundColor: "#00000000",
		paddingHorizontal: 5,
		marginTop: 153,
	},
	view7: {
		width: 'auto',
		backgroundColor: "#FFFFFF",
		borderColor: "#D9D9D9",
		borderRadius: 15,
		borderWidth: 1,
		paddingHorizontal: 6,
		marginRight: 207,
	},
	view8: {
		alignItems: "center",
		backgroundColor: "#D9D9D9",
		borderRadius: 20,
		paddingVertical: 19,
		marginBottom: 25,
		marginHorizontal: 14,
		shadowColor: "#00000040",
		shadowOpacity: 0.3,
		shadowOffset: {
		    width: 0,
		    height: 4
		},
		shadowRadius: 4,
		elevation: 4,
	},
	view9: {
		width: 30,
		backgroundColor: "#F1A367",
		borderRadius: 25,
		paddingHorizontal: 4,
	},
});