import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import * as SecureStore from "expo-secure-store";
import Translate from "./Translate";

const SplashPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log("Selected language (splash):", savedLanguage);
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();

    animation.start(() => {
      setTimeout(() => {
        navigation.replace("PreferredLanguage");
      }, 1000);
    });

    return () => animation.stop();
  }, [fadeAnim, navigation]);

  const textStrings = {
    en: {
      welcome: "Welcome to",
    },
    fr: {
      welcome: "Bienvenue à",
    },
    es: {
      welcome: "Bienvenido a",
    },
    ch: {
      welcome: "欢迎来到",
    },
    ru: {
      welcome: "Добро пожаловать в",
    },
    ar: {
      welcome: "مرحبًا بك في",
    },
    hi: {
      welcome: "आपका स्वागत है",
    },
    ja: {
      welcome: "ようこそ",
    },
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <Text style={[styles.text, styles.welcomeText]}>
          {textStrings[selectedLanguage].welcome}
        </Text>
        <Text style={[styles.text, styles.bold, styles.appName]}>
          TechBuddy
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    color: "#333333",
  },
  welcomeText: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default SplashPage;
