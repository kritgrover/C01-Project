import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

const SplashPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    animation.start(() => {
      setTimeout(() => {
        navigation.replace("PreferredLanguage");
      }, 1000);
    });

    return () => animation.stop();
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <Text style={[styles.text, styles.welcomeText]}>Welcome to</Text>
        <Text style={[styles.text, styles.bold, styles.appName]}>
          TechBuddy
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    color: "#333333",
  },
  welcomeText: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default SplashPage;
