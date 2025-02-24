// It creates a login page with welcome message and google login button
// ================================================================================================

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../../shared/components/Button";
import useGoogleAuthController from "./LoginController";

// ================================================================================================

// Login screen ui with call to auth on click of the button
const LoginScreen: React.FC = () => {
  const { handleLoginPress, error } = useGoogleAuthController();

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>WigglyDog App</Text>
      <Button title="Sign in with Google" onPress={handleLoginPress} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

// ================================================================================================

// Stylesfor the login page
// ??? SEE IF WE CAN MOVE THE STYLE TO SHARED
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  error: { color: "red", marginBottom: 10 },
});

// ================================================================================================

export default LoginScreen;

// ================================================================================================
