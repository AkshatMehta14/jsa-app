import { StatusBar } from "expo-status-bar";
import React, { Alert, Button, Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Link } from "expo-router";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useUserContext } from "../context/userContextProvider";
import { router } from "expo-router";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [chapter, setChapter] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const userContext = useUserContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="Chapter"
        onChangeText={(text) => setChapter(text)}
        value={chapter}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={(text) => setPassConfirm(text)}
        value={passConfirm}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        onPress={async () => {
          if (password === "" || passConfirm === "") {
            Alert.alert("Password cannot be empty!");
            return;
          }

          if (password !== passConfirm) {
            Alert.alert("Passwords don't match");
            return;
          }

          const registerSuccess = await userContext.signUp(
            name,
            chapter,
            email,
            password
          );
          if (registerSuccess) {
            while (router.canGoBack()) {
              router.back();
            }
            router.replace("/(tabs)/one");
          } else {
            Alert.alert(
              "Register Failed. Please ensure email is valid and password contains at least 6 characters."
            );
          }
        }}
      >
        <Text>Register</Text>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    color: "black",
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
});
