import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableHighlight,
  linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SettingsPicture from "../assets/SettingsPicture.png";
import Translate from "./Translate";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import Speak from './Speak';

const LanguageChange = function () {
  const navigate = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState("");

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log(
            "Selected language: (LanguageChange) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
          console.log("Selected language: (LanguageChange -- false version) ", selectedLanguage);
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
          console.log("Font family (LanguageChange):", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
          console.log("Font family (LanguageChange -- false version):", savedFontFamily);
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size (LanguageChange):", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
          console.log("Font size (LanguageChange -- false version):", savedFontSize);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold !== null && savedIsBold !== "" && savedIsBold !== "null" && savedIsBold == "true") {
          console.log("Is bold (LanguageChange):", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
          console.log("Is bold (LanguageChange -- false version):", savedIsBold);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();
  }, []);

  const navigateToPasswordManager = () => {
    navigate.navigate("PasswordManager");
  };

  const navigateToAccount = () => {
    navigate.navigate("Settings");
  };

  const navigateToHome = () => {
    navigate.navigate("HomeScreen");
  };

  const navigateToTipsHome = () => {
    navigate.navigate("TipsMenu");
  };

  const textStrings = {
    en: {
      back: "Back",
      preText: "Every phone has an option to change the language on it. This will change the language of everything presented on your phone. Here’s how to do it:",
      num1: "1) Go to your settings.",
      num2: "2) Go to Preferences, then Languages. (If you don't see preferences, you may use the search icon in your Settings app to search 'Languages')",
      num3: "3) There should be a “Your Selected Language” option, and it will be set to English. There should also be a “Select Language” option. Tap that button.",
      num4: "4) A list of languages should appear, scroll through until you find the one you want.",
      num5: "5) Some settings will ask you to verify that you want to change to the selected language. Make sure to select “Yes” or your changes will not be saved.",
    },
    fr: {
      back: "Retour",
      preText: "Chaque téléphone a une option pour changer la langue. Cela changera la langue de tout ce qui est présenté sur votre téléphone. Voici comment faire :",
      num1: "1) Allez dans vos paramètres.",
      num2: "2) Allez dans Préférences, puis Langues. (Si vous ne voyez pas les préférences, vous pouvez utiliser l'icône de recherche dans votre application Paramètres pour rechercher 'Langues')",
      num3: "3) Il devrait y avoir une option “Votre langue sélectionnée”, et elle sera définie sur Anglais. Il devrait également y avoir une option “Sélectionner la langue”. Appuyez sur ce bouton.",
      num4: "4) Une liste de langues devrait apparaître, faites défiler jusqu'à ce que vous trouviez celle que vous voulez.",
      num5: "5) Certains paramètres vous demanderont de vérifier que vous voulez changer pour la langue sélectionnée. Assurez-vous de sélectionner “Oui” ou vos modifications ne seront pas enregistrées.",
    },
    es: {
      back: "Atrás",
      preText: "Cada teléfono tiene una opción para cambiar el idioma. Esto cambiará el idioma de todo lo que se presente en su teléfono. Así es como se hace:",
      num1: "1) Vaya a la configuración.",
      num2: "2) Vaya a Preferencias, luego a Idiomas. (Si no ve preferencias, puede usar el icono de búsqueda en su aplicación Configuración para buscar 'Idiomas')",
      num3: "3) Debería haber una opción de “Su idioma seleccionado”, y estará configurada en Inglés. También debería haber una opción de “Seleccionar idioma”. Toque ese botón.",
      num4: "4) Debería aparecer una lista de idiomas, desplácese hasta encontrar el que desee.",
      num5: "5) Algunos ajustes le pedirán que verifique que desea cambiar al idioma seleccionado. Asegúrese de seleccionar “Sí” o sus cambios no se guardarán.",
    },
    ch: {
      back: "回去",
      preText: "每部手机都有一个选项可以更改其语言。这将更改手机上呈现的所有内容的语言。以下是如何操作的方法：",
      num1: "1) 进入设置。",
      num2: "2) 进入首选项，然后进入语言。 （如果您看不到首选项，可以使用设置应用程序中的搜索图标搜索“语言”）",
      num3: "3) 应该有一个“您选择的语言”选项，它将设置为英语。 还应该有一个“选择语言”选项。 点击该按钮。",
      num4: "4) 应该会出现一个语言列表，请滚动查找您想要的语言。",
      num5: "5) 有些设置会要求您验证是否要更改为所选语言。 请务必选择“是”，否则您的更改将不会保存。",
    },
    ru: {
      back: "назад",
      preText: "У каждого телефона есть опция изменения языка. Это изменит язык всего, что представлено на вашем телефоне. Вот как это сделать:",
      num1: "1) Перейдите в настройки.",
      num2: "2) Перейдите в Параметры, затем в Языки. (Если вы не видите параметры, вы можете использовать значок поиска в вашем приложении Настройки для поиска 'Языки')",
      num3: "3) Там должен быть пункт “Ваш выбранный язык”, и он будет установлен на английский. Там также должен быть пункт “Выбрать язык”. Нажмите на эту кнопку.",
      num4: "4) Должен появиться список языков, прокрутите, пока не найдете нужный.",
      num5: "5) Некоторые настройки попросят вас подтвердить, что вы хотите изменить выбранный язык. Обязательно выберите “Да”, иначе ваши изменения не будут сохранены.",
    },
    ar: {
      back: "عودة",
      preText: "كل هاتف لديه خيار لتغيير اللغة عليه. سيؤدي هذا إلى تغيير لغة كل شيء يُعرض على هاتفك. إليك كيفية القيام بذلك:",
      num1: "1) اذهب إلى الإعدادات الخاصة بك.",
      num2: "2) اذهب إلى التفضيلات ، ثم اللغات. (إذا لم ترَ التفضيلات ، فيمكنك استخدام أيقونة البحث في تطبيق الإعدادات الخاص بك للبحث عن 'اللغات')",
      num3: "3) يجب أن يكون هناك خيار “لغتك المحددة” ، وسيتم تعيينه على اللغة الإنجليزية. يجب أيضًا أن يكون هناك خيار “تحديد اللغة”. اضغط على هذا الزر.",
      num4: "4) يجب أن تظهر قائمة باللغات ، انتقل إلى أن تجد اللغة التي تريدها.",
      num5: "5) ستطلب بعض الإعدادات منك التحقق من أنك تريد تغيير اللغة المحددة. تأكد من تحديد “نعم” أو لن تتم حفظ تغييراتك.",
    },
    hi: {
      back: "वापस",
      preText: "हर फोन में भाषा बदलने का एक विकल्प होता है। इससे आपके फोन पर प्रस्तुत सभी वस्तुओं की भाषा बदल जाएगी। यहां इसे कैसे करना है:",
      num1: "1) अपनी सेटिंग्स में जाएं।",
      num2: "2) प्राथमिकताएं, फिर भाषाएं जाएं। (यदि आप प्राथमिकताएं नहीं देखते हैं, तो आप अपने सेटिंग्स ऐप में 'भाषाएं' खोजने के लिए खोज आइकन का उपयोग कर सकते हैं)",
      num3: "3) “आपकी चयनित भाषा” विकल्प होना चाहिए, और यह अंग्रेजी पर सेट किया जाएगा। एक “भाषा चुनें” विकल्प भी होना चाहिए। उस बटन पर टैप करें।",
      num4: "4) कुछ भाषाएं सूची दिखाएगी, जिसमें आपको चाहिए वह तक ले जाएं।",
      num5: "5) कुछ सेटिंग्स आपसे सत्यापित करने के लिए कहेंगी कि आप चयनित भाषा में बदलना चाहते हैं। सुनिश्चित करें कि आप “हां” का चयन करते हैं या अन्यथा आपके परिवर्तन सहेजे नहीं जाएंगे।",
    },
    ja: {
      back: "バック",
      preText: "すべての電話には、その言語を変更するオプションがあります。これにより、電話で表示されるすべてのものの言語が変更されます。これを行う方法は次のとおりです：",
      num1: "1) 設定に移動します。",
      num2: "2) 設定、次に言語に移動します。 （設定が表示されない場合は、設定アプリで '言語' を検索するために検索アイコンを使用できます）",
      num3: "3) “選択した言語” オプションが表示され、英語に設定されています。 “言語を選択” オプションも表示されるはずです。 そのボタンをタップします。",
      num4: "4) 言語のリストが表示され、必要なものが見つかるまでスクロールします。",
      num5: "5) 一部の設定では、選択した言語に変更するかどうかを確認するように求められます。 “はい” を選択してください。さもないと、変更は保存されません。",
    },
  };

  // Set header options dynamically
  useEffect(() => {
    navigate.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={navigateToHome}>
          <Image source={homeIcon} style={styles.homeIcon} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigateToAccount}
          style={styles.headerButton}
        >
          <Image source={accountIcon} style={styles.accountIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={navigateToPasswordManager}
          style={styles.headerButton}
        >
          <Image source={passwordIcon} style={styles.passwordIcon} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigateToTipsHome}
        >
          <Text
            style={[
              styles.buttonText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].back}
          </Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].preText}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num1}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num2}
          </Text>
        </View>
        <Image
          resizeMode="contain"
          style={{ width: "90%" }}
          source={SettingsPicture}
          alt="Search Image"
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num3}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num4}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num5}
          </Text>
        </View>
        <Speak text={textStrings[selectedLanguage].num1+textStrings[selectedLanguage].num2+textStrings[selectedLanguage].num3+textStrings[selectedLanguage].num4+textStrings[selectedLanguage].num5} language={selectedLanguage === 'ch'? 'zh': selectedLanguage} showText={true}></Speak>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    height: "80%",
    alignItems: "center",
    margin: "auto",
    justifyContent: "top",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  textContainer: {
    alignItems: "left",
  },
  navigateButton: {
    width: 200,
    height: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  instructionText: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  headerButton: {
    padding: 10,
    marginRight: 10,
  },
  headerButtonText: {
    color: "blue",
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
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: 150,
    marginBottom: 20,
  },
});

export default LanguageChange;
