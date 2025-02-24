// It creates a user profile page with user info
// ================================================================================================

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../shared/context/AuthContext';
import Button from '../../shared/components/Button'; //??? SEE IF WE CAN LOAD MULTIPLE COMPONENT IN ONE IMPORT LIKE REACT-NATIVE

// ================================================================================================

// User profile screen to show the user info
const UserProfileScreen: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Button title="Logout" onPress={logout} />
                </>
            ) : (
                <Text>No user logged in</Text>
            )}
        </View>
    );
};

// ================================================================================================

// Styles for profile page
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
    name: { fontSize: 20, fontWeight: 'bold' },
    email: { fontSize: 16, color: 'gray', marginBottom: 20 },
});

// ================================================================================================

export default UserProfileScreen;

// ================================================================================================
