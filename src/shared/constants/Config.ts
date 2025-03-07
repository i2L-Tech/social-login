// CONSTANTS: maintain constants related to app configurations
// ================================================================================================
import Constants from "expo-constants";

export const googleClientId = Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID;
export const googleAndroidClientId =
	Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID;
export const googleIosClientId =
	Constants.expoConfig?.extra?.GOOGLE_IOS_CLIENT_ID;
export const googleRedirectUri =
	Constants.expoConfig?.extra?.GOOGLE_REDIRECT_URI;
export const webUrl = Constants.expoConfig?.extra?.webUrl;
