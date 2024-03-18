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

const EmergencyButton = () => {
  const navigate = useNavigation()
  const handleEmergencyCall = () => {
    let phoneNumber = "911";

		if (Platform.OS === "android") {
			phoneNumber = `tel:${phoneNumber}`;
		} else {
			phoneNumber = `telprompt:${phoneNumber}`;
		}
		Linking.openURL(phoneNumber);
	};

	const [fontFamily, setFontFamily] = useState(''); // State to store font family
	const [fontSize, setFontSize] = useState('');
	const [isBold, setIsBold] = useState('');

	useEffect(() => {
		const loadFontSettings = async () => {
			try {
				const savedFontFamily = JSON.parse(await SecureStore.getItemAsync('fontFamily'));
				if (savedFontFamily) {
					console.log("Font family:", savedFontFamily)
					setFontFamily(savedFontFamily);
				}

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
				console.error('Error loading font settings:', error);
			}
		};

		loadFontSettings();
	}, []);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.navigateButton}
        underlayColor="blue"
        onPress = {function() {navigate.navigate('TipsMenu')}}>
        <Text style={[styles.buttonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>Lessons</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={handleEmergencyCall}
        underlayColor="darkred" // Adjust the color when pressed
      >
        <Text style={[styles.buttonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>Emergency</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%'
  },
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 'auto',
    position: 'relative',
    marginTop: '10%',
    height: 40,
    width: 100,
    marginBottom: '10%',
    justifyContent: "center",
  },
  navigateButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 'auto',
    position: 'relative',
    marginTop: '10%',
    height: 40,
    width: 100,
    marginBottom: '10%',
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default EmergencyButton;
