import { StatusBar } from "expo-status-bar";
import NavigationBar from "./NavigationBar";
import Tip from "./Tip";
import VoiceCommand from "./VoiceCommand";
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordManager from "./PasswordManager";
import Speak from "./Speak";
import EmergencyButton from "./EmergencyButton";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";

const HomeScreen = ({ navigation }) => {
	const [fontSize, setFontSize] = useState(16);
	const [isBold, setIsBold] = useState(false);
	const [fontFamily, setFontFamily] = useState('Arial');
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

	const textStrings = {
		en: {
			howToGuides: "Tips Home Page",
			openTips: "Open Tips",
			callPolice: "Call Police",
			emergency: "Emergency",
			openSettings: "Open Settings",
			goToPasswordManager: "Go To Password Manager",
		},
		fr: {
			howToGuides: "Page d'accueil des conseils",
			openTips: "Ouvrir les conseils",
			callPolice: "Appeler la police",
			emergency: "Urgence",
			openSettings: "Ouvrir les paramètres",
			goToPasswordManager: "Aller au gestionnaire de mots de passe",
		},
		es: {
			howToGuides: "Página de inicio de consejos",
			openTips: "Abrir consejos",
			callPolice: "Llamar a la policía",
			emergency: "Emergencia",
			openSettings: "Abrir ajustes",
			goToPasswordManager: "Ir al administrador de contraseñas",
		},
		ch: {
			howToGuides: "提示主页",
			openTips: "打开提示",
			callPolice: "打电话给警察",
			emergency: "紧急情况",
			openSettings: "打开设置",
			goToPasswordManager: "转到密码管理器",
		},
		ru: {
			howToGuides: "Домашняя страница советов",
			openTips: "Открыть советы",
			callPolice: "Позвонить в полицию",
			emergency: "Чрезвычайная ситуация",
			openSettings: "Открыть настройки",
			goToPasswordManager: "Перейти в менеджер паролей",
		},
		ar: {
			howToGuides: "صفحة النصائح الرئيسية",
			openTips: "فتح النصائح",
			callPolice: "اتصل بالشرطة",
			emergency: "طوارئ",
			openSettings: "فتح الإعدادات",
			goToPasswordManager: "انتقل إلى مدير كلمات المرور",
		},
		hi: {
			howToGuides: "टिप्स होम पेज",
			openTips: "टिप्स खोलें",
			callPolice: "पुलिस को बुलाओ",
			emergency: "आपातकालीन",
			openSettings: "सेटिंग्स खोलें",
			goToPasswordManager: "पासवर्ड प्रबंधक में जाएं",
		},
		ja: {
			howToGuides: "ヒントホームページ",
			openTips: "ヒントを開く",
			callPolice: "警察を呼び出す",
			emergency: "緊急事態",
			openSettings: "設定を開く",
			goToPasswordManager: "パスワードマネージャーに移動",
		},
	};

	const navigateToPasswordManager = () => {
		navigation.navigate("PasswordManager");
	};

	const navigateToAccount = () => {
		navigation.navigate("Settings");
	};
	const EmergencyRef = useRef(null);
	const TipRef = useRef(null);

	const navigateToHome = () => {
		navigation.navigate("HomeScreen");
	}

	// Set header options dynamically
	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<TouchableOpacity onPress={navigateToHome}>
					<Image source={homeIcon} style={styles.homeIcon} />
				</TouchableOpacity>
			),
			headerLeft: () => (
				<TouchableOpacity onPress={navigateToAccount} style={styles.headerButton}>
					<Image source={accountIcon} style={styles.accountIcon} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity onPress={navigateToPasswordManager} style={styles.headerButton}>
					<Image source={passwordIcon} style={styles.passwordIcon} />
				</TouchableOpacity>
			),
		});
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				<SafeAreaView style={styles.container}>
					<PasswordManager />
					<TouchableOpacity
						style={styles.continueButton}
						onPress={() => {
							navigation.navigate('TipsMenu');
						}}>
						<Text style={[styles.continueButtonText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]}>{textStrings[selectedLanguage].howToGuides}</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<Tip ref={TipRef} style={{ float: "right" }} />
				<EmergencyButton ref={EmergencyRef} />
			</ScrollView>
			<StatusBar style="auto" />
			<VoiceCommand language={selectedLanguage} refs={[{ trigger: textStrings[selectedLanguage].openTips, actual: TipRef }, { trigger: textStrings[selectedLanguage].callPolice, actual: EmergencyRef }, { trigger: textStrings[selectedLanguage].emergency, actual: EmergencyRef }]}></VoiceCommand>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		margin: 0,
		height: '100%'
	},
	button: {
		color: 'blue'
	},
	continueButton: {
		backgroundColor: '#4CAF50',
		padding: 0,
		borderRadius: 5,
		alignSelf: 'center',
		margin: 0,
		width: '75%'

	},
	continueButtonText: {
		color: 'white',
		// fontSize: 18,
		textAlign: 'center',
	},
	headerButton: {
		padding: 10,
		marginRight: 10,
	},
	headerButtonText: {
		color: 'blue',
		fontSize: 16,
	},
	homeIcon: {
		width: 30,
		height: 30,
	},
	accountIcon: {
		width: 40,
		height: 30,
	},
	passwordIcon: {
		width: 30,
		height: 30,
	},
});

export default HomeScreen;