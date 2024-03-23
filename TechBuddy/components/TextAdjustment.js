import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';

const TextAdjustment = () => {
	const navigation = useNavigation();
	const [fontSize, setFontSize] = useState(16);
	const [isBold, setIsBold] = useState('');
	const [fontFamily, setFontFamily] = useState('');
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	useEffect(() => {
		const loadSavedValues = async () => {
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
				console.error('Error loading saved values:', error);
			}
		};

		loadSavedValues();
	}, []);

	const handleFontSizeChange = async (value) => {
		setFontSize(value);
		try {
			await SecureStore.setItemAsync('fontSize', String(value));
		} catch (error) {
			console.error('Error saving font size to Expo-Secure Store:', error);
		}
	};

	const toggleBold = async () => {
		setIsBold((prevIsBold) => !prevIsBold);
		try {
			await SecureStore.setItemAsync('isBold', String(!isBold));
		} catch (error) {
			console.error('Error saving isBold to Expo-Secure Store:', error);
		}
	};

	const handleFontFamilyChange = async (value) => {
		setFontFamily(value);
		try {
			await SecureStore.setItemAsync('fontFamily', JSON.stringify(value));
		} catch (error) {
			console.error('Error saving font family to Expo-Secure Store:', error);
		}
	};

	const textStrings = {
		en: {
			sampleText: 'Sample Text',
			continueButtonText: 'Continue',
			boldOn: 'Disable Bold',
			boldOff: 'Enable Bold',
			selectFontSize: 'Select Font Size',
			selectFontFamily: 'Select Font Family',
			small: 'Small',
			default: 'Default',
			large: 'Large',
			extraLarge: 'Extra-Large',
		},
		fr: {
			sampleText: 'Exemple de texte',
			continueButtonText: 'Continuez',
			boldOn: 'Désactivez le gras',
			boldOff: 'Activez le gras',
			selectFontSize: 'Sélectionnez la taille de la police',
			selectFontFamily: 'Sélectionnez une famille de polices',
			small: 'Petit',
			default: 'Défaut',
			large: 'Grand',
			extraLarge: 'Très Grand',
		},
		es: {
			sampleText: 'Texto de ejemplo',
			continueButtonText: 'Continuar',
			boldOn: 'Desactivar negrita', 
			boldOff: 'Habilitar negrita',
			selectFontSize: 'Seleccionar tamaño de fuente',
			selectFontFamily: 'Seleccionar familia de fuentes',
			small: 'Pequeño',
			default: 'Por defecto',
			large: 'Grande',
			extraLarge: 'Extra grande',
		},
		ch: {
			sampleText: '示例文本',
			continueButtonText: '继续',
			boldOn: '禁用粗体',
			boldOff: '启用粗体',
			selectFontSize: '选择字体大小',
			selectFontFamily: '选择字体系列',
			small: '小的',
			default: '普通的',
			large: '大的',
			extraLarge: '特大号',
		},
		ru: {
			sampleText: 'Образец текста',
			continueButtonText: 'следующий',
			boldOn: 'Отключить жирный шрифт',
			boldOff: 'Включить жирный шрифт',
			selectFontSize: 'Выберите размер шрифта',
			selectFontFamily: 'Выберите семейство шрифтов',
			small: 'Маленький',
			default: 'Нормальный',
			large: 'Большой',
			extraLarge: 'Очень большой',
		},
		ar: {
			sampleText: 'نص بسيط',
			continueButtonText: 'يكمل',
			boldOn: 'تعطيل غامق',
			boldOff: 'تمكين غامق',
			selectFontSize: 'حدد حجم الخط',
			selectFontFamily: 'حدد عائلة الخطوط',
			small: 'صغير',
			default: 'طبيعي',
			large: 'كبير',
			extraLarge: 'كبير جدا',
		},
		hi: {
			sampleText: 'सेम्पल विषय',
			continueButtonText: 'आगे',
			boldOn: 'बोल्ड अक्षम करें',
			boldOff: 'बोल्ड सक्षम करें',
			selectFontSize: 'फ़ॉन्ट आकार चुनें',
			selectFontFamily: 'एक फ़ॉन्ट परिवार चुनें',
			small: 'छोटा',
			default: 'सामान्य',
			large: 'बड़ा',
			extraLarge: 'ज्यादा बड़ा',
		},
		ja: {
			sampleText: 'サンプルテキスト',
			continueButtonText: '次',
			boldOn: '太字を無効にする',
			boldOff: '太字を有効にする',
			selectFontSize: 'フォントサイズを選択してください',
			selectFontFamily: 'フォントファミリーを選択してください',
			small: '小さい',
			default: '普通',
			large: '大きい',
			extraLarge: '特大',
		}
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.sampleText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>
				{textStrings[selectedLanguage].sampleText}
			</Text>

			<TouchableOpacity style={styles.button} onPress={toggleBold}>
			<Text style={[styles.buttonText, { fontFamily: fontFamily, fontSize: Number(fontSize), fontWeight: isBold ? 'bold' : 'normal' }]}>{isBold ? textStrings[selectedLanguage].boldOn : textStrings[selectedLanguage].boldOff}</Text>
			</TouchableOpacity>

			<View style={styles.pickerContainer}>
				<RNPickerSelect
					placeholder={{ label: textStrings[selectedLanguage].selectFontSize, value: null }}
					items={[
						{ label: textStrings[selectedLanguage].small, value: 14 },
						{ label: textStrings[selectedLanguage].default, value: 16 },
						{ label: textStrings[selectedLanguage].large, value: 20 },
						{ label: textStrings[selectedLanguage].extraLarge, value: 24 }
					]}
					onValueChange={(value) => handleFontSizeChange(value)}
					style={pickerStyles}
				/>

				<RNPickerSelect
					placeholder={{ label: textStrings[selectedLanguage].selectFontFamily, value: null }}
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
			<TouchableOpacity
				style={styles.continueButton}

				onPress={() => {
					navigation.navigate('HomeScreen');
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
