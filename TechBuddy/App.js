import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import PreferredLanguage from './components/PreferredLanguage';
import EmergencyButton from './components/EmergencyButton';
import TextAdjustment from './components/TextAdjustment';

const Stack = createNativeStackNavigator();

const App = () => {
  // Use a Ref for initialRoute
  const initialRouteRef = useRef("PreferredLanguage");

  useEffect(() => {
    const checkSavedValues = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
        const savedFontSize = await SecureStore.getItemAsync('fontSize');
        const savedFontFamily = await SecureStore.getItemAsync('fontFamily');
        const savedIsBold = await SecureStore.getItemAsync('isBold');

        console.log('Saved Values:', {
          selectedLanguage: savedLanguage,
          fontSize: savedFontSize,
          fontFamily: savedFontFamily,
          isBold: savedIsBold,
        });

        if (savedLanguage !== null && savedFontSize !== null && savedFontFamily !== null && savedIsBold !== null) {
          console.log('Setting initial route to HomeScreen');
          // Update the Ref directly
          initialRouteRef.current = "HomeScreen";
          console.log('Initial Route changed:', initialRouteRef.current);
        }
      } catch (error) {
        console.error("Error checking saved values:", error);
      }
    };

    checkSavedValues();

    console.log('Initial Route changed (part 2 check):', initialRouteRef.current);
  }, []);

  return (
    <NavigationContainer key={initialRouteRef.current}>
      <Stack.Navigator initialRouteName={initialRouteRef.current}>
        <Stack.Screen name="PreferredLanguage" component={PreferredLanguage} />
        <Stack.Screen name="UpdateFont" component={TextAdjustment} />
        <Stack.Screen name="HomeScreen" component={EmergencyButton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
