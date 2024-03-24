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

const logInsToApps = function () {
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
        <Translate text="Many apps (like this one) will require you to 'Log In' or 'Sign In'. This may seem annoying, but it is an important step to ensure your security and comfort." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="How do you log in to an app? Here is a step by step guide." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="1) If you are using an app for the first time, the app will ask you to 'Sign Up'. This means creating an account for your use of an app." targetLanguage={selectedLanguage} />
      </Text>
      {/* <img src={SettingsPicture} alt="Search Image" /> */}
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="2) If you are asked to 'Sign Up', you will be asked for a Username and Password. Type in a Username and Password. You can use anything for the Username and Password, so make sure you will remember them, or write them down somewhere. Your password is used to secure your account. Many apps will require your password to fulfill certain critera. (Like being a certain size of having special characters) This is to help secure your account" targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="3) Some apps will ask you to Confirm Password. This is to make sure that you typed in the password correctly. Put in the same password as you've done before." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="4) Some apps will ask you to Confirm You're Not A Robot. This is because there are robots that can automatically make millions of accounts on websites to do malicious activities on behalf of an individual. They may ask you to click a checkmark or play a small game. Do as they say. Sometimes, several attempts are needed." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="5) After making an account, to log in to that account, click the Sign In or Log In option on the app if it shows up. Type the same Username and Password as you did when you made the account. If you forgot your Username or Password, click the option 'Forgot Password'. The app will give you directions on how to get your password back, or maybe reset it to another one." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="This may seem tedious, but having an account for an app does a lot. It keeps you secure, and helps those apps tailor content for you. For YouTube for example, YouTube will only show you options related to what you like, like cooking videos, and doesn't show you what you won't like, like motorcycle videos." targetLanguage={selectedLanguage} />
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

export default logInsToApps