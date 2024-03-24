import React, { forwardRef } from "react";
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button
} from "react-native";

const EmergencyButton = forwardRef((props, ref) => {
  const handleEmergencyCall = () => {
    let phoneNumber = "911";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Button ref={ref} onPress={handleEmergencyCall} title={''}></Button>

      <TouchableHighlight
        ref={ref}
        style={styles.button}
        onPress={handleEmergencyCall}
        underlayColor="darkred" // Adjust the color when pressed
      >
        <Text style={styles.buttonText}>Emergency</Text>
      </TouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 200,
    left: 20,
    right: 20,
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    width: 150,
    height: 50,
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmergencyButton;
