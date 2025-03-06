import "dotenv/config";

export default {
	expo: {
		name: "social-login",
		slug: "social-login",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		newArchEnabled: true,
		splash: {
			image: "./assets/splash-icon.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		extra: {
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
			GOOGLE_ANDROID_CLIENT_ID: process.env.GOOGLE_ANDROID_CLIENT_ID,
			GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
			GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
			WEB_URL: process.env.WEB_URL,

			eas: {
				projectId: "0aed7d49-21aa-44eb-bccf-b5e6b63bfb01",
			},
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			package: "com.i2l.sociallogin",
		},
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.i2l.sociallogin",
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		owner: "skthasan",
		scheme: "social-login",
		description: "Social-login is an app for exploring various login optins",
		plugins: ["expo-secure-store"],
	},
};
