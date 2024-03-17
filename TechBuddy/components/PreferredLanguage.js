import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';

const PreferredLanguage = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Set default to 'en'
  const [fontFamily, setFontFamily] = useState(''); // State to store font family
  const [fontSize, setFontSize] = useState('');
  const [isBold, setIsBold] = useState('');

  useEffect(() => {
    // Load saved language from SecureStore on component mount
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
        if (savedLanguage) setSelectedLanguage(savedLanguage);
        const savedFontFamily = JSON.parse(await SecureStore.getItemAsync('fontFamily'));
        
        if (savedFontFamily) {
            console.log("Font family:", savedFontFamily)
          setFontFamily(savedFontFamily);
        }

        // Load font size
        const savedFontSize = await SecureStore.getItemAsync('fontSize');
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync('isBold');
        if (savedIsBold) {
            console.log("Is bold:", savedIsBold);
            setIsBold(savedIsBold);
        }
      } catch (error) {
        console.error('Error loading saved language:', error);
      }
    };

    loadSavedLanguage();
  }, []);

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Français', value: 'fr' },
    { label: 'Español', value: 'es' },
    { label: 'Chinese', value: 'ch' },
    { label: 'Russian', value: 'ru' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Japanese', value: 'ja' },
  ];

  const handleLanguageSelection = async (value) => {
    setSelectedLanguage(value);
    try {
      // Save selected language to AsyncStorage
      await SecureStore.setItemAsync('selectedLanguage', value);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Welcome text */}
      <Text style={[styles.welcomeText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>Welcome to TechBuddy!</Text>

      {/* Language dropdown */}
      <RNPickerSelect
        items={languageOptions}
        placeholder={{ label: 'Select a language', value: null }}
        value={selectedLanguage}
        onValueChange={(value) => handleLanguageSelection(value)}
        style={pickerSelectStyles}
      />

      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        disabled={!selectedLanguage}
        onPress={() => {
          // Navigate to the next screen or perform actions based on the language selection
          navigation.navigate('UpdateFont');
        }}>
        <Text style={[styles.continueButtonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'stretch',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
});

export default PreferredLanguage;
