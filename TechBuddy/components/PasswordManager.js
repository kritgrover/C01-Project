import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationBar } from "./NavigationBar";

const PasswordManager = () => {
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savedCredentials, setSavedCredentials] = useState([]);

  useEffect(() => {
    fetchSavedCredentials();
  }, []);

  const fetchSavedCredentials = async () => {
    try {
      const credentials = await AsyncStorage.getItem("savedCredentials");
      if (credentials !== null) {
        setSavedCredentials(JSON.parse(credentials));
      }
    } catch (error) {
      console.error("Error fetching saved credentials: ", error);
    }
  };

  const saveCredentials = async () => {
    try {
      const newCredential = {
        appName: appName,
        username: username,
        password: password,
      };
      const updatedCredentials = [...savedCredentials, newCredential];
      await AsyncStorage.setItem(
        "savedCredentials",
        JSON.stringify(updatedCredentials)
      );
      setSavedCredentials(updatedCredentials);
      setAppName("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error saving credentials: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar />
      <Text style={styles.title}>Password Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="App Name"
        value={appName}
        onChangeText={setAppName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Save" onPress={saveCredentials} />
      <View style={styles.savedCredentialsContainer}>
        <Text style={styles.savedCredentialsTitle}>Saved Credentials:</Text>
        {savedCredentials.map((credential, index) => (
          <View key={index} style={styles.savedCredential}>
            <Text>App Name: {credential.appName}</Text>
            <Text>Username: {credential.username}</Text>
            <Text>Password: {credential.password}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  savedCredentialsContainer: {
    marginTop: 20,
  },
  savedCredentialsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  savedCredential: {
    marginBottom: 10,
  },
});

export default PasswordManager;
