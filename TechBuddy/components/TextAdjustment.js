import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';

const TextAdjustment = () => {
  const navigation = useNavigation();
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [fontFamily, setFontFamily] = useState('Arial');

  const sampleText = 'Sample Text';

  useEffect(() => {
    // Load saved values from SecureStore on component mount
    const loadSavedValues = async () => {
      try {
        const savedFontSize = await SecureStore.getItemAsync('fontSize');
        const savedFontFamily = JSON.parse(await SecureStore.getItemAsync('fontFamily'));
        const savedIsBold = await SecureStore.getItemAsync('isBold');

        if (savedFontSize) setFontSize(Number(savedFontSize));
        if (savedFontFamily) setFontFamily(savedFontFamily);
        if (savedIsBold) setIsBold(savedIsBold === 'true');
      } catch (error) {
        console.error('Error loading saved values:', error);
      }
    };

    loadSavedValues();
  }, []);

  const handleFontSizeChange = async (value) => {
    setFontSize(value);
    try {
      // Save font size to AsyncStorage
      await SecureStore.setItemAsync('fontSize', String(value));
    } catch (error) {
      console.error('Error saving font size to AsyncStorage:', error);
    }
  };

  const toggleBold = async () => {
    setIsBold((prevIsBold) => !prevIsBold);
    try {
      // Save isBold to AsyncStorage
      await SecureStore.setItemAsync('isBold', String(!isBold));
    } catch (error) {
      console.error('Error saving isBold to AsyncStorage:', error);
    }
  };

  const handleFontFamilyChange = async (value) => {
    setFontFamily(value);
    try {
      // Save font family to AsyncStorage
      await SecureStore.setItemAsync('fontFamily', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving font family to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sampleText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
        {sampleText}
      </Text>

      <TouchableOpacity style={styles.button} onPress={toggleBold}>
        <Text style={styles.buttonText}>{isBold ? 'Disable Bold' : 'Enable Bold'}</Text>
      </TouchableOpacity>

      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select Font Size', value: null }}
          items={[
            { label: 'Small', value: 14 },
            { label: 'Normal', value: 16 },
            { label: 'Large', value: 20 },
            { label: 'Extra-Large', value: 24}
          ]}
          onValueChange={(value) => handleFontSizeChange(value)}
          style={pickerStyles}
        />

        <RNPickerSelect
          placeholder={{ label: 'Select Font Family', value: null }}
          items={[
            { label: 'Arial', value: 'Arial' },
            { label: 'Helvetica', value: 'Helvetica' },
            { label: 'Georgia', value: 'Georgia' },
            { label: 'Times New Roman', value: 'Times New Roman' },
            { label: 'Courier New', value: 'Courier New' },
            { label: 'Palatino', value: 'Palatino' },
            { label: 'Verdana', value: 'Verdana' },
            { label: 'Impact', value: 'Impact' },
          ]}
          onValueChange={(value) => handleFontFamilyChange(value)}
          style={pickerStyles}
        />
      </View>
      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        
        onPress={() => {
          // Navigate to the next screen or perform actions based on the language selection
          navigation.navigate('HomeScreen');
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
  sampleText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
});

export default TextAdjustment;
