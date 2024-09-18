import React from "react";
import { Text, Image, StyleSheet, ScrollView } from "react-native";

const AboutusScreen = () => {
  const dynamicStyles = styles();

  return (
    <ScrollView style={dynamicStyles.container}>
      <Image
        source={require("../assets/images/icon2.png")}
        style={dynamicStyles.logo}
      />
      <Text style={dynamicStyles.title}>Divya Quran (తెలుగు)</Text>
      <Text style={dynamicStyles.version}>Version: 5.0.0</Text>
      <Text style={dynamicStyles.developer}>Support & Guidance from:</Text>
      <Text style={dynamicStyles.devName}>Telugu Islamic Publishers</Text>
      <Text style={dynamicStyles.introduction}>
        Divya Quran Telugu is a free and beautiful application for Android.
        Telugu Translation taken from the divyaquran.net, the data used in the
        Arabic comes from Quran.com
      </Text>
    </ScrollView>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#e8f5e9",
      borderRadius: 15,
      margin: 15,
      borderWidth: 2,
      borderColor: "#672CBC",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
    },
    logo: {
      width: 150,
      height: 150,
      marginTop: 20,
      marginBottom: 20,
      alignSelf: "center",
      borderRadius: 75,
      borderWidth: 2,
      borderColor: "#672CBC",
    },
    title: {
      fontSize: 28,
      textAlign: "center",
      marginBottom: 15,
      color: "#672CBC",
      fontFamily: "sans-serif-medium",
    },
    version: {
      fontSize: 16,
      fontFamily: "PoppinsMedium",
      textAlign: "center",
      marginBottom: 25,
      color: "black",
    },
    developer: {
      fontSize: 22,
      textAlign: "center",
      marginBottom: 5,
      fontFamily: "PoppinsBold",
      color: "black",
    },
    devName: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 25,
      fontFamily: "PoppinsMedium",
      color: "#672CBC",
    },
    introduction: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
      paddingHorizontal: 15,
      lineHeight: 34,
      letterSpacing: 1,
      color: "black",
      fontFamily: "serif",
    },
  });

export default AboutusScreen;
