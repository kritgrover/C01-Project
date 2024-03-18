import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
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
import SettingsPicture from '../assets/SettingsPicture';

const LanguageChange = function()
{

    return (
      <View style={styles.menuContainer}>
        <Text style={styles.instructionText}>Every phone has an option to change the language on it. This will change the language of everything presented on your phone. Here’s how to do it:</Text>
        <Text style={styles.instructionText}>1) Go to your settings. (There is a link on the bottom of this page that will take you to your settings)</Text>
        <Text style={styles.instructionText}>2) Go to Preferences, then Languages. (If you don’t see preferences, you may use the search icon in your Settings app to search “Languages”)</Text>
        <img src={SettingsPicture} alt='Search Image'/>
        <Text style={styles.instructionText}>3) There should be a “Your Selected Language” option, and it will be set to English. There should also be a “Select Language” option. Tap that button.</Text>
        <Text style={styles.instructionText}>4) A list of languages should appear, scroll through until you find the one you want.</Text>
        <Text style={styles.instructionText}>5) Some settings will ask you to verify that you want to change to the selected language. Make sure to select “Yes” or your changes will not be saved.</Text>
        <Text style={styles.instructionText}>Below is a button which will directly lead you to your languages option on your settings. Tap it to immediately get to your settings.</Text>

      </View>
    )
}

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    margin: 'auto',
    justifyContent: "top",
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
  instructionText: {
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default LanguageChange