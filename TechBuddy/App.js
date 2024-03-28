import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import PreferredLanguage from "./components/PreferredLanguage";
import HomeScreen from "./components/HomeScreen";
import TextAdjustment from "./components/TextAdjustment";
import Settings from "./components/Settings";
import TipsScreen from "./components/TipsHomeScreen";
import LanguageChange from "./components/LanguageChange";
import Translate from "./components/Translate";
import accessSettings from "./components/accessSettings";
import logInsToApps from "./components/logIns";
import Hardware from "./components/phoneHardware";
import PasswordManager from "./components/PasswordManager";
import SplashPage from "./components/SplashPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteKey, setInitialRouteKey] = useState(Date.now().toString());
  const initialRouteRef = useRef("SplashPage");

  useEffect(() => {
    const checkSavedValues = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );
        const savedIsBold = await SecureStore.getItemAsync("isBold");

        console.log("Saved Values:", {
          selectedLanguage: savedLanguage,
          fontSize: savedFontSize,
          fontFamily: savedFontFamily,
          isBold: savedIsBold,
        });

        if (
          savedLanguage !== "" &&
          savedFontSize !== "" &&
          savedFontFamily !== "" &&
          savedIsBold !== "" &&
          savedLanguage !== null &&
          savedFontSize !== null &&
          savedFontFamily !== null &&
          savedIsBold !== null
        ) {
          console.log("Setting initial route to HomeScreen");
          initialRouteRef.current = "HomeScreen";
          console.log("Initial Route changed:", initialRouteRef.current);
          setInitialRouteKey(Date.now().toString());
        }
      } catch (error) {
        console.error("Error checking saved values:", error);
      }
    };

    checkSavedValues();

    console.log(
      "Initial Route changed (part 2 check):",
      initialRouteRef.current
    );
  }, []);

  return (
    <NavigationContainer key={initialRouteKey}>
      <Stack.Navigator initialRouteName={initialRouteRef.current}>
        <Stack.Screen name="SplashPage" component={SplashPage} />
        <Stack.Screen name="PreferredLanguage" component={PreferredLanguage} />
        <Stack.Screen name="UpdateFont" component={TextAdjustment} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TipsMenu" component={TipsScreen} />
        <Stack.Screen name="Translate" component={Translate} />
        <Stack.Screen name="PasswordManager" component={PasswordManager} />
        <Stack.Screen
          name="SettingsLanguagechange"
          component={LanguageChange}
        />
        <Stack.Screen name="AccessSettings" component={accessSettings} />
        <Stack.Screen name="LoginsToApps" component={logInsToApps} />
        <Stack.Screen name="PhoneHardware" component={Hardware} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
