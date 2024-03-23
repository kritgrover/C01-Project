import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import axios from 'axios';

const API_KEY = 'XYZ';

const Translate = ({ text, targetLanguage }) => {
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: targetLanguage,
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('');
    }
  };

  // Translate the text when the component mounts
  useEffect(() => {
    translateText();
  }, []);

  return <Text>{translatedText}</Text>;
};

export default Translate;
