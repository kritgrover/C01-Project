import React from "react";
import { StyleSheet, Text, View, Pressable, Modal, Button } from "react-native";
import { useState, useEffect, forwardRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Speak from './Speak';

const Tip = forwardRef((props, ref) => {
    const [tips, setTips] = useState(undefined);
    const [showTip, setShowTip] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const getTips = async () => {
            try {
                await fetch("http://localhost:4000/getAllTips").then(
                    async (response) => {
                        if (!response.ok) {
                            console.log("Served failed:", response.status);
                        } else {
                            await response.json().then((data) => {
                                getTipState(data.response);
                            });
                        }
                    }
                );
            } catch (error) {
                console.log("Fetch function failed:", error);
            }
        };

        getTips();
        setTips([{
            title:
                "In Case of Emergency",
            content:
                "Click the red Emergency button to contact the police."
        }, {

            title:
                "Navigate",
            content:
                "To go to any screen, click the buttons at the bottom of the page."
        }, {
            title:
                "Access How-to-guides",
            content:
                "You can access guides about your phone by clicking on the how - to button"
        }]);
    }, []);


    const getTipState = (data) => {
        setTips(data);
    };

    const onClose = () => {
        setShowTip(false);
    };

    const onOpen = () => {
        setShowTip(true);
    };

    const getIndex = () => {
        if (index === tips.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    console.log("tips", tips);
    return (
        <View style={TipStyle.tip}>
            {showTip ? (
                <Modal animationType="slide" transparent={true} visible={showTip}>
                    <View style={TipStyle.modalContent}>
                        <View style={TipStyle.titleContainer}>
                            <Text style={TipStyle.title}>{tips[index].title}</Text>
                            <Pressable onPress={onClose}>
                                <MaterialIcons name="close" color="#fff" size={22} />
                            </Pressable>
                        </View>
                        <View style={TipStyle.body}>
                            <Text style={TipStyle.bodyContent}>{tips[index].content}</Text>
                            <Speak text={tips[index].content} color={"white"}></Speak>

                            <Pressable style={TipStyle.bodyButton} onPress={getIndex}>
                                <Text style={TipStyle.bodyButtonText}>{"Next Tip"}</Text>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    color="#fff"
                                    size={22}
                                />
                            </Pressable>

                            <Pressable style={TipStyle.bodyButton} onPress={onClose}>
                                <Text style={TipStyle.bodyButtonText}>{"Dismiss"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            ) : (
                <View>
                    {/* <Pressable
                        style={TipStyle.iconButton}
                        onPress={onOpen}
                        visible={!showTip}
                        ref={ref}
                    >
                        <MaterialIcons name="tips-and-updates" size={38} color="#ffd33d" />
                        <Text style={TipStyle.iconButtonLabel}>{"Helpful Tips"}</Text>
                    </Pressable> */}
                    <Button ref={ref} onPress={showTip ? onOpen : onClose} title={'Helpful Tips'}></Button>
                </View>
            )}
        </View>
    );
});

const TipStyle = {
    tip: {
        padding: "20px",
        margin: "20px",
        width: "200px",
        borderStyle: "dotted",
        borderRadius: "30px",
        borderWidth: "thin",
        overflowWrap: "break-word",
    },
    text: {
        margin: "0px",
    },
    iconButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    iconButtonLabel: {
        marginTop: 12,
    },
    nextButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        height: "70%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "20%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 35,
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    bodyContent: {
        fontSize: 30,
        color: "#fff",
        paddingVertical: 20,
        textAlign: "center",
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
    },
    bodyButton: {
        flexDirection: "row",
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#fff",
        paddingHorizontal: 5,
        marginTop: 10,
        width: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    bodyButtonText: {
        fontSize: 25,
        color: "#fff",
    },
};

export default Tip;
