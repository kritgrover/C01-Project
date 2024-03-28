import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';

const PreferredLanguage = () => {
	const navigation = useNavigation();
	const [selectedLanguage, setSelectedLanguage] = useState('en');
	const [fontFamily, setFontFamily] = useState('');
	const [fontSize, setFontSize] = useState(16);
	const [isBold, setIsBold] = useState('');

	useEffect(() => {
		const loadSavedLanguage = async () => {
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

	const textStrings = {
		en: {
			welcomeText: 'Welcome to TechBuddy!',
			continueButtonText: 'Continue',
			selectALanguage: 'Select a language'
		},
		fr: {
			welcomeText: 'Bienvenue chez TechBuddy!',
			continueButtonText: 'Continuez',
			selectALanguage: 'Sélectionnez une langue'
		},
		es: {
			welcomeText: '¡Bienvenido a TechBuddy!',
			continueButtonText: 'Continuar',
			selectALanguage: 'Selecciona un idioma'
		},
		ch: {
			welcomeText: '欢迎来到科技伙伴！',
			continueButtonText: '下一个',
			selectALanguage: '选择语言'
		},
		ru: {
			welcomeText: 'Добро пожаловать в TechBuddy!',
			continueButtonText: 'следующий',
			selectALanguage: 'Выберите язык'
		},
		ar: {
			welcomeText: 'مرحبا بكم في TechBuddy!',
			continueButtonText: 'يكمل',
			selectALanguage: 'اختر لغة'
		},
		hi: {
			welcomeText: 'टेकबडी में आपका स्वागत है!',
			continueButtonText: 'आगे',
			selectALanguage: 'भाषा चुनें'
		},
		ja: {
			welcomeText: 'TechBuddy へようこそ!',
			continueButtonText: '次',
			selectALanguage: '言語を選択してください'
		}
	};

	const languageOptions = [
		{ label: 'English', value: 'en' },
		{ label: 'Français', value: 'fr' },
		{ label: 'Español', value: 'es' },
		{ label: '中文', value: 'ch' },
		{ label: 'русский', value: 'ru' },
		{ label: 'عربى', value: 'ar' },
		{ label: 'हिंदी', value: 'hi' },
		{ label: '日本語', value: 'ja' },
	];

	const handleLanguageSelection = async (value) => {
		setSelectedLanguage(value);
		try {
			await SecureStore.setItemAsync('selectedLanguage', value);
		} catch (error) {
			console.error('Error saving language to Expo-Secure Store:', error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.welcomeText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>{textStrings[selectedLanguage].welcomeText}</Text>

			<RNPickerSelect
				items={languageOptions}
				placeholder={{ label: textStrings[selectedLanguage].selectALanguage, value: null }}
				value={selectedLanguage}
				onValueChange={(value) => handleLanguageSelection(value)}
				style={pickerSelectStyles}
			/>

			<TouchableOpacity
				style={styles.continueButton}
				disabled={!selectedLanguage}
				onPress={() => {
					navigation.navigate('UpdateFont');
				}}>
				<Text style={[styles.continueButtonText, { fontFamily: fontFamily, fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>{textStrings[selectedLanguage].continueButtonText}</Text>
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
		// fontSize: 18,
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
