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
import Tip from "./Tip";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log("Selected language:", savedLanguage);
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
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
      tipsHomePage: "Learn more about \n your device",
      startYourJourney: "Start your journey",
      betterDigitalExperience: "to a better digital experience!",
    },
    fr: {
      tipsHomePage: "Page d'accueil des conseils",
      startYourJourney: "Commencez votre voyage",
      betterDigitalExperience: "vers une meilleure expérience numérique!",
    },
    es: {
      tipsHomePage: "Página de inicio de consejos",
      startYourJourney: "Comience su viaje",
      betterDigitalExperience: "hacia una mejor experiencia digital!",
    },
    ch: {
      tipsHomePage: "提示主页",
      startYourJourney: "开始你的旅程",
      betterDigitalExperience: "迈向更好的数字体验！",
    },
    ru: {
      tipsHomePage: "Домашняя страница советов",
      startYourJourney: "Начните свой путь",
      betterDigitalExperience: "к лучшему цифровому опыту!",
    },
    ar: {
      tipsHomePage: "صفحة النصائح الرئيسية",
      startYourJourney: "ابدأ رحلتك",
      betterDigitalExperience: "إلى تجربة رقمية أفضل!",
    },
    hi: {
      tipsHomePage: "टिप्स होम पेज",
      startYourJourney: "अपनी यात्रा शुरू करें",
      betterDigitalExperience: "एक बेहतर डिजिटल अनुभव के लिए!",
    },
    ja: {
      tipsHomePage: "ヒントホームページ",
      startYourJourney: "あなたの旅を始める",
      betterDigitalExperience: "より良いデジタル体験へ！",
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
        <Text style={styles.textField1}>{textStrings[selectedLanguage].startYourJourney}</Text>
        <Text style={styles.textField2}>{textStrings[selectedLanguage].betterDigitalExperience}</Text>
        <TouchableOpacity
          style={styles.howTobutton}
          onPress={() => {
            navigation.navigate("TipsMenu");
          }}
        >
          <View style={styles.content}>
            <MaterialIcons
              name="book"
              color="#fff"
              size={36}
              style={styles.icon}
            />
            <Text
              style={[
                styles.howToText,
                {
                  fontSize,
                  fontWeight: isBold ? "bold" : "normal",
                  fontFamily,
                },
              ]}
            >
              {textStrings[selectedLanguage].tipsHomePage}
            </Text>
          </View>
        </TouchableOpacity>
        <Tip></Tip>
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
    height: "100%",
    width: "100%",
  },
  icon: {
    marginRight: 30,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textField1: {
    textAlign: "left",
    fontSize: 22,
    marginTop: 25,
    padding: 10,
  },
  textField2: {
    textAlign: "left",
    fontSize: 24,
    marginBottom: 25,
    padding: 10,
  },
  howTobutton: {
    backgroundColor: "#4CAF50",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
  },
  howToText: {
    color: "white",
    fontSize: 18,
    textAlign: "left",
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