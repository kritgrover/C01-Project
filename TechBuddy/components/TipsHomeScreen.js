import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native"

const TipsScreen = function ()
{
    const navigate = useNavigation();
    const [fontSize, setFontSize] = useState(16);
	  const [isBold, setIsBold] = useState('');
	  const [fontFamily, setFontFamily] = useState('');
	  const [selectedLanguage, setSelectedLanguage] = useState('en');

    useEffect(() => {
      const loadSavedValues = async () => {
        try {
          const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
          if (savedLanguage) {
            console.log("Selected language:", savedLanguage);
            setSelectedLanguage(savedLanguage);
          } else {
            setSelectedLanguage('en');
          }
  
          const savedFontFamily = JSON.parse(await SecureStore.getItemAsync('fontFamily'));
  
          if (savedFontFamily) {
            console.log("Font family:", savedFontFamily)
            setFontFamily(savedFontFamily);
          } else {
            setFontFamily('Arial');
          }
  
          const savedFontSize = await SecureStore.getItemAsync('fontSize');
          if (savedFontSize !== null && savedFontSize !== "" && savedFontSize !== "null") {
            console.log("Font size:", savedFontSize);
            setFontSize(Number(savedFontSize));
          } else {
            setFontSize(16);
          }
  
          const savedIsBold = await SecureStore.getItemAsync('isBold');
          if (savedIsBold) {
            console.log("Is bold:", savedIsBold);
            setIsBold(savedIsBold);
          } else {
            setIsBold(false);
          }
        } catch (error) {
          console.error('Error loading saved values:', error);
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
    }

    const tipsMenu = 
        [{
            title: textStrings[selectedLanguage].languageChange,
            link: 'SettingsLanguagechange'
        },
        {
            title: textStrings[selectedLanguage].accessibilitySettings,
            link: 'AccessSettings'
        },
        {
            title: textStrings[selectedLanguage].loggingInToApps,
            link: 'LoginsToApps'
        },
        {
            title: textStrings[selectedLanguage].yourPhone,
            link: 'PhoneHardware'
        }
      
      ]


    return (
        <View style={styles.menuContainer}>
            {tipsMenu.map(function(link)
                {
                    return <Pressable key={link.title} onPress={function() {navigate.navigate(link.link)}} style={styles.navigateButton}>
                        <Text style={[styles.buttonText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>{link.title}</Text>
                    </Pressable>
                })}
        </View>
    )

}



const styles = StyleSheet.create({
    menuContainer: {
      width: '100%',
      height: '100%',
      margin: 'auto',
      justifyContent: "center",
      alignItems: "center",
    },
    navigateButton: {
      width: 200,
      height: 50,
      backgroundColor: "grey",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: 10
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
  });


export default TipsScreen
