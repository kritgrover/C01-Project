import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const NavigationBar = ({
  onHomePress,
  onButton2Press,
  onPasswordManagerPress,
}) => {
  const navigation = useNavigation();

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
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log(
            "Selected language: (NavigationBar) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
          console.log("Selected language: (NavigationBar -- false version) ", selectedLanguage);
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
          console.log("Font family (NavigationBar):", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
          console.log("Font family (NavigationBar -- false version):", savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size (NavigationBar):", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
          console.log("Font size (NavigationBar -- false version):", savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold !== null && savedIsBold !== "" && savedIsBold !== "null" && savedIsBold == "true") {
          console.log("Is bold (NavigationBar):", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
          console.log("Is bold (NavigationBar -- false version):", savedIsBold);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();
  }, []);

  const navigateToPasswordManager = () => {
    navigation.navigate("PasswordManager");
  };

  const navigateToHomeScreen = () => {
    navigation.navigate("HomeScreen");
  };

  const navigateToAccount = () => {
    navigation.navigate("Settings");
  };

  const textStrings = {
    en: {
      home: "Home",
      account: "Account",
      passwordManager: "Password Manager",
    },
    fr: {
      home: "Page d'accueil",
      account: "Compte",
      passwordManager: "Gestionnaire de mots de passe",
    },
    es: {
      home: "Página de inicio",
      account: "Cuenta",
      passwordManager: "Administrador de contraseñas",
    },
    ch: {
      home: "主页",
      account: "帐户",
      passwordManager: "密码管理器",
    },
    ru: {
      home: "домашняя страница",
      account: "учетная",
      passwordManager: "менеджер паролей",
    },
    ar: {
      home: "الصفحة الرئيسية",
      account: "الحساب",
      passwordManager: "مدير كلمات المرور",
    },
    hi: {
      home: "होम पेज",
      account: "लेखा",
      passwordManager: "पासवर्ड प्रबंधक",
    },
    ja: {
      home: "ホームページ",
      account: "アカウント",
      passwordManager: "パスワードマネージャー",
    },
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={navigateToHomeScreen}
        underlayColor="darkred"
      >
        <Text
          style={[
            styles.buttonText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          {textStrings[selectedLanguage].home}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={navigateToAccount}
        underlayColor="darkblue"
      >
        <Text
          style={[
            styles.buttonText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          {textStrings[selectedLanguage].account}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={navigateToPasswordManager}
        underlayColor="darkblue"
      >
        <Text
          style={[
            styles.buttonText,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          {textStrings[selectedLanguage].passwordManager}
        </Text>
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
    alignContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NavigationBar;
