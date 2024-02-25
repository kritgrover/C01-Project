// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreferredLanguage from './components/PreferredLanguage';
import EmergencyButton from './components/EmergencyButton';
import TextAdjustment from './components/TextAdjustment';

// Create a navigation stack
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PreferredLanguage">
        <Stack.Screen name="PreferredLanguage" component={PreferredLanguage} />
        <Stack.Screen name="UpdateFont" component={TextAdjustment} />
        <Stack.Screen name="HomeScreen" component={EmergencyButton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
