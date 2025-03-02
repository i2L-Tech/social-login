// CONTROLLER: LOGIN CONTROLLER TO MANAGE ALL LOGIN RELATED LOGICS
// ====================================================================================================================

import { useEffect, useState } from "react";
import Constants from "expo-constants";

import { useAuth } from "../../shared/context/AuthContext";
import useGoogleAuth from "../../shared/hooks/useGoogleAuth";
import { User } from "../../shared/models/UserModel";
import { AuthService } from "../../shared/services/AuthServices";

// ====================================================================================================================

export const isExpoGo =
	Constants.executionEnvironment.toString() == "storeClient";

// ====================================================================================================================

// controller function to call google auth service an then get user data
const useGoogleAuthController = () => {
	const { response, promptAsync, fetchUserInfo } = useGoogleAuth();
	const { setUser } = useAuth();
	const [error, setError] = useState<string | null>(null); // for tracking login error

	// Show google login only when it is not expo go
	const handleLoginPress = async () => {
		setError(null); // Reset errors before attempting login

		// mock Google login response when test through Expo Go
		if (isExpoGo) {
			const userInfo = {
				id: "12345",
				name: "John Doe",
				email: "john@example.com",
				avatarUrl: "https://example.com/avatar.png",
			};
			// Save the info on storage as well as in the context
			try {
				await AuthService.saveUser(userInfo as User);
				await AuthService.saveToken("no token");
				setUser(userInfo);
			} catch (error) {
				setError("Authentication failed. Please try again error");
			}
		} else {
			// Google login response when test through web or mobile
			promptAsync();
		}
	};

	//listen for response and fetch user data from google
	useEffect(() => {
		const processLogin = async () => {
			if (
				response?.type === "success" &&
				response?.authentication?.accessToken
			) {
				try {
					const userInfo = await fetchUserInfo(
						response.authentication.accessToken
					);
					if (!userInfo || !userInfo.email) {
						throw new Error("Failed to fetch user data");
					}
					// Save the info on storage as well as in the context
					await AuthService.saveUser(userInfo as User);
					await AuthService.saveToken(response.authentication.accessToken);
					setUser(userInfo);
				} catch (error) {
					setError("Authentication failed. Please try again");
				}
			} else if (response?.type === "error") {
				setError("Authentication failed. Please try again");
			}
		};
		if (!isExpoGo) {
			processLogin();
		}
	}, [response]); // it runs everytime response changes

	return { handleLoginPress, error };
};

// ====================================================================================================================

export default useGoogleAuthController;
// ====================================================================================================================
