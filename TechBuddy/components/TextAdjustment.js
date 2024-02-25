// components/TextAdjustment.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const TextAdjustment = () => {
    const navigation = useNavigation();
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [fontFamily, setFontFamily] = useState('normal');

  const sampleText = 'Sample Text';

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  const toggleBold = () => {
    setIsBold((prevIsBold) => !prevIsBold);
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
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
            { label: 'System', value: 'System' },
            { label: 'Arial', value: 'Arial' },
            { label: 'Helvetica', value: 'Helvetica' },
            { label: 'Georgia', value: 'Georgia' },
            { label: 'Times New Roman', value: 'Times New Roman' },
            { label: 'Courier New', value: 'Courier New' },
            { label: 'Courier', value: 'Courier' },
            { label: 'Palatino', value: 'Palatino' },
            { label: 'Verdana', value: 'Verdana' },
            { label: 'Impact', value: 'Impact' },
            { label: 'Lucida Console', value: 'Lucida Console' },
          ]}
          onValueChange={(value) => setFontFamily(value)}
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
