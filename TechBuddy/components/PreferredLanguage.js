import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const PreferredLanguage = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Set default to 'en'

  useEffect(() => {
    // Load saved language from SecureStore on component mount
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
        if (savedLanguage) setSelectedLanguage(savedLanguage);
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
      <Text style={styles.welcomeText}>Welcome to TechBuddy!</Text>

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
        <Text style={styles.continueButtonText}>Continue</Text>
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
    fontWeight: 'bold',
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
