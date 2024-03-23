import React, {useState} from 'react';
import axios from 'axios';

const API_KEY = 'XYZ'; 

const translateText = async (text, targetLanguage) => {
    try {
        const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
            q: text,
            target: 'en',
            source: targetLanguage,
        });
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        return null;
    }
};

function Translate() {
    const [inputText, setInputText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        if (!sourceLanguage) {
            console.error('Please enter the source language.');
            return;
        }

        const translation = await translateText(inputText, sourceLanguage);
        if (translation) {
            setTranslatedText(translation);
        }
    };

    return (
        <div>
            <h1>Translate Text to English</h1>
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
            <br />
            <button onClick={handleTranslate}>Translate</button>
            <br />
            <h2>Translated Text:</h2>
            <p>{translatedText}</p>
        </div>
    );
}

export default Translate;
