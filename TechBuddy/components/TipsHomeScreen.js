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
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import Speak from './Speak';

const TipsScreen = function () {
  const navigate = useNavigation();
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
  /*
    Tipsmenu is an array of JSON, which will contain each page of tips.
    To add a new page, insert a new JSON entry which is of the following form
    {
        title: 'YourTitle',
        link: 'Name Of Component On App.js'
    }
    It is very important to have title and link exactly labeled as title and link,
    although the strings you put in for those values could be anything you want.
    */

  const textStrings = {
    en: {
      languageChange: "Language Change",
      accessibilitySettings: "Accessibility Settings",
      loggingInToApps: "Logging In To Apps",
      yourPhone: "Your Phone",
    },
    fr: {
      languageChange: "Changement de langue",
      accessibilitySettings: "Paramètres d'accessibilité",
      loggingInToApps: "Connexion aux applications",
      yourPhone: "Votre téléphone",
    },
    es: {
      languageChange: "Cambio de idioma",
      accessibilitySettings: "Configuración de accesibilidad",
      loggingInToApps: "Inicio de sesión en aplicaciones",
      yourPhone: "Tu teléfono",
    },
    ch: {
      languageChange: "语言更改",
      accessibilitySettings: "辅助功能设置",
      loggingInToApps: "登录应用",
      yourPhone: "你的电话",
    },
    ru: {
      languageChange: "Изменение языка",
      accessibilitySettings: "Настройки доступности",
      loggingInToApps: "Вход в приложения",
      yourPhone: "Ваш телефон",
    },
    ar: {
      languageChange: "تغيير اللغة",
      accessibilitySettings: "إعدادات الوصول",
      loggingInToApps: "تسجيل الدخول إلى التطبيقات",
      yourPhone: "هاتفك",
    },
    hi: {
      languageChange: "भाषा बदलें",
      accessibilitySettings: "पहुंचनीयता सेटिंग्स",
      loggingInToApps: "ऐप्स में लॉगिन करना",
      yourPhone: "आपका फ़ोन",
    },
    ja: {
      languageChange: "言語の変更",
      accessibilitySettings: "アクセシビリティ設定",
      loggingInToApps: "アプリにログイン",
      yourPhone: "あなたの電話",
    },
  };

  const navigateToPasswordManager = () => {
    navigate.navigate("PasswordManager");
  };

  const navigateToAccount = () => {
    navigate.navigate("Settings");
  };

  const navigateToHome = () => {
    navigate.navigate("HomeScreen");
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

  const tipsMenu = [
    {
      title: textStrings[selectedLanguage].languageChange,
      link: "SettingsLanguagechange",
    },
    {
      title: textStrings[selectedLanguage].accessibilitySettings,
      link: "AccessSettings",
    },
    {
      title: textStrings[selectedLanguage].loggingInToApps,
      link: "LogInsToApps",
    },
    {
      title: textStrings[selectedLanguage].yourPhone,
      link: "PhoneHardware",
    },
  ];

  let allButtonTitles = '';

  return (
    <View style={styles.menuContainer}>
      {tipsMenu.map(function (link) {
        allButtonTitles += link.title + '. ';
        return (
          <Pressable
            key={link.title}
            onPress={function () {
              navigate.navigate(link.link);
            }}
            style={styles.navigateButton}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: Number(fontSize),
                  fontWeight: isBold ? "bold" : "normal",
                  fontFamily,
                },
              ]}
            >
              {link.title}
            </Text>
          </Pressable>
        );
      })}
      {/* <Speak text={allButtonTitles} language={selectedLanguage === 'ch'? 'zh': selectedLanguage} showText={true}></Speak> */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "100%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  navigateButton: {
    width: 250,
    height: 70,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 10,
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
});

export default TipsScreen;
