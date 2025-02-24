// useGoogleAuth.ts (A Hook to connect to google login)
// ====================================================================================================================
import { Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "../constants/Config";
import { User } from "../models/UserModel";
import { useEffect } from "react";

// ====================================================================================================================

WebBrowser.maybeCompleteAuthSession();

// ====================================================================================================================

// Custom hook for accessing google login
const useGoogleAuth = () => {
  console.log("useGoogleAuth: starting google login : ");

  // Dynamically determine redirect URI based on environment
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    webClientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    scopes: ["openid", "profile", "email"],
    redirectUri:
      Platform.OS === "web"
        ? "http://localhost:8081" // Web Expo Dev mode
        : "wigglydog://redirect", // Android and IoS login
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

// Simulated function to mock Google login response when test through Expo Go
async function testGoogleAuth(): Promise<User> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id: "12345",
        name: "John Doe",
        email: "john@example.com",
        avatarUrl: "https://example.com/avatar.png",
      });
    }, 1000)
  );
}

// ================================================================================================

export default useGoogleAuth;
