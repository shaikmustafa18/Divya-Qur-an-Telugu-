import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const [arabicTextSize, setArabicTextSize] = useState(16);
  const [teluguTextSize, setTeluguTextSize] = useState(16);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const arabicSize = await AsyncStorage.getItem("arabicTextSize");
        const teluguSize = await AsyncStorage.getItem("teluguTextSize");
        if (arabicSize !== null) setArabicTextSize(JSON.parse(arabicSize));
        if (teluguSize !== null) setTeluguTextSize(JSON.parse(teluguSize));
      } catch (error) {
        console.error("Failed to load settings", error);
        Alert.alert("Error", "Failed to load settings");
      }
    };
    loadSettings();
  }, []);

  const handleArabicTextSizeChange = async (value) => {
    try {
      setArabicTextSize(value);
      await AsyncStorage.setItem("arabicTextSize", JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save Arabic text size", error);
      Alert.alert("Error", "Failed to save Arabic text size");
    }
  };

  const handleTeluguTextSizeChange = async (value) => {
    try {
      setTeluguTextSize(value);
      await AsyncStorage.setItem("teluguTextSize", JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save Telugu text size", error);
      Alert.alert("Error", "Failed to save Telugu text size");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Arabic Font Size: {arabicTextSize}</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={30}
        step={1}
        value={arabicTextSize}
        onValueChange={handleArabicTextSizeChange}
        minimumTrackTintColor="#6A5ACD"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#483D8B"
      />

      <Text style={styles.label}>Telugu Text Size: {teluguTextSize}</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={30}
        step={1}
        value={teluguTextSize}
        onValueChange={handleTeluguTextSizeChange}
        minimumTrackTintColor="#6A5ACD"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#483D8B"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    margin: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#483D8B",
    textAlign: "center",
    fontFamily: "PoppinsMedium",
  },

  slider: {
    width: "100%",
    marginBottom: 30,
  },
});

export default SettingsScreen;
