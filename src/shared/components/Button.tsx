// UI: builds reusable buttons
// ================================================================================================

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Button;