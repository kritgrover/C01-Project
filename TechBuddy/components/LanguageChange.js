import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableHighlight,
  linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SettingsPicture from "../assets/SettingsPicture.png";
import Translate from "./Translate";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";

const LanguageChange = function () {
  const navigate = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState("");

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage) {
          console.log(
            "Selected language: (in LanguageChange.js) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily) {
          console.log("Font family:", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size:", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold) {
          console.log("Is bold:", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();
  }, []);

  const navigateToPasswordManager = () => {
    navigate.navigate("PasswordManager");
  };

  const navigateToAccount = () => {
    navigate.navigate("Settings");
  };

  const navigateToHome = () => {
    navigate.navigate("HomeScreen");
  };

  const navigateToTipsHome = () => {
    navigate.navigate("TipsMenu");
  };

  const textStrings = {
    en: {
      back: "Back",
    },
    fr: {
      back: "Retour",
    },
    es: {
      back: "Atrás",
    },
    ch: {
      back: "回去",
    },
    ru: {
      back: "назад",
    },
    ar: {
      back: "عودة",
    },
    hi: {
      back: "वापस",
    },
    ja: {
      back: "バック",
    },
  };

  // Set header options dynamically
  useEffect(() => {
    navigate.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={navigateToHome}>
          <Image source={homeIcon} style={styles.homeIcon} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigateToAccount}
          style={styles.headerButton}
        >
          <Image source={accountIcon} style={styles.accountIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={navigateToPasswordManager}
          style={styles.headerButton}
        >
          <Image source={passwordIcon} style={styles.passwordIcon} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView height="500vh">
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigateToTipsHome}
        >
          <Text
            style={[
              styles.buttonText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].back}
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.instructionText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          <Translate
            text="Every phone has an option to change the language on it. This will change the language of everything presented on your phone. Here’s how to do it:"
            targetLanguage={selectedLanguage}
          />
        </Text>
        <Text
          style={[
            styles.instructionText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          <Translate
            text="1) Go to your settings."
            targetLanguage={selectedLanguage}
          />
        </Text>
        <Text
          style={[
            styles.instructionText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          <Translate
            text="2) Go to Preferences, then Languages. (If you don't see preferences, you may use the search icon in your Settings app to search 'Languages')"
            targetLanguage={selectedLanguage}
          />
        </Text>
        <Image
          resizeMode="contain"
          style={{ width: "70%", height: "100%", flex: "contain" }}
          source={SettingsPicture}
          alt="Search Image"
        />
        <Text
          style={[
            styles.instructionText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          <Translate
            text="3) There should be a “Your Selected Language” option, and it will be set to English. There should also be a “Select Language” option. Tap that button."
            targetLanguage={selectedLanguage}
          />
        </Text>
        <Text
          style={[
            styles.instructionText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          <Translate
            text="4) A list of languages should appear, scroll through until you find the one you want."
            targetLanguage={selectedLanguage}
          />
        </Text>
        <Text
          style={[
            styles.instructionText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          <Translate
            text="5) Some settings will ask you to verify that you want to change to the selected language. Make sure to select “Yes” or your changes will not be saved."
            targetLanguage={selectedLanguage}
          />
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    margin: "auto",
    justifyContent: "top",
    alignItems: "center",
    flex: 1,
  },
  navigateButton: {
    width: 200,
    height: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  instructionText: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  headerButton: {
    padding: 10,
    marginRight: 10,
  },
  headerButtonText: {
    color: "blue",
    fontSize: 16,
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  accountIcon: {
    width: 40,
    height: 30,
  },
  passwordIcon: {
    width: 30,
    height: 30,
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default LanguageChange;
