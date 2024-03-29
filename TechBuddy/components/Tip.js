import React from "react";
import { StyleSheet, Text, View, Pressable, Modal, Button } from "react-native";
import { useState, useEffect, forwardRef, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Speak from './Speak';
import VoiceCommand from "./VoiceCommand";

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
    setTips([
      {
        title: "In Case of Emergency",
        content: "Click the red Emergency button to contact the police.",
      },
      {
        title: "Navigate",
        content:
          "To go to any screen, click the buttons at the bottom of the page.",
      },
      {
        title: "Access How-to-guides",
        content:
          "You can access guides about your phone by clicking on the how - to button",
      },
    ]);
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
                <MaterialIcons name="close" color="#fff" size={26} />
              </Pressable>
            </View>
            <View style={TipStyle.body}>
              <Text style={TipStyle.bodyContent}>{tips[index].content}</Text>
              <Speak text={tips[index].content} color={"white"} showText={true}></Speak>

              <Pressable style={TipStyle.bodyButton} onPress={getIndex}>
                <Button ref={nextRef} onPress={getIndex} title={""}></Button>
                <Text style={TipStyle.bodyButtonText}>{"Next Tip"}</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  color="#fff"
                  size={26}
                />
              </Pressable>

              <Pressable style={TipStyle.bodyButton} onPress={onClose}>
                <Button ref={dismissRef} onPress={onClose} title={""}></Button>
                <Text style={TipStyle.bodyButtonText}>{"Dismiss"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        <View style={TipStyle.container}>
          <Pressable
            style={TipStyle.iconButton}
            onPress={onOpen}
            visible={!showTip}
          >
            <View style={TipStyle.content}>
            <Button ref={ref} onPress={onOpen} title={''}></Button>

              <MaterialIcons
                name="tips-and-updates"
                size={38}
                style={TipStyle.icon}
              />
              <Text
                style={[
                  TipStyle.iconButtonLabel,
                  //   {
                  //     fontSize,
                  //     fontWeight: isBold ? "bold" : "normal",
                  //     fontFamily,
                  //   },
                ]}
              >
                {"Helpful Tips"}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
});

const TipStyle = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    display: "flex",
  },
  tip: {
    padding: 20,
    margin: 20,
    borderRadius: "30px",
    borderWidth: "thin",
    overflowWrap: "break-word",
  },
  text: {
    margin: "0px",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 30,
    color: "white",
  },
  iconButton: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    width: "110%",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "white",
    fontSize: 18,
    textAlign: "left",
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
    height: "15%",
    backgroundColor: "#4CAF50",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 32,
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
    margin: 15,
    padding: 15,
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
    marginTop: 35,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyButtonText: {
    fontSize: 25,
    color: "#fff",
  },
};

export default Tip;
