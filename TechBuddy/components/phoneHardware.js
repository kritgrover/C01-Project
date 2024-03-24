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
import { useNavigation } from "@react-navigation/native";
import SettingsPicture from "../assets/SettingsPicture.png";
import Translate from "./Translate";

const LanguageChange = function () {
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
        <Translate text="Let's look at your phone. While every phone is different, every phone will have similar features." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="Every phone will have a set of 3 buttons. 2 buttons will be grouped together, and 1 button will be seperate. " targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="The 2 grouped together buttons are volume buttons. One will increase the volume, up to the phone's max volume, and one will decrease the volume, down to no noise. You may press the button to increase or decrease the volume by one level, or hold the button to increase or decrease the volume by many levels." targetLanguage={selectedLanguage} />
      </Text>
      {/* <img src={SettingsPicture} alt="Search Image" /> */}
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="The seperate button is a power button. When the phone is off, this button can be pressed to turn the phone on. When the phone is on, pressing the button will turn the phone off. Holding this button will provide several options like shutting down the phone permanently to save battery and restarting the phone." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="If the phone is permanently turned off, hold the power button to power up the phone and start it up again." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="The bottom of your phone has a charging port. Your phone can either use an Android charger (usually if your phone is older) or a USBC charger (if your phone is newer). To charge your phone, connect the charger to this port. Make sure you have the correct charger for your phone and that the charger is oriented the correct way. Do not force the charger cable into the port if it does not go in naturally. This could damage your phone." targetLanguage={selectedLanguage} />
      </Text>
      <Text style={[styles.instructionText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        <Translate text="On your phone, there may also be a circular hole. This is an AUX port. This is a fancy way to say that this is a place to connect any audio device, like headphones or a stereo, to play music that your phone would emit, instead of from your phone to begin with." targetLanguage={selectedLanguage} />
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