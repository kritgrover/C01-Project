import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
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

  const [fontFamily, setFontFamily] = useState("Arial"); // State to store font family
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const loadFontSettings = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (
          savedLanguage !== null &&
          savedLanguage !== "" &&
          savedLanguage !== "null"
        ) {
          setSelectedLanguage(savedLanguage);
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (
          savedFontFamily &&
          savedFontFamily !== "" &&
          savedFontFamily !== "null"
        ) {
          console.log("Font family:", savedFontFamily);
          setFontFamily(savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size:", savedFontSize);
          setFontSize(Number(savedFontSize));
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (
          savedIsBold !== null &&
          savedIsBold !== "" &&
          savedIsBold !== "null"
        ) {
          console.log("Is bold:", savedIsBold);
          setIsBold(savedIsBold);
        }
      } catch (error) {
        console.error("Error loading font settings:", error);
      }
    };

    loadFontSettings();
  }, []);

  const textStrings = {
    en: {
      emergencyText: "Emergency",
    },
    fr: {
      emergencyText: "Urgence",
    },
    es: {
      emergencyText: "Emergencia",
    },
    ch: {
      emergencyText: "紧急情况",
    },
    ru: {
      emergencyText: "Чрезвычайная ситуация",
    },
    ar: {
      emergencyText: "طارئ",
    },
    hi: {
      emergencyText: "आपातकाल",
    },
    ja: {
      emergencyText: "緊急",
    },
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={handleEmergencyCall}
        underlayColor="darkred" // Adjust the color when pressed
      >
        <Text
          style={[
            styles.buttonText,
            {
              fontFamily: fontFamily,
              fontSize: fontSize,
              fontWeight: isBold ? "bold" : "normal",
            },
          ]}
        >
          {textStrings[selectedLanguage].emergencyText}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    left: 0,
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    // width: 150,
    // height: 50,
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmergencyButton;
