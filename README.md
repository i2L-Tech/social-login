# Social Login with Expo React Native

This project implements social login using Expo and React Native. It supports authentication via Google and Apple using Expo's AuthSession.

## Features

- Google Login (Authentication)
- Global State (Context API)
- Reusable Components with MVC Architecture
- Services
- Custom Hooks
- Secure local storage

## Prerequisites

### Node.js and npm/yarn install

- Download and install node.js from web [https://nodejs.org/en]

### Expo Install

- Run the following command to install Expo globally:
  ```sh
  npm install -g expo
  npx expo install expo-updates
  npm install -g eas-cli # used for making expo builds
  ```
- Create an expo account and project (social-login) in [https://expo.dev]
- Create a new project (social-login) with slug (social-login) and setup the project.
  ```sh
  npx create-expo-app social-login --template blank
  cd social-login
  eas init --id <id from expo project>
  eas credentials
  # save the sha1 fingerrint to add to google clinet id
  ```

### Google developer accounts for OAuth configuration

Set up OAuth credentials in Google Cloud Console [https://console.cloud.google.com].

1.  Go to Google Cloud Console.
2.  Create a new project by setting up the entire project configuration or select an existing one.
3.  Navigate to APIs & Services > Credentials or following the project creation step to setup oauth client.
4.  Click Create Credentials > OAuth 2.0 Client IDs.
5.  Choose Web application, then android and then ios to create 3 client ids.
6.  Set the javascript URL same as your localhost url (eg: http://localhost:8081)
7.  Set the Authorized redirect URIs:
    - Expo Go : (NOTE: THIS FEATURE IS NOT SUPPORTED)
    - For web use your website url (eg: http://localhost:8081)
    - For android/ios : package-name:\\oauthredirect (eg: com.sociallogin:\\oauthredirect)
8.  Save the Client ID, as you'll need it for authentication.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/i2L-Tech/social-login.git
   cd social-login
   ```
2. Install dependencies:

   ```sh
   npm install
   
   ```

   or

   ```sh
   yarn install
   ```

3. Create an `.env` file and add your OAuth credentials:
   ```env
   GOOGLE_CLIENT_ID=YOUR_WEB_CLIENT_ID
   GOOGLE_ANDROID_CLIENT_ID=YOUR_ANDROID_CLIENT_ID
   GOOGLE_IOS_CLIENT_ID=YOUR_IOS_CLIENT_ID
   ```

## Usage

### Running the app

- Test using Web or Expo Go
  ```sh
  # option -c clears the cache
  expo start -c
  # or
  npx expo start -c
  # press w to run on web
  # scan the qr code to run on device
  ```
- Test using Android sdk (Android Studio / Android sdk command-line needed)
  ```sh
  expo prebuild
  expo run:andriod -c # or
  npx expo run:android
  ```
- Test using Android apk (using eas)
  ```sh
  eas login # login to expo
  eas build -p android --profile preview
  # Once the build is complete download and install apk from expo dashboard or scaning the qr code
  # ensure your andriod phone security settings are modified temporarly to allow unknown app install
  # disable "auto blocker"
  # enable "Install unknown app" for myfiles or download manager
  # ***After installation reset the above settings and launch the app***
  ```

## Package Dependencies

      react
      react-dom
      react-native
      react-native-dotenv: to manage environment variables
      react-native-web
      @expo/metro-runtime
      @react-native-async-storage/async-storage
      @react-navigation/native
      @react-navigation/stack : Managing screens in a stack

      expo-auth-session : Handles authentication with OAuth providers like Google.
      expo-random : Required for secure authentication flows.
      expo-web-browser : Manages authentication pop-ups.
      expo-auth-session/providers/google : Required for calling google hooks.

      expo-constants
      expo-secure-store
      expo-status-bar

      -- DEV Dependencies
      @babel/core
      @types/react
      typescript

## Application Structure for Better Scalability

To ensure clean architecture, follow this structure:

```
/social-login
│── /src                      # Main source folder
│ │── /shared                 # all shared files live here
│ │ ├── /models               # Shared data models
│ │ │ ├── UserModel.ts        # Shared user model
│ │ │
│ │ ├── /services             # Shared services
│ │ │ ├── ApiServices.ts      # Logic for API calls
│ │ │ ├── AuthServices.ts     # Shared authentication logic
│ │ │ └── StorageServices.ts  # Logic for local storage handling other than auth
│ │ │
│ │ ├── /context              # Manage state
│ │ │ ├── AuthContext.tsx       # Auth context for global state management
│ │ │ ├── AppContext.tsx
│ │ │ └── ThemeContext.tsx
│ │ │
│ │ │── /hooks                # Custom React hooks
│ │ │ ├── useTheme.ts
│ │ │ ├── useNotifications.ts
│ │ │ ├── useGoogleAuth.ts
│ │ │ └── useAuth.ts
│ │ │
│ │ │── /utils                # Utilities & helper functions
│ │ │ ├── dateUtils.ts
│ │ │ ├── validationUtils.ts
│ │ │ ├── mathUtils.ts
│ │ │ └── helpers.ts          # Generic helper functions
│ │ │
│ │ │── /constants            # App wide constants
│ │ │ ├── ApiUrls.ts
│ │ │ ├── Strings.ts
│ │ │ ├── Config.ts
│ │ │ └── Colors.ts
│ │ │
│ │ ├── /components           # Shared UI components
│ │ │ ├── Button.tsx          # Shared button component
│ │ │ ├── Card.tsx            # Shared card component
│ │ │ ├── Modal.tsx           # Shared modal component
│ │ │ ├── Avatar.tsx          # Shared avatar component
│ │ │ ├── ListItem.tsx        # Reusable list item component
│ │ │ ├── /forms              # Form-specific components
│ │ │ │ ├── InputField.tsx    # Custom input field
│ │ │ │ ├── Checkbox.tsx      # Custom checkbox
│ │ │ │ └── RadioButton.tsx   # Custom radio button
│ │ │ ├── /layout             # Layout-related components
│ │ │ ├── Header.tsx          # Shared header
│ │ │ ├── Footer.tsx          # Shared footer
│ │ │ └── Container.tsx       # Responsive container wrapper
│ │ │
│ │ └── /config               # Configuration files
│ │   ├── apiConfig.ts
│ │   ├── firebaseConfig.ts
│ │   └── appConfig.ts
│ │
│ └── /features
│   ├── /auth                   # Login or signup feature
│   │ ├── LoginModel.ts         # login specitic model
│   │ ├── LoginScreen.tsx       # Login screen UI component
│   │ └── LoginController.ts    # Login logic
│   ├── /user
│   │ ├── UserProfileScreen.ts      # User profile-related UI
│   │ └── UserProfileController.tsx # Profile-related UI logic
│   └── /notifications
│     ├── NotificationService.ts # Logic for handling notifications
│     ├── NotificationModel.ts # Notification-related data
│     ├── NotificationScreen.tsx # Notification UI component
│     └── notificationUtils.ts # Helper functions for notifications
│
│── /scripts # run using (npm run clean, npm run icons, etc)
│ ├── clean.js # Removes build cache & node_modules
│ ├── postinstall.js # Runs after `npm install`
│ ├── generate-icons.js # Generates app icons
│ ├── start-dev.sh # Starts the app with extra debugging in mac
│ └── start-dev.ps1 # Starts the app with extra debugging in windows
│
├── /assets # Static assets like images and fonts
│ ├── /images
│ │ ├── logo.png
│ │ └── dog-park.png
│ └── /fonts
│ ├── Roboto-Regular.ttf
│ └── OpenSans-Bold.ttf
│
│── env.ts                # Environment variables (e.g., API keys)
│── babel.config.js
│── app.tsx
│── app.json
└── package.json
```

#### Key Benefits of This Structure:

✅ Separation of Concerns → Easy maintenance & scalability

✅ Reusable Components → Shared UI elements stay in components

✅ API Management in services/ → Keeps API logic separate from UI

✅ Navigation in navigation/ → Prevents App.tsx from bloating

## Deployment

1. Ensure all environment variables are set.
2. Run:
   ```sh
   expo publish
   ```
3. Build the app:
   ```sh
   expo build:android
   expo build:ios
   ```

## License

This project is licensed under the Apache License Version 2.0.

<!-- ### Implementing Facebook Sign-In

Install Facebook login dependencies:

```sh
expo install expo-auth-session expo-random
```

Use the following snippet for Facebook Sign-In:

```js
import * as Facebook from "expo-auth-session/providers/facebook";

const [request, response, promptAsync] = Facebook.useAuthRequest({
	clientId: process.env.FACEBOOK_APP_ID,
});

useEffect(() => {
	if (response?.type === "success") {
		const { access_token } = response.params;
		const credential =
			firebase.auth.FacebookAuthProvider.credential(access_token);
		firebase.auth().signInWithCredential(credential);
	}
}, [response]);
```

### Implementing Apple Sign-In (iOS Only)

Install Apple authentication dependencies:

```sh
expo install expo-auth-session expo-random
```

Use the following snippet for Apple Sign-In:

```js
import * as AppleAuthentication from "expo-apple-authentication";

const signInWithApple = async () => {
	try {
		const credential = await AppleAuthentication.signInAsync({
			requestedScopes: [
				AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
				AppleAuthentication.AppleAuthenticationScope.EMAIL,
			],
		});
		console.log(credential);
	} catch (error) {
		console.error(error);
	}
};
``` -->
