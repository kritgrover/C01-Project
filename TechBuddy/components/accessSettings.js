import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SettingsPicture from "../assets/SettingsPicture.png";
import Translate from "./Translate";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useNavigation } from "@react-navigation/native";
import Speak from "./Speak";

const AccessSettings = function () {
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
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log(
            "Selected language: (AccessSettings) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
          console.log("Selected language (AccessSettings - false version):", savedLanguage);
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
          console.log("Font family (AccessSettings):", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
          console.log("Font family (AccessSettings - false version):", savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size (AccessSettings):", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
          console.log("Font size (AccessSettings - false version):", savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold !== null && savedIsBold !== "" && savedIsBold !== "null" && savedIsBold == "true") {
          console.log("Is bold (AccessSettings):", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
          console.log("Is bold (AccessSettings - false version):", savedIsBold);
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
      preText: "Every phone will have an Accessibility option in Settings. This section allows you to change certain parts of your phone to make it more user friendly.",
      num1: "1) Go to your settings.",
      num2: "2) Go to the search option. (Indicated with a magnifying glass)",
      num3: "3) Type in 'Accessibility'.",
      num4: "4) Many options will appear. Pick the option 'Accessibility by tapping on it.",
      num5: "5) Your phone may have different options at this point. Pick the settings that help you use your phone better.",
    },
    fr: {
      back: "Retour",
      preText: "Chaque téléphone aura une option d'accessibilité dans les paramètres. Cette section vous permet de modifier certaines parties de votre téléphone pour le rendre plus convivial.",
      num1: "1) Allez dans vos paramètres.",
      num2: "2) Allez à l'option de recherche. (Indiqué par une loupe)",
      num3: "3) Tapez 'Accessibilité'.",
      num4: "4) De nombreuses options apparaîtront. Choisissez l'option 'Accessibilité en appuyant dessus.",
      num5: "5) Votre téléphone peut avoir différentes options à ce stade. Choisissez les paramètres qui vous aident à mieux utiliser votre téléphone.",
    },
    es: {
      back: "Atrás",
      preText: "Cada teléfono tendrá una opción de accesibilidad en Configuración. Esta sección le permite cambiar ciertas partes de su teléfono para que sea más fácil de usar.",
      num1: "1) Ve a tus ajustes.",
      num2: "2) Ve a la opción de búsqueda. (Indicado con una lupa)",
      num3: "3) Escribe 'Accesibilidad'.",
      num4: "4) Aparecerán muchas opciones. Elija la opción 'Accesibilidad' tocándola.",
      num5: "5) Su teléfono puede tener diferentes opciones en este punto. Elija la configuración que le ayude a usar su teléfono mejor.",
    },
    ch: {
      back: "回去",
      preText: "每部手机都会在设置中有一个辅助功能选项。此部分允许您更改手机的某些部分，使其更加用户友好。",
      num1: "1) 进入您的设置。",
      num2: "2) 转到搜索选项。 (用放大镜表示)",
      num3: "3) 输入“辅助功能”。",
      num4: "4) 将出现许多选项。通过点击“辅助功能”选项来选择。",
      num5: "5) 此时，您的手机可能具有不同的选项。选择可帮助您更好地使用手机的设置。",
    },
    ru: {
      back: "назад",
      preText: "У каждого телефона есть опция доступности в настройках. Этот раздел позволяет изменить определенные части вашего телефона, чтобы сделать его более удобным для пользователя.",
      num1: "1) Перейдите в настройки.",
      num2: "2) Перейдите к опции поиска. (Обозначено увеличительным стеклом)",
      num3: "3) Введите 'Доступность'.",
      num4: "4) Появится много вариантов. Выберите опцию 'Доступность', нажав на нее.",
      num5: "5) На этом этапе ваш телефон может иметь разные варианты. Выберите настройки, которые помогут вам лучше пользоваться телефоном.",
    },
    ar: {
      back: "عودة",
      preText: "سيكون لدى كل هاتف خيار إمكانية الوصول في الإعدادات. تتيح لك هذه القسم تغيير أجزاء معينة من هاتفك لجعله أكثر ودية للمستخدم.",
      num1: "1) اذهب إلى الإعدادات الخاصة بك.",
      num2: "2) انتقل إلى خيار البحث. (المشار إليه بعدسة مكبرة)",
      num3: "3) اكتب 'إمكانية الوصول'.",
      num4: "4) ستظهر العديد من الخيارات. اختر الخيار 'إمكانية الوصول' بالنقر عليه.",
      num5: "5) قد يحتوي هاتفك على خيارات مختلفة في هذه المرحلة. اختر الإعدادات التي تساعدك على استخدام هاتفك بشكل أفضل.",
    },
    hi: {
      back: "वापस",
      preText: "प्रत्येक फोन में सेटिंग्स में एक पहुंचने का विकल्प होगा। इस खंड में आप अपने फोन के कुछ हिस्सों को बदलने की अनुमति देता है ताकि इसे उपयोगकर्ता के लिए अधिक उपयोगी बना सकें।",
      num1: "1) अपनी सेटिंग्स पर जाएं।",
      num2: "2) खोज विकल्प पर जाएं। (एक बड़ी कांच के साथ संकेतित)",
      num3: "3) 'पहुंचने' लिखें।",
      num4: "4) कई विकल्प दिखाई देंगे। इसे टैप करके 'पहुंचने' विकल्प को चुनें।",
      num5: "5) इस समय आपके फोन में विभिन्न विकल्प हो सकते हैं। अपने फोन का बेहतर उपयोग करने में मदद करने वाली सेटिंग्स को चुनें।",
    },
    ja: {
      back: "バック",
      preText: "すべての電話には、設定にアクセシビリティオプションがあります。このセクションでは、電話の特定の部分を変更して、よりユーザーフレンドリーにします。",
      num1: "1) 設定に移動します。",
      num2: "2) 検索オプションに移動します。 (虫眼鏡で示されています)",
      num3: "3) 'アクセシビリティ'と入力します。",
      num4: "4) 多くのオプションが表示されます。それをタップして 'アクセシビリティ'オプションを選択します。",
      num5: "5) この時点で、お使いの電話にはさまざまなオプションがあるかもしれません。電話をよりよく使用するのに役立つ設定を選択します。",
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
    <ScrollView>
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
            {textStrings[selectedLanguage].preText}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num1}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num2}
          </Text>
        </View>

        <Image
          style={{ width: "70%" }}
          resizeMode="contain"
          source={SettingsPicture}
          alt="Search Image"
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num3}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num4}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num5}
          </Text>
        </View>
      </View>
      <Speak text={textStrings[selectedLanguage].preText+textStrings[selectedLanguage].num1+textStrings[selectedLanguage].num2+textStrings[selectedLanguage].num3+textStrings[selectedLanguage].num4+textStrings[selectedLanguage].num5} language={selectedLanguage === 'ch'? 'zh': selectedLanguage} showText={true}></Speak>
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
    marginHorizontal: 20,
    padding: 10,
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

export default AccessSettings;
