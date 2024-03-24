import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import Translate from "./Translate";

const accessSettings = function () {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState('');

  useEffect(() => {
    const loadSavedLanguage = async () => {
        try {
            const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
            if (savedLanguage) {
                console.log("Selected language: (in LanguageChange.js) ", savedLanguage);
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
            console.error('Error loading saved language:', error);
        }
    };

    loadSavedLanguage();
}, []);

  return (
    <View style={styles.menuContainer}>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="Every phone will have an Accessibility option in Settings. This section allows you to change certain parts of your phone to make it more user friendly." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="1) Go to your settings. (There is a link on the bottom of this page that will take you to your settings)" targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="2) Go to the search option. (Indicated with a magnifying glass)" targetLanguage={selectedLanguage} />
      </Text>
      {/* <img src={SettingsPicture} alt="Search Image" /> */}
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="3) Type in 'Accessibility'." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="4) Many options will appear. Pick the option 'Accessibility by tapping on it." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="5) Your phone may have different options at this point. Pick the settings that help you use your phone better." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="Below is a button which will directly lead you to the accessibility option on your settings. Tap it to immediately get to this page." targetLanguage={selectedLanguage} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    margin: "auto",
    justifyContent: "top",
    alignItems: "center",
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
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default accessSettings