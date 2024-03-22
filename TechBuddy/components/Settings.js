import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Settings = () => {
	const navigation = useNavigation();
	const [fontFamily, setFontFamily] = useState('');
	const [fontSize, setFontSize] = useState('');
	const [isBold, setIsBold] = useState('');
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	useEffect(() => {
		const loadFontSettings = async () => {
			try {
				const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
				if (savedLanguage) {
					console.log("Selected language:", savedLanguage);
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
				if (savedFontSize) {
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
				console.error('Error loading font settings:', error);
			}
		};

		loadFontSettings();
	}, []);

	const goToPreferredLanguage = () => {
		navigation.navigate('PreferredLanguage');
	};

	const textStrings = {
		en: {
			buttonText: 'Go To Preferred Language'
		},
		fr: {
			buttonText: 'Aller à la langue préférée'
		},
		es: {
			buttonText: 'Ir al idioma preferido'
		},
		ch: {
			buttonText: '前往首选语言'
		},
		ru: {
			buttonText: 'Перейти к предпочтительному языку'
		},
		ar: {
			buttonText: 'الانتقال إلى اللغة المفضلة'
		},
		hi: {
			buttonText: 'पसंदीदा भाषा पर जाएं'
		},
		ja: {
			buttonText: '好きな言語に移動'
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button]} onPress={goToPreferredLanguage}>
			<Text style={[styles.buttonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>{textStrings[selectedLanguage].buttonText}</Text>
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
