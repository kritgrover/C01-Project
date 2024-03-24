import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EmergencyButton from "./EmergencyButton";
import NavigationBar from "./NavigationBar";
import Tip from "./Tip";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import PasswordManager from "./PasswordManager";
import Speak from "./Speak";
import VoiceCommand from "./VoiceCommand";

const HomeScreen = () => {
  const handleHomePress = () => {
    console.log("Home Button Pressed");
  };

  const handleButton2Press = () => {
    console.log("Button 2 pressed");
  };

  const handleButton3Press = () => {
    console.log("Button 3 pressed");
  };

  const EmergencyRef = useRef(null);
  const TipRef = useRef(null);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PasswordManager />
      </SafeAreaView>
      {/* <Speak
        text={
          "hello this page is reading aloud with a very long text so that I can test the pausing"
        }
      /> */}
      <Tip ref={TipRef} style={{ float: "right" }} />
      <EmergencyButton ref={EmergencyRef} />
      <NavigationBar>
        onHomePress={handleHomePress}
        onButton2Press={handleButton2Press}
        onButton3Press={handleButton3Press}
      </NavigationBar>
      <StatusBar style="auto" />
      <VoiceCommand refs={[{ trigger: 'open tips', actual: TipRef }, { trigger: 'call the police', actual: EmergencyRef }]}></VoiceCommand>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default HomeScreen;
