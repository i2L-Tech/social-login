// It is responsible for managing authentication state across your app.
// It uses React’s Context API to provide authentication data (such as user info,
// login state, and authentication functions) to all components without having to pass
// props manually.
// ================================================================================================

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../models/UserModel';
import { AuthService } from '../services/AuthServices';

// ================================================================================================

// Define the context
type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

// Define the props type for the provider
type AuthProviderProps = {
    children: ReactNode;
}

// ================================================================================================

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load stored user on app start
    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AuthService.getUser();
            if (storedUser) {
                setUser(storedUser);
            }
        };
        loadUser();
    }, []);

    // Handle logout
    const logout = async () => {
        await AuthService.removeToken()
        await AuthService.removeUser()
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ================================================================================================

// Custom hook for accessing auth
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
