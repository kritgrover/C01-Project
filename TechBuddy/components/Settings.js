import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Settings = () => {
	const navigation = useNavigation();
	const [fontFamily, setFontFamily] = useState('');
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

	const goToPreferredLanguage = () => {
		navigation.navigate('PreferredLanguage');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button]} onPress={goToPreferredLanguage}>
				<Text style={[styles.buttonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>Go to Preferred Language</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#4CAF50',
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 30,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
});

export default Settings;
