import React from "react";
import { StyleSheet, Text, View, Pressable, Modal, Button } from "react-native";
import { useState, useEffect, forwardRef, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Speak from './Speak';
import VoiceCommand from "./VoiceCommand";
import * as SecureStore from 'expo-secure-store';

const Tip = forwardRef((props, ref) => {
    const [tips, setTips] = useState(undefined);
    const [showTip, setShowTip] = useState(false);
    const [index, setIndex] = useState(0);
    const [fontSize, setFontSize] = useState(16);
	const [isBold, setIsBold] = useState('');
	const [fontFamily, setFontFamily] = useState('');
	const [selectedLanguage, setSelectedLanguage] = useState('en');

    const nextRef = useRef(null);
    const dismissRef = useRef(null);

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
			emergencyTitle: 'In Case of Emergency',
            emergencyContent: 'Click the red Emergency button to contact the police.',
            navigateTitle: 'Navigate',
            navigateContent: 'To go to any screen, click the buttons at the top of the page.',
            accessTitle: 'Access How-to-guides',
            accessContent: 'You can access guides about your phone by clicking on the how - to button',
		},
		fr: {
			emergencyTitle: 'En cas d\'urgence',
            emergencyContent: 'Cliquez sur le bouton d\'urgence rouge pour contacter la police.',
            navigateTitle: 'Naviguer',
            navigateContent: 'Pour aller à n\'importe quel écran, cliquez sur les boutons en haut de la page.',
            accessTitle: 'Accéder aux guides pratiques',
            accessContent: 'Vous pouvez accéder aux guides concernant votre téléphone en cliquant sur le bouton comment faire',
		},
		es: {
			emergencyTitle: 'En caso de emergencia',
            emergencyContent: 'Haga clic en el botón de emergencia rojo para contactar a la policía.',
            navigateTitle: 'Navegar',
            navigateContent: 'Para ir a cualquier pantalla, haga clic en los botones en la parte superior de la página.',
            accessTitle: 'Acceder a las guías',
            accessContent: 'Puede acceder a guías sobre su teléfono haciendo clic en el botón cómo hacer',
		},
		ch: {
			emergencyTitle: '紧急情况下',
            emergencyContent: '点击红色紧急按钮联系警察。',
            navigateTitle: '导航',
            navigateContent: '要转到任何屏幕，请单击页面顶部的按钮。',
            accessTitle: '访问操作指南',
            accessContent: '您可以通过单击如何按钮访问有关您的电话的指南',
		},
		ru: {
			emergencyTitle: 'В случае чрезвычайной ситуации',
            emergencyContent: 'Нажмите красную кнопку экстренного вызова, чтобы связаться с полицией.',
            navigateTitle: 'Навигация',
            navigateContent: 'Чтобы перейти на любой экран, нажмите кнопки в верхней части страницы.',
            accessTitle: 'Доступ к руководствам',
            accessContent: 'Вы можете получить доступ к руководствам о вашем телефоне, нажав кнопку как',
		},
		ar: {
			emergencyTitle: 'في حالة الطوارئ',
            emergencyContent: 'انقر فوق الزر الأحمر للطوارئ للاتصال بالشرطة.',
            navigateTitle: 'تصفح',
            navigateContent: 'للانتقال إلى أي شاشة ، انقر على الأزرار في أعلى الصفحة.',
            accessTitle: 'الوصول إلى الدلائل',
            accessContent: 'يمكنك الوصول إلى الدلائل حول هاتفك عن طريق النقر على زر كيف',
		},
		hi: {
			emergencyTitle: 'आपातकाल में',
            emergencyContent: 'पुलिस से संपर्क करने के लिए लाल आपातकालीन बटन पर क्लिक करें।',
            navigateTitle: 'नेविगेट',
            navigateContent: 'किसी भी स्क्रीन पर जाने के लिए, पृष्ठ के शीर्ष पर स्थित बटनों पर क्लिक करें।',
            accessTitle: 'हाउ-टू-गाइड्स तक पहुंचें',
            accessContent: 'आप फोन के बारे में गाइड तक पहुंच सकते हैं, हाउ-टू बटन पर क्लिक करके',
		},
		ja: {
			emergencyTitle: '緊急時',
            emergencyContent: '警察に連絡するには赤い緊急ボタンをクリックします。',
            navigateTitle: 'ナビゲート',
            navigateContent: '任意の画面に移動するには、ページの上部にあるボタンをクリックします。',
            accessTitle: 'ハウツーガイドにアクセス',
            accessContent: 'ハウツーボタンをクリックすると、電話に関するガイドにアクセスできます',
		},
    };

    useEffect(() => {
        const getTips = async () => {
            try {
                await fetch("http://localhost:4000/getAllTips").then(
                    async (response) => {
                        if (!response.ok) {
                            console.log("Served failed:", response.status);
                        } else {
                            await response.json().then((data) => {
                                getTipState(data.response);
                            });
                        }
                    }
                );
            } catch (error) {
                console.log("Fetch function failed:", error);
            }
        };

        getTips();
        setTips([{
            title:
                textStrings[selectedLanguage].emergencyTitle,
            content:
                textStrings[selectedLanguage].emergencyContent
        }, {

            title:
                textStrings[selectedLanguage].navigateTitle,
            content:
                textStrings[selectedLanguage].navigateContent
        }, {
            title:
                textStrings[selectedLanguage].accessTitle,
            content:
                textStrings[selectedLanguage].accessContent
        }]);
    }, []);


    const getTipState = (data) => {
        setTips(data);
    };

    const onClose = () => {
        setShowTip(false);
    };

    const onOpen = () => {
        setShowTip(true);
    };

    const getIndex = () => {
        if (index === tips.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    console.log("tips", tips);
    return (
        <View style={TipStyle.tip}>
            {showTip ? (
                <Modal animationType="slide" transparent={true} visible={showTip}>
                    <View style={TipStyle.modalContent}>
                        <View style={TipStyle.titleContainer}>
                            <Text style={TipStyle.title}>{tips[index].title}</Text>
                            <Pressable onPress={onClose}>
                                <MaterialIcons name="close" color="#fff" size={22} />
                            </Pressable>
                        </View>
                        <View style={TipStyle.body}>
                            <Text style={TipStyle.bodyContent}>{tips[index].content}</Text>
                            <Speak text={tips[index].content} color={"white"}></Speak>
                            <VoiceCommand color={'white'} refs={[{ trigger: 'next', actual: nextRef }, { trigger: 'dismiss', actual: dismissRef }]}></VoiceCommand>

                            <Pressable style={TipStyle.bodyButton} onPress={getIndex}>
                                <Button ref={nextRef} onPress={getIndex} title={""}></Button>

                                <Text style={TipStyle.bodyButtonText}>{"Next Tip"}</Text>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    color="#fff"
                                    size={22}
                                />
                            </Pressable>

                            <Pressable style={TipStyle.bodyButton} onPress={onClose}>
                                <Button ref={dismissRef} onPress={onClose} title={""}></Button>
                                <Text style={TipStyle.bodyButtonText}>{"Dismiss"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            ) : (
                <View>
                    <Pressable
                        style={TipStyle.iconButton}
                        onPress={onOpen}
                        visible={!showTip}
                    >
                        <Button ref={ref} onPress={onOpen} title={''}></Button>
                        <MaterialIcons name="tips-and-updates" size={38} color="#ffd33d" />
                        <Text style={TipStyle.iconButtonLabel}>{"Helpful Tips"}</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
});

const TipStyle = {
    tip: {
        padding: "20px",
        margin: "20px",
        width: "200px",
        borderStyle: "dotted",
        borderRadius: "30px",
        borderWidth: "thin",
        overflowWrap: "break-word",
    },
    text: {
        margin: "0px",
    },
    iconButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    iconButtonLabel: {
        marginTop: 12,
    },
    nextButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        height: "70%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "20%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 35,
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    bodyContent: {
        fontSize: 30,
        color: "#fff",
        paddingVertical: 20,
        textAlign: "center",
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
    },
    bodyButton: {
        flexDirection: "row",
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#fff",
        paddingHorizontal: 5,
        marginTop: 10,
        width: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    bodyButtonText: {
        fontSize: 25,
        color: "#fff",
    },
};

export default Tip;
