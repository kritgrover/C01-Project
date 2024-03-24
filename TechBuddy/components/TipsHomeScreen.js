import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native"

const TipsScreen = function ()
{
    const navigate = useNavigation();
    /*
    Tipsmenu is an array of JSON, which will contain each page of tips.
    To add a new page, insert a new JSON entry which is of the following form
    {
        title: 'YourTitle',
        link: 'Name Of Component On App.js'
    }
    It is very important to have title and link exactly labeled as title and link,
    although the strings you put in for those values could be anything you want.
    */
    const tipsMenu = 
        [{
            title: 'Language Change',
            link: 'SettingsLanguagechange'
        },
        {
            title: 'Accessibility Settings',
            link: 'AccessibilitySettings'
        },
        {
            title: 'Logging In To Apps',
            link: 'LoginsToApps'
        },
        {
            title: "Your Phone",
            link: 'PhoneHardware'
        }
      
      ]


    return (
        <View style={styles.menuContainer}>
            {tipsMenu.map(function(link)
                {
                    return <Pressable key={link.title} onPress={function() {navigate.navigate(link.link)}} style={styles.navigateButton}>
                        <Text style={styles.buttonText}>{link.title}</Text>
                    </Pressable>
                })}
        </View>
    )

}



const styles = StyleSheet.create({
    menuContainer: {
      width: '100%',
      height: '100%',
      margin: 'auto',
      justifyContent: "center",
      alignItems: "center",
    },
    navigateButton: {
      width: 200,
      height: 50,
      backgroundColor: "grey",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: 10
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
  });


export default TipsScreen
