import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EmergencyButton from "./components/EmergencyButton";
import NavigationBar from "./components/NavigationBar";
import Tip from "./components/Tip";
import React from "react";
import { SafeAreaView } from "react-native";
import PasswordManager from "./components/PasswordManager";
import Speak from "./components/Speak";

const App = () => {
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
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PasswordManager />
      </SafeAreaView>
      <Speak text={"Hola mundo hello this page is reading aloud with a very long text so that I can test the pausing"} language={'es'} />
      <Tip style={{ float: "right" }} />
      <EmergencyButton />
      <NavigationBar>
        onHomePress={handleHomePress}
        onButton2Press={handleButton2Press}
        onButton3Press={handleButton3Press}
      </NavigationBar>
      <StatusBar style="auto" />
    </View>
    //   <SafeAreaView style={styles.container}>
    //   <PasswordManager />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // display: "flex"
  },
});

export default App;
