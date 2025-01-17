import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Login from './Login';

export default function AccountScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const { user } = route.params;
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerbox}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={styles.userInfoContainer}>
                <View style={styles.avatarContainer}>
                    <Image source={ require('../../assets/BookScreen/profile.png')} style={styles.avatar} />
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userInfoText}>Thông tin cá nhân </Text>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
                <MenuItem icon="credit-card" text="Thanh toán" />
                <MenuItem icon="shield" text="Chính sách & bảo mật" />
                <MenuItem icon="info-circle" text="Về chúng tôi" />
                <MenuItem icon="question-circle" text="Hỗ trợ" />
                <MenuItem icon="cog" text="Cài đặt" />
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Login')}
                    style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function MenuItem({ icon, text }) {
    return (
        <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name={icon} size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b6b7f7',
    },
    header: {
        paddingTop: 40,
        paddingLeft: 10,
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
    userInfoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarContainer: {
        backgroundColor: '#eee',
        borderRadius: 100,
        padding: 5,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    userInfoText: {
        fontSize: 16,
        color: '#eee',
    },
    menuContainer: {
        marginTop: 45,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
    },
    menuItem: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuIcon: {
        marginRight: 10,
    },
    menuText: {
        fontSize: 18,
        color: '#333',
    },
    logoutButton: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 18,
        paddingVertical: 5,
        paddingBottom: 30,
        color: '#e74c3c',
    },
});
