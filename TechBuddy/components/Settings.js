import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import RNPickerSelect from "react-native-picker-select";

const Settings = () => {
  const navigation = useNavigation();
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const loadFontSettings = async () => {
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
        console.error("Error loading font settings:", error);
      }
    };

    loadFontSettings();
  }, []);

  const goToPreferredLanguage = () => {
    navigation.navigate("PreferredLanguage");
  };

  const textStrings = {
    en: {
      buttonText: "Go To Preferred Language",
      chosenLanguage: "Chosen Language:",
      chosenFontSize: "Chosen Font Size:",
      chosenFontFamily: "Chosen Font Family:",
      language: "English",
      small: "Small",
      default: "Default",
      large: "Large",
      extraLarge: "Extra-Large",
      boldOn: "Disable Bold",
      boldOff: "Enable Bold",
      currentSelections: "Current Selection",
      selectFontSize: "Select Font Size",
      selectFontFamily: "Select Font Family",
      boldOnText: "Bold On",
      boldOffText: "Bold Off",
    },
    fr: {
      buttonText: "Aller à la langue préférée",
      chosenLanguage: "Langue choisie:",
      chosenFontSize: "Taille de police choisie:",
      chosenFontFamily: "Famille de polices choisie:",
      language: "Français",
      small: "Petit",
      default: "Défaut",
      large: "Grand",
      extraLarge: "Très Grand",
      boldOn: "Désactivez le gras",
      boldOff: "Activez le gras",
      currentSelections: "Sélections actuelles",
      selectFontSize: "Sélectionnez la taille de la police",
      selectFontFamily: "Sélectionnez une famille de polices",
      boldOnText: "Gras activé",
      boldOffText: "Gras désactivé",
    },
    es: {
      buttonText: "Ir al idioma preferido",
      chosenLanguage: "Idioma elegido:",
      chosenFontSize: "Tamaño de fuente elegido:",
      chosenFontFamily: "Familia de fuentes elegida:",
      language: "Español",
      small: "Pequeño",
      default: "Por defecto",
      large: "Grande",
      extraLarge: "Extra grande",
      boldOn: "Desactivar negrita",
      boldOff: "Habilitar negrita",
      currentSelections: "Selecciones actuales",
      selectFontSize: "Seleccionar tamaño de fuente",
      selectFontFamily: "Seleccionar familia de fuentes",
      boldOnText: "Negrita activada",
      boldOffText: "Negrita desactivada",
    },
    ch: {
      buttonText: "前往首选语言",
      chosenLanguage: "选择的语言：",
      chosenFontSize: "选择的字体大小：",
      chosenFontFamily: "选择的字体系列：",
      language: "中文",
      small: "小的",
      default: "普通的",
      large: "大的",
      extraLarge: "特大号",
      boldOn: "禁用粗体",
      boldOff: "启用粗体",
      currentSelections: "当前选择",
      selectFontSize: "选择字体大小",
      selectFontFamily: "选择字体系列",
      boldOnText: "粗体已启用",
      boldOffText: "粗体已禁用",
    },
    ru: {
      buttonText: "Перейти к предпочтительному языку",
      chosenLanguage: "Выбранный язык:",
      chosenFontSize: "Выбранный размер шрифта:",
      chosenFontFamily: "Выбранное семейство шрифтов:",
      language: "русский",
      small: "Маленький",
      default: "Нормальный",
      large: "Большой",
      extraLarge: "Очень большой",
      boldOn: "Отключить жирный шрифт",
      boldOff: "Включить жирный шрифт",
      currentSelections: "Текущий выбор",
      selectFontSize: "Выберите размер шрифта",
      selectFontFamily: "Выберите семейство шрифтов",
      boldOnText: "Жирный включен",
      boldOffText: "Жирный отключен",
    },
    ar: {
      buttonText: "الانتقال إلى اللغة المفضلة",
      chosenLanguage: "اللغة المختارة:",
      chosenFontSize: "حجم الخط المختار:",
      chosenFontFamily: "عائلة الخط المختارة:",
      language: "عربى",
      small: "صغير",
      default: "طبيعي",
      large: "كبير",
      extraLarge: "كبير جدا",
      boldOn: "تعطيل غامق",
      boldOff: "تمكين غامق",
      currentSelections: "الاختيارات الحالية",
      selectFontSize: "حدد حجم الخط",
      selectFontFamily: "حدد عائلة الخطوط",
      boldOnText: "الخط العريض مفعل",
      boldOffText: "الخط العريض معطل",
    },
    hi: {
      buttonText: "पसंदीदा भाषा पर जाएं",
      chosenLanguage: "चुनी भाषा:",
      chosenFontSize: "चुनी फ़ॉन्ट आकार:",
      chosenFontFamily: "चुनी फ़ॉन्ट परिवार:",
      language: "हिंदी",
      small: "छोटा",
      default: "सामान्य",
      large: "बड़ा",
      extraLarge: "ज्यादा बड़ा",
      boldOn: "बोल्ड अक्षम करें",
      boldOff: "बोल्ड सक्षम करें",
      currentSelections: "वर्तमान चयन",
      selectFontSize: "फ़ॉन्ट आकार चुनें",
      selectFontFamily: "एक फ़ॉन्ट परिवार चुनें",
      boldOnText: "बोल्ड ऑन",
      boldOffText: "बोल्ड ऑफ",
    },
    ja: {
      buttonText: "好きな言語に移動",
      chosenLanguage: "選択された言語：",
      chosenFontSize: "選択されたフォントサイズ：",
      chosenFontFamily: "選択されたフォントファミリ：",
      language: "日本語",
      small: "小さい",
      default: "普通",
      large: "大きい",
      extraLarge: "特大",
      boldOn: "太字を無効にする",
      boldOff: "太字を有効にする",
      currentSelections: "現在の選択",
      selectFontSize: "フォントサイズを選択してください",
      selectFontFamily: "フォントファミリーを選択してください",
      boldOnText: "太字オン",
      boldOffText: "太字オフ",
    },
  };

  const fontSizesString = {
    14: textStrings[selectedLanguage].small,
    16: textStrings[selectedLanguage].default,
    20: textStrings[selectedLanguage].large,
    24: textStrings[selectedLanguage].extraLarge,
  };

  const navigateToPasswordManager = () => {
    navigation.navigate("PasswordManager");
  };

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Français", value: "fr" },
    { label: "Español", value: "es" },
    { label: "中文", value: "ch" },
    { label: "русский", value: "ru" },
    { label: "عربى", value: "ar" },
    { label: "हिंदी", value: "hi" },
    { label: "日本語", value: "ja" },
  ];

  const handleLanguageSelection = async (value) => {
    setSelectedLanguage(value);
    try {
      await SecureStore.setItemAsync("selectedLanguage", value);
    } catch (error) {
      console.error("Error saving language to Expo-Secure Store:", error);
    }
  };

  const handleFontSizeChange = async (value) => {
    setFontSize(value);
    try {
      await SecureStore.setItemAsync("fontSize", String(value));
    } catch (error) {
      console.error("Error saving font size to Expo-Secure Store:", error);
    }
  };

  const toggleBold = async () => {
    setIsBold((prevIsBold) => !prevIsBold);
    try {
      await SecureStore.setItemAsync("isBold", String(!isBold));
    } catch (error) {
      console.error("Error saving isBold to Expo-Secure Store:", error);
    }
  };

  const handleFontFamilyChange = async (value) => {
    setFontFamily(value);
    try {
      await SecureStore.setItemAsync("fontFamily", JSON.stringify(value));
    } catch (error) {
      console.error("Error saving font family to Expo-Secure Store:", error);
    }
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
      <Text
        style={[
          styles.infoText,
          {
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: isBold ? "bold" : "normal",
          },
        ]}
      >
        {textStrings[selectedLanguage].currentSelections}
        {"\n\n"}
        {textStrings[selectedLanguage].chosenLanguage}{" "}
        {textStrings[selectedLanguage].language}
        {"\n"}
        {textStrings[selectedLanguage].chosenFontSize}{" "}
        {fontSizesString[fontSize]}
        {"\n"}
        {textStrings[selectedLanguage].chosenFontFamily} {fontFamily}
        {"\n"}
        {isBold
          ? textStrings[selectedLanguage].boldOnText
          : textStrings[selectedLanguage].boldOffText}
      </Text>
      <RNPickerSelect
        items={languageOptions}
        placeholder={{
          label: textStrings[selectedLanguage].selectALanguage,
          value: null,
        }}
        value={selectedLanguage}
        onValueChange={(value) => handleLanguageSelection(value)}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        placeholder={{
          label: textStrings[selectedLanguage].selectFontSize,
          value: null,
        }}
        items={[
          { label: textStrings[selectedLanguage].small, value: 14 },
          { label: textStrings[selectedLanguage].default, value: 16 },
          { label: textStrings[selectedLanguage].large, value: 20 },
          { label: textStrings[selectedLanguage].extraLarge, value: 24 },
        ]}
        value={fontSize}
        onValueChange={(value) => handleFontSizeChange(value)}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        placeholder={{
          label: textStrings[selectedLanguage].selectFontFamily,
          value: null,
        }}
        items={[
          { label: "Arial", value: "Arial" },
          { label: "Helvetica", value: "Helvetica" },
          { label: "Georgia", value: "Georgia" },
          { label: "Times New Roman", value: "Times New Roman" },
          { label: "Courier New", value: "Courier New" },
          { label: "Palatino", value: "Palatino" },
          { label: "Verdana", value: "Verdana" },
          { label: "Impact", value: "Impact" },
        ]}
        value={fontFamily}
        onValueChange={(value) => handleFontFamilyChange(value)}
        style={pickerSelectStyles}
      />

      <TouchableOpacity style={styles.button} onPress={toggleBold}>
        <Text
          style={[
            styles.buttonText,
            {
              fontFamily: fontFamily,
              fontSize: Number(fontSize),
              fontWeight: isBold ? "bold" : "normal",
            },
          ]}
        >
          {isBold
            ? textStrings[selectedLanguage].boldOn
            : textStrings[selectedLanguage].boldOff}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
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
  infoText: {
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 25,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 25,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 25,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
  },
});

export default Settings;
