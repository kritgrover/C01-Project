import React from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import * as SecureStore from "expo-secure-store";

const Speak = ({ text, language, color, showText }) => {
  console.log("color", color);

  const [speaking, setSpeaking] = useState(false);
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
            "Selected language: (LogIns) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
          console.log("Selected language: (LogIns -- false version) ", selectedLanguage);
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
          console.log("Font family (LogIns):", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
          console.log("Font family (LogIns -- false version):", savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size (LogIns):", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
          console.log("Font size (LogIns -- false version):", savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold !== null && savedIsBold !== "" && savedIsBold !== "null" && savedIsBold == "true") {
          console.log("Is bold (LogIns):", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
          console.log("Is bold (LogIns -- false version):", savedIsBold);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();
  }, []);

  const textStrings = {
    en: {
        textToSpeech: "Text to Speech",
      },
      fr: {
        textToSpeech: "Texte à la parole",
      },
      es: {
        textToSpeech: "Texto a voz",
      },
      ch: {
        textToSpeech: "文字转语音",
      },
      ru: {
        textToSpeech: "Текст в речь",
      },
      ar: {
        textToSpeech: "نص إلى كلام",
      },
      hi: {
        textToSpeech: "टेक्स्ट से बोली बनाएं",
      },
      ja: {
        textToSpeech: "テキスト読み上げ",
      },
  }

  const reset = () => {
    setSpeaking(false);
  };

  const speak = () => {
    console.log("text:", text);

    if (!speaking) {
      console.log("hello", speaking);
      Speech.speak(text, {
        language: language ? language : "en",
        onDone: reset,
        onStopped: reset,
      });
      setSpeaking(true);
    } else {
      console.log("here...", speaking);
      Speech.stop();
      setSpeaking(false);
    }
  };

  return (
    <View>
      <Pressable style={SpeakStyle.button} onPress={speak}>
        <MaterialCommunityIcons
          name={speaking ? "pause" : "text-to-speech"}
          size={40}
          color={color ? color : "black"}
        />
        {showText && (
          <Text style={{ color: color ? color : "black", fontSize: Number(fontSize), fontWeight: isBold ? "bold" : "normal", fontFamily }}>{textStrings[selectedLanguage].textToSpeech}</Text>
        )}
      </Pressable>
    </View>
  );
};

const SpeakStyle = {
  button: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Speak;
