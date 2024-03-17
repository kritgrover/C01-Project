import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
} from "react-native";

const EmergencyButton = () => {
  const handleEmergencyCall = () => {
    let phoneNumber = "911";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const [fontFamily, setFontFamily] = useState(''); // State to store font family
  const [fontSize, setFontSize] = useState('');
  const [isBold, setIsBold] = useState('');

  useEffect(() => {
    const loadFontSettings = async () => {
      try {
        const savedFontFamily = JSON.parse(await SecureStore.getItemAsync('fontFamily'));
        if (savedFontFamily) {
            console.log("Font family:", savedFontFamily)
          setFontFamily(savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync('fontSize');
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync('isBold');
        if (savedIsBold) {
            console.log("Is bold:", savedIsBold);
            setIsBold(savedIsBold);
        }
      } catch (error) {
        console.error('Error loading font settings:', error);
      }
    };

    loadFontSettings();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={handleEmergencyCall}
        underlayColor="darkred" // Adjust the color when pressed
      >
        <Text style={[styles.buttonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>Emergency</Text>
      </TouchableHighlight>
    </View>
  );
};

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
    textAlign: "center",
  },
});

export default EmergencyButton;
