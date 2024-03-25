import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";

const NavigationBar = ({ onHomePress, onButton2Press, onButton3Press }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={onHomePress}
        underlayColor="darkred"
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={onButton2Press}
        underlayColor="darkblue"
      >
        <Text style={styles.buttonText}>Account</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={onButton3Press}
        underlayColor="darkblue"
      >
        <Text style={styles.buttonText}>Quick Tips</Text>
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