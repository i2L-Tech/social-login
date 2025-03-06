// useGoogleAuth.ts (A Hook to connect to google login)
// ====================================================================================================================
import { Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import {
	googleClientId,
	googleAndroidClientId,
	googleIosClientId,
	googleRedirectUri,
	webUrl,
} from "../constants/Config";

// ====================================================================================================================
// Open AuthSession manually on web
if (Platform.OS === "web") {
	WebBrowser.maybeCompleteAuthSession();
}
// ====================================================================================================================

// Custom hook for accessing google login
const useGoogleAuth = () => {
	// Dynamically determine redirect URI based on environment
	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: Platform.select({
			web: googleClientId,
			ios: googleIosClientId,
			android: googleAndroidClientId,
		}),
		webClientId: googleClientId,
		androidClientId: googleAndroidClientId,
		iosClientId: googleIosClientId,
		scopes: ["openid", "profile", "email"],
		redirectUri:
			Platform.OS === "web"
				? webUrl // Web Expo Dev mode
				: AuthSession.makeRedirectUri({
						native: googleRedirectUri,
						path: "redirect",
				  }), // Android and IoS login (not using expo go)
	});

	const fetchUserInfo = async (token: string) => {
		const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.json(); //return user data
	};

	return { response, promptAsync, fetchUserInfo };
};

// ====================================================================================================================

export default useGoogleAuth;
