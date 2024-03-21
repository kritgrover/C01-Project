import React from "react";
import { StyleSheet, Text, View, Pressable, Modal, Button } from 'react-native';
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const Speak = ({text, language}) => {

    const [speaking, setSpeaking] = useState(false);

    const speak = () => {
        console.log('text:', text);

        if(!speaking) {
            console.log('hello', speaking)
            Speech.speak(text, {
                lanuage: language
            });
            setSpeaking(true);
        } else {
            console.log('here...', speaking);
            Speech.stop();
            setSpeaking(false);
        }
        
      };

    return (
        <View>
             <Pressable style={SpeakStyle.button} onPress={speak} title="TTS">
                <MaterialCommunityIcons name={speaking ? "pause" : "text-to-speech"} size={30} color="black" />
                {/* <Text>Speech to Text</Text> */}
             </Pressable>
        </View>
    );
};

const SpeakStyle = {
    button: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Speak;