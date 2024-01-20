import React, { useState } from "react";
import {
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { Text } from "../components/Themed";
import { useUserContext } from "../context/userContextProvider";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userContext = useUserContext();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        {/* Display the image above the "LOGIN" text */}
        <Image
          source={require("../assets/images/jsaLogo.png")}
          style={styles.image}
        />

        <Text style={styles.title}>LOGIN</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          onPress={async () => router.push("/register")}
          style={styles.buttonSignUp}
        >
          <Text style={styles.buttonTextSignUp}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            const loginSuccess = await userContext.login(email, password);
            if (loginSuccess) {
              router.replace("/(tabs)/one");
            } else {
              Alert.alert("Login Failed");
            }
          }}
          style={styles.buttonLogin}
        >
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: "80%",
    maxWidth: 400, // Set a maximum width for better appearance
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    color: "black",
    width: "100%",
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  buttonSignUp: {
    backgroundColor: "black", // Black background
    color: "white", // White text color
    fontSize: 16,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonTextSignUp: {
    color: "white", // White text color
  },
  buttonLogin: {
    backgroundColor: "black", // Black background
    color: "white", // White text color
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingVertical: 12, // Slightly larger padding
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonTextLogin: {
    color: "white", // White text color
  },
  // Add a style for the image
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 20, // Adjust the margin as needed
    resizeMode: "cover", // Choose the appropriate resizeMode
    borderRadius: 10, // Adjust the borderRadius as needed
  },
});
