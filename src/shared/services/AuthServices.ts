// It stores and maintains all authentication info such as user and token
// ====================================================================================================================

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../models/UserModel";

// ====================================================================================================================

// Keys for storing user data securely
// ??? LATER MOVE ALL THE STORAGE KEYS TO CONSTANT FILE
const STORAGE_USER_key = "authUser";
const STORAGE_TOKEN_KEY = "authToken";

// ====================================================================================================================

// CLASS: service that manages all auth info in local storage through get and set functions.
export class AuthService {
	// FUNCTION: SAVE TOKEN IN STORAGE SECURELY
	static async saveToken(token: string) {
		if (Platform.OS === "android" || Platform.OS === "ios") {
			await SecureStore.setItemAsync(STORAGE_TOKEN_KEY, token);
		} else {
			await AsyncStorage.setItem(STORAGE_TOKEN_KEY, token);
		}
	}
	// ----------------------------------------------------------------------------------------------------------------

	// FUNCTION: GET TOKENS FROM STORAGE SECURELY
	static async getToken() {
		if (Platform.OS === "android" || Platform.OS === "ios") {
			return await SecureStore.getItemAsync(STORAGE_TOKEN_KEY);
		} else {
			return await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
		}
	}
	// ----------------------------------------------------------------------------------------------------------------

	// FUNCTION: REMOVE TOKENS FROM STORAGE ON LOGOUT
	static async removeToken() {
		if (Platform.OS === "android" || Platform.OS === "ios") {
			await SecureStore.deleteItemAsync(STORAGE_TOKEN_KEY);
		} else {
			await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
		}
	}
	// ----------------------------------------------------------------------------------------------------------------

	// FUNCTION: SAVE USER INFO INTO SECURE STORAGE
	static async saveUser(user: User) {
		if (user) {
			if (Platform.OS === "android" || Platform.OS === "ios") {
				await SecureStore.setItemAsync(STORAGE_USER_key, JSON.stringify(user));
			} else {
				console.log("saveUser Else");
				await AsyncStorage.setItem(STORAGE_USER_key, JSON.stringify(user));
			}
		}
	}
	// ----------------------------------------------------------------------------------------------------------------

	// FUNCTION: GET USER INFO FROM SECURE STORAGE
	static async getUser() {
		if (Platform.OS === "android" || Platform.OS === "ios") {
			const user = await SecureStore.getItemAsync(STORAGE_USER_key);
			return user ? (JSON.parse(user) as User) : null;
		} else {
			const user = await AsyncStorage.getItem(STORAGE_USER_key);
			return user ? (JSON.parse(user) as User) : null;
		}
	}
	// ----------------------------------------------------------------------------------------------------------------

	// FUNCTION: REMOVE USER FROM SECURE STORAGE ON LOGIN
	static async removeUser() {
		if (Platform.OS === "android" || Platform.OS === "ios") {
			await SecureStore.deleteItemAsync(STORAGE_USER_key);
		} else {
			await AsyncStorage.removeItem(STORAGE_USER_key);
		}
	}
	// ----------------------------------------------------------------------------------------------------------------
}
// ====================================================================================================================
