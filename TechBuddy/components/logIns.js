import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Translate from "./Translate";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useNavigation } from "@react-navigation/native";

const LogInsToApps = function () {
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
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            <Translate
              text="Many apps (like this one) will require you to 'Log In' or 'Sign In'. This may seem annoying, but it is an important step to ensure your security and comfort."
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
              text="How do you log in to an app? Here is a step by step guide."
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
              text="1) If you are using an app for the first time, the app will ask you to 'Sign Up'. This means creating an account for your use of an app."
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
              text="2) If you are asked to 'Sign Up', you will be asked for a Username and Password. Type in a Username and Password. You can use anything for the Username and Password, so make sure you will remember them, or write them down somewhere. Your password is used to secure your account. Many apps will require your password to fulfill certain critera. (Like being a certain size of having special characters) This is to help secure your account"
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
              text="3) Some apps will ask you to Confirm Password. This is to make sure that you typed in the password correctly. Put in the same password as you've done before."
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
              text="4) Some apps will ask you to Confirm You're Not A Robot. This is because there are robots that can automatically make millions of accounts on websites to do malicious activities on behalf of an individual. They may ask you to click a checkmark or play a small game. Do as they say. Sometimes, several attempts are needed."
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
              text="5) After making an account, to log in to that account, click the Sign In or Log In option on the app if it shows up. Type the same Username and Password as you did when you made the account. If you forgot your Username or Password, click the option 'Forgot Password'. The app will give you directions on how to get your password back, or maybe reset it to another one."
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
              text="This may seem tedious, but having an account for an app does a lot. It keeps you secure, and helps those apps tailor content for you. For YouTube for example, YouTube will only show you options related to what you like, like cooking videos, and doesn't show you what you won't like, like motorcycle videos."
              targetLanguage={selectedLanguage}
            />
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    height: "80%",
    alignItems: "center",
    margin: "auto",
    justifyContent: "top",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  textContainer: {
    alignItems: "left",
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
    marginTop: 15,
    marginBottom: 15,
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
    width: 150,
    marginBottom: 20,
  },
});

export default LogInsToApps;
