// NOTE: THIS IS MEANT ONLY FOR TESTING
// removeSecureStoreValues.js

import * as SecureStore from 'expo-secure-store';

const removeAllValues = async () => {
  try {
    // Get all keys
    const keys = await SecureStore.getFilteredItemKeysAsync();

    // Delete each key
    await Promise.all(keys.map(key => SecureStore.deleteItemAsync(key)));

    console.log('All values removed from SecureStore.');
  } catch (error) {
    console.error('Error removing values from SecureStore:', error);
  }
};

// Call the function to remove all values
removeAllValues();
