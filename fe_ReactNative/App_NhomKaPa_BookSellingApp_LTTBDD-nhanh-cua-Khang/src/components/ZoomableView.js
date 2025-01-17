import React, { useRef } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image } from 'react-native';

function ZoomableView({ image, title }) {

    const scaleValue = useRef(new Animated.Value(1)).current;


    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 1.5,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    };


    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}   >
                <Animated.View style={[styles.box, { transform: [{ scale: scaleValue }] }]}>

                    <Image source={image} style={styles.bookImage} />
                    <Text style={styles.bookTitle}>{title}</Text>

                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ecdaf0",

        borderRadius: 10,

    },
    box: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        backgroundColor: "#ecdaf0",
        alignItems: 'center',
        borderRadius: 10,
    },

    bookCard: {
        backgroundColor: "#ecdaf0",
        marginRight: 16,
    },
    bookImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    bookTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default ZoomableView;
