import React from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

const Speak = ({ text, language, color, showText }) => {
    console.log("color", color);

    const [speaking, setSpeaking] = useState(false);

    const reset = () => {
        setSpeaking(false)
    }

    const speak = () => {
        console.log("text:", text);

        if (!speaking) {
            console.log("hello", speaking);
            Speech.speak(text, {
                language: language ? language : "en",
                onDone: reset,
                onStopped: reset
            });
            setSpeaking(true);
        } else {
            console.log("here...", speaking);
            Speech.stop();
            setSpeaking(false);
        }
    };

    return (
        <View>
            <Pressable style={SpeakStyle.button} onPress={speak}>
                <MaterialCommunityIcons
                    name={speaking ? "pause" : "text-to-speech"}
                    size={40}
                    color={color ? color : "black"}
                />
                {showText && <Text style={{ color: color ? color : "black" }}>Text to Speech</Text>}
            </Pressable>
        </View>
    );
};

const SpeakStyle = {
    button: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Speak;
