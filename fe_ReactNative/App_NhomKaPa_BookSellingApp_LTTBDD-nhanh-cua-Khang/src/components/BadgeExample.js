import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BadgeExample() {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Mới & Hot</Text>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>1</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ưu đãi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    button: {
        backgroundColor: 'rgba(204, 204, 204, 0.2)',
        borderColor: "rgba(204, 204, 204, 0.7)",
        borderWidth: 1, // Đặt màu nền thành trong suốt
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 16,
        height: 40,
        position: 'relative',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        opacity: 1, // Giữ nguyên độ mờ cho chữ
      },
    badge: {
        position: 'absolute',
        right: -10,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
