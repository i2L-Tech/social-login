// MAIN Wiggle.dog app starting point
// It loads auth context for state management and login and profile screen on a stack
// ================================================================================================

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/shared/context/AuthContext";
import LoginScreen from "./src/features/auth/LoginScreen";
import UserProfileScreen from "./src/features/user/UserProfileScreen";

// ================================================================================================

export type RootStackParamList = {
	Login: undefined;
	Profile: undefined;
};

enableScreens();
const Stack = createStackNavigator<RootStackParamList>();

// ================================================================================================

const MainNavigator = () => {
	const { user } = useAuth();
	return (
		<Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
			{user ? (
				<Stack.Screen name="Profile" component={UserProfileScreen} />
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</AuthProvider>
		</SafeAreaProvider>
	);
}
