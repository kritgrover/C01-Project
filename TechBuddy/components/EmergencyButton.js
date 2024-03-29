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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Speak from './Speak';

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

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const loadFontSettings = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log(
            "Selected language: (EmergencyButton) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
          console.log("Selected language (EmergencyButton - false version):", savedLanguage);
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
          console.log("Font family (EmergencyButton):", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
          console.log("Font family (EmergencyButton - false version):", savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size (EmergencyButton):", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
          console.log("Font size (EmergencyButton - false version):", savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold !== null && savedIsBold !== "" && savedIsBold !== "null" && savedIsBold == "true") {
          console.log("Is bold (EmergencyButton):", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
          console.log("Is bold (EmergencyButton - false version):", savedIsBold);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
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
        <View style={styles.content}>
          <MaterialIcons
            name="local-hospital"
            color="#fff"
            size={38}
            style={styles.icon}
          />
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
        </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 30,
    color: "white",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 30,
    width: "85%",
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default EmergencyButton;
