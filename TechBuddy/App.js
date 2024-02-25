// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreferredLanguage from './components/PreferredLanguage';

// Create a navigation stack
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Add screens to the stack */}
        <Stack.Screen
          name="Launch"
          component={PreferredLanguage}
          options={{ title: 'Launch Page' }}
        />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
