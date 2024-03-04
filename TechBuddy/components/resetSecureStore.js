// resetSecureStore.js
import * as SecureStore from 'expo-secure-store';

const clearSecureStoreValues = async () => {
  try {
    await SecureStore.deleteItemAsync('selectedLanguage');
    await SecureStore.deleteItemAsync('fontSize');
    await SecureStore.deleteItemAsync('fontFamily');
    await SecureStore.deleteItemAsync('isBold');

    console.log('SecureStore values cleared successfully.');
  } catch (error) {
    console.error('Error clearing SecureStore values:', error);
  }
};

clearSecureStoreValues();