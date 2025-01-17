import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimerDialog() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    // Hiển thị hoặc ẩn modal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Cập nhật thời gian khi người dùng chọn trên picker
    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowPicker(false);
        setTime(currentTime);
    };

    return (
        <View style={styles.container}>
            <Button title="Chọn hẹn giờ" onPress={toggleModal} />

            {/* Modal Dialog */}
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Chọn thời gian hẹn giờ</Text>

                    {/* Hiển thị thời gian đã chọn */}
                    <Text style={styles.timeText}>
                        {`Giờ đã chọn: ${time.getHours()}:${time.getMinutes()}`}
                    </Text>

                    {/* Nút mở DateTimePicker */}
                    <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
                        <Text style={styles.buttonText}>Chọn thời gian</Text>
                    </TouchableOpacity>

                    {/* Hiển thị picker chọn giờ */}
                    {showPicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}

                    {/* Nút đóng Dialog */}
                    <TouchableOpacity style={styles.button} onPress={toggleModal}>
                        <Text style={styles.buttonText}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#3A6FB1',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
