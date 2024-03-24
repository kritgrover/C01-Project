import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import EmergencyButton from "./EmergencyButton";
import NavigationBar from "./NavigationBar";
import Tip from "./Tip";
import React from "react";
import { SafeAreaView } from "react-native";
import PasswordManager from "./PasswordManager";
import Speak from "./Speak";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigate = useNavigation()
  const handleHomePress = () => {
    console.log("Home Button Pressed");
  };

  const handleButton2Press = () => {
    console.log("Button 2 pressed");
  };

  const handleButton3Press = () => {
    console.log("Button 3 pressed");
  };

  return (
    //
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PasswordManager />
        <TouchableOpacity
				style={styles.continueButton}
				onPress={() => {
					navigate.navigate('TipsMenu');
				}}>
        
				<Text style={styles.continueButtonText}>Tips Home Page</Text>
        </TouchableOpacity>
      </SafeAreaView>
      
      <Speak
        text={
          "hello this page is reading aloud with a very long text so that I can test the pausing"
        }
      />
      <EmergencyButton />
      <NavigationBar>
        onHomePress={handleHomePress}
        onButton2Press={handleButton2Press}
        onButton3Press={handleButton3Press}
      </NavigationBar>
      <StatusBar style="auto" />
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
    height: '50%'
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
	}
});

export default HomeScreen;
