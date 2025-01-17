import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ItemBook({ url, title, author, textbook }) {
    
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 400,
            height: 180,
            borderRadius: 20,
        }}>
            <View style={{ height: '80%', width: '30%' }}>
                <Image source={{ uri: url }} style={{ width: 100, height: 150, borderRadius: 10 }} />
            </View>
            <View style={{ justifyContent: 'flex-start', height: '80%', width: '50%' }}>
                <Text numberOfLines={3} style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 15 }}>{title}</Text>
                <Text style={{ fontSize: 16, color: '#555', marginTop: 5 }}>{author}</Text>
                {textbook ? (
                    <Text style={{ marginTop: 30 }}>{textbook}</Text>
                ) : null}
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
        </View>
    );
}

export default ItemBook;
