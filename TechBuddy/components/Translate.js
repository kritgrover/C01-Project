import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import axios from "axios";
import he from "he";

const API_KEY = "XYZ";
const API_URL = "https://translation.googleapis.com/language/translate/v2";

const Translate = ({ text, targetLanguage }) => {
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    try {
      const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
        q: text,
        target: targetLanguage,
      });
      // setTranslatedText(response.data.data.translations[0].translatedText || '');
      const decodedText = he.decode(
        response.data.data.translations[0].translatedText || ""
      );
      setTranslatedText(decodedText);
    } catch (error) {
      console.error("Error translating text:", error);
      setTranslatedText("");
    }
  };

  // Translate the text when the component mounts
  useEffect(() => {
    translateText();
  }, [targetLanguage]);

  return <Text>{translatedText}</Text>;
};

export default Translate;
