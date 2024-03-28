import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordManager from "./PasswordManager";
import Speak from "./Speak";
import EmergencyButton from "./EmergencyButton";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";

const HomeScreen = ({ navigation }) => {
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const loadSavedValues = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage) {
          console.log("Selected language:", savedLanguage);
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
        console.error("Error loading saved values:", error);
      }
    };

    loadSavedValues();
  }, []);

  const textStrings = {
    en: {
      tipsHomePage: "Tips Home Page",
    },
    fr: {
      tipsHomePage: "Page d'accueil des conseils",
    },
    es: {
      tipsHomePage: "Página de inicio de consejos",
    },
    ch: {
      tipsHomePage: "提示主页",
    },
    ru: {
      tipsHomePage: "Домашняя страница советов",
    },
    ar: {
      tipsHomePage: "صفحة النصائح الرئيسية",
    },
    hi: {
      tipsHomePage: "टिप्स होम पेज",
    },
    ja: {
      tipsHomePage: "ヒントホームページ",
    },
  };

  const navigateToPasswordManager = () => {
    navigation.navigate("PasswordManager");
  };

  const navigateToAccount = () => {
    navigation.navigate("Settings");
  };

  const navigateToHome = () => {
    navigation.navigate("HomeScreen");
  };

  // Set header options dynamically
  useEffect(() => {
    navigation.setOptions({
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
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <PasswordManager />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              navigation.navigate("TipsMenu");
            }}
          >
            <Text
              style={[
                styles.continueButtonText,
                {
                  fontSize,
                  fontWeight: isBold ? "bold" : "normal",
                  fontFamily,
                },
              ]}
            >
              {textStrings[selectedLanguage].tipsHomePage}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <Speak
          text={
            "hello this page is reading aloud with a very long text so that I can test the pausing"
          }
        />
        <EmergencyButton />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: 0,
    height: "100%",
  },
  button: {
    color: "blue",
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    padding: 0,
    borderRadius: 5,
    alignSelf: "center",
    margin: 0,
    width: "75%",
  },
  continueButtonText: {
    color: "white",
    // fontSize: 18,
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
});

export default HomeScreen;
