import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useNavigation } from "@react-navigation/native";

const PasswordManager = () => {
  const navigation = useNavigation();
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savedCredentials, setSavedCredentials] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isBold, setIsBold] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");

  useEffect(() => {
    const loadSavedValues = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage) {
          console.log("Selected language:", savedLanguage);
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily) {
          console.log("Font family:", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size:", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold) {
          console.log("Is bold:", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
        }
      } catch (error) {
        console.error("Error loading saved values:", error);
      }
    };

    loadSavedValues();
    fetchSavedCredentials();
  }, []);

  const fetchSavedCredentials = async () => {
    try {
      const credentials = await AsyncStorage.getItem("savedCredentials");
      if (credentials !== null) {
        setSavedCredentials(JSON.parse(credentials));
      }
    } catch (error) {
      console.error("Error fetching saved credentials: ", error);
    }
  };

  const saveCredentials = async () => {
    try {
      const newCredential = {
        appName: appName,
        username: username,
        password: password,
      };
      const updatedCredentials = [...savedCredentials, newCredential];
      await AsyncStorage.setItem(
        "savedCredentials",
        JSON.stringify(updatedCredentials)
      );
      setSavedCredentials(updatedCredentials);
      setAppName("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error saving credentials: ", error);
    }
  };

  const deleteCredential = async (index) => {
    try {
      const updatedCredentials = savedCredentials.filter((_, i) => i !== index);
      await AsyncStorage.setItem(
        "savedCredentials",
        JSON.stringify(updatedCredentials)
      );
      setSavedCredentials(updatedCredentials);
    } catch (error) {
      console.error("Error deleting credential: ", error);
    }
  };

  const textStrings = {
    en: {
      passwordManagerTitle: "Password Manager",
      passwordManagerDescription:
        "This space is for you to save or view your passwords.",
      appName: "App Name",
      username: "Username",
      password: "Password",
      savedCredentialsTitle: "Saved Credentials:",
      save: "Save",
    },
    fr: {
      passwordManagerTitle: "Gestionnaire de mots de passe",
      appName: "Nom de l'application",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      savedCredentialsTitle: "Informations d'identification enregistrées:",
      save: "Sauvegardez",
    },
    es: {
      passwordManagerTitle: "Administrador de contraseñas",
      appName: "Nombre de la aplicación",
      username: "Nombre de usuario",
      password: "Contraseña",
      savedCredentialsTitle: "Credenciales guardadas:",
      save: "Guardar",
    },
    ch: {
      passwordManagerTitle: "密码管理器",
      appName: "应用名称",
      username: "用户名",
      password: "密码",
      savedCredentialsTitle: "已保存的凭据:",
      save: "保存",
    },
    ru: {
      passwordManagerTitle: "Менеджер паролей",
      appName: "Имя приложения",
      username: "Имя пользователя",
      password: "пароль",
      savedCredentialsTitle: "Сохраненные учетные данные:",
      save: "Сохранить",
    },
    ar: {
      passwordManagerTitle: "مدير كلمات المرور",
      appName: "اسم التطبيق",
      username: "اسم المستخدم",
      password: "كلمة السر",
      savedCredentialsTitle: "بيانات الاعتماد المحفوظة:",
      save: "حفظ",
    },
    hi: {
      passwordManagerTitle: "पासवर्ड प्रबंधक",
      appName: "एप्लिकेशन का नाम",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      savedCredentialsTitle: "सहेजी गई पहचान:",
      save: "सहेजें",
    },
    ja: {
      passwordManagerTitle: "パスワードマネージャ",
      appName: "アプリ名",
      username: "ユーザー名",
      password: "パスワード",
      savedCredentialsTitle: "保存された資格情報:",
      save: "セーブ",
    },
  };

  const navigateToPasswordManager = () => {
    navigation.navigate("PasswordManager");
  };

  const navigateToAccount = () => {
    navigation.navigate("Settings");
  };

  const navigateToHome = () => {
    navigation.navigate("HomeScreen");
  };

  // Set header options dynamically
  useEffect(() => {
    navigation.setOptions({
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
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          {textStrings[selectedLanguage].passwordManagerTitle}
        </Text>
        <Text
          style={[
            styles.title,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
        >
          {textStrings[selectedLanguage].passwordManagerDescription}
        </Text>
        <TextInput
          style={[
            styles.input,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
          placeholder={textStrings[selectedLanguage].appName}
          value={appName}
          onChangeText={setAppName}
        />
        <TextInput
          style={[
            styles.input,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
          placeholder={textStrings[selectedLanguage].username}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[
            styles.input,
            { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
          ]}
          placeholder={textStrings[selectedLanguage].password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {/* <Button style={[styles.buttonText, { fontSize, fontWeight: isBold ? 'bold' : 'normal', fontFamily }]} title={textStrings[selectedLanguage].save} onPress={saveCredentials} /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveCredentials();
          }}
        >
          <Text
            style={[
              styles.saveButtonText,
              {
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontWeight: isBold ? "bold" : "normal",
              },
            ]}
          >
            {" "}
            {textStrings[selectedLanguage].save}
          </Text>
        </TouchableOpacity>
        <View style={styles.savedCredentialsContainer}>
          <Text
            style={[
              styles.savedCredentialsTitle,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].savedCredentialsTitle}
          </Text>
          {savedCredentials.map((credential, index) => (
            <View key={index} style={styles.savedCredential}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize,
                    fontWeight: isBold ? "bold" : "normal",
                    fontFamily,
                  },
                ]}
              >
                {textStrings[selectedLanguage].appName}: {credential.appName}
              </Text>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize,
                    fontWeight: isBold ? "bold" : "normal",
                    fontFamily,
                  },
                ]}
              >
                {textStrings[selectedLanguage].username}: {credential.username}
              </Text>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize,
                    fontWeight: isBold ? "bold" : "normal",
                    fontFamily,
                  },
                ]}
              >
                {textStrings[selectedLanguage].password}: {credential.password}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteCredential(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  savedCredentialsContainer: {
    marginTop: 20,
    flex: 1,
  },
  savedCredentialsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  savedCredential: {
    alignItems: "left",
    marginBottom: 10,
    flexDirection: "column",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    right: 0,
    top: 0,
    bottom: 0,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },

  saveButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },

  sampleText: {
    fontSize: 16,
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
});

export default PasswordManager;
