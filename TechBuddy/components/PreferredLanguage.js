import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const PreferredLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Set default to 'en'

  const languageOptions = [
    { key: 0, label: 'English', value: 'en' },
    { key: 1, label: 'Français', value: 'fr' },
    { key: 2, label: 'Español', value: 'es' },
    { key: 3, label: 'Chinese', value: 'ch'},
    { key: 4, label: 'Russian', value: 'ru'},
    { key: 5, label: 'Arabic', value: 'ar'},
    { key: 6, label: 'Hindi', value: 'hi'},
    { key: 7, label: 'Japanese', value: 'ja'},

    // Add more language options as needed
    
  ];

  const handleLanguageSelection = (option) => {
    setSelectedLanguage(option.value);
    // You can perform additional actions here based on the selected language
    // For example, you might want to store the language preference in AsyncStorage
  };

  return (
    <View style={styles.container}>
      {/* Welcome text */}
      <Text style={styles.welcomeText}>Welcome to TechBuddy!</Text>

      {/* Language dropdown */}
      <ModalSelector
        data={languageOptions}
        initValue="Select a language"
        accessible={true}
        scrollViewAccessibilityLabel={'Scrollable options'}
        cancelButtonAccessibilityLabel={'Cancel Button'}
        onChange={(option) => handleLanguageSelection(option)}
        animationType="slide"
        backdropPressToClose={true}
        cancelText="Cancel"
        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}
        optionContainerStyle={styles.optionContainerStyle}
        optionTextStyle={styles.optionTextStyle}
      />

      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        disabled={!selectedLanguage}
        onPress={() => {
          // Navigate to the next screen or perform actions based on the language selection
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
  // Additional styles for the dropdown
  selectStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  selectTextStyle: {
    fontSize: 18,
    color: '#333',
  },
  optionContainerStyle: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 2,
  },
  optionTextStyle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    padding: 10,
  },
});

export default PreferredLanguage;
