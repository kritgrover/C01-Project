import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

const NavigationBar = ({ onHomePress, onButton2Press, onPasswordManagerPress }) => {

  const navigation = useNavigation();

  const navigateToPasswordManager = () => {
    navigation.navigate("PasswordManager");
  }

  const navigateToHomeScreen = () => {
    navigation.navigate("HomeScreen")
  }

  const navigateToAccount = () => {
    navigation.navigate("Settings")
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={navigateToHomeScreen}
        underlayColor="darkred"
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={navigateToAccount}
        underlayColor="darkblue"
      >
        <Text style={styles.buttonText}>Account</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={navigateToPasswordManager}
        underlayColor="darkblue"
      >
        <Text style={styles.buttonText}>Button 3</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
  },
  button: {
    backgroundColor: "grey",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignContent: 'center'
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NavigationBar;
