import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'XYZ';

const translateText = async (text, sourceLanguage, targetLanguage) => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
};

function Translate() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!sourceLanguage || !targetLanguage) {
      console.error('Please enter both source and target languages.');
      return;
    }

    const translation = await translateText(inputText, sourceLanguage, targetLanguage);
    if (translation) {
      setTranslatedText(translation);
    }
  };

  return (
    <div>
      <h1>Translate Text</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
        rows={4}
        cols={50}
      />
      <br />
      <input
        type="text"
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
        placeholder="Enter source language code (e.g., 'fr' for French)"
      />
      <input
        type="text"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        placeholder="Enter target language code (e.g., 'en' for English)"
      />
      <br />
      <button onClick={handleTranslate}>Translate</button>
      <br />
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
}

export default Translate;
