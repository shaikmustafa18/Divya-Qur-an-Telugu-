import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import Slider from "@react-native-community/slider";
import { Ionicons, Feather } from "@expo/vector-icons";

const AudioPlayer = ({ audioUrl, surahNumber }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showSlider, setShowSlider] = useState(true);

  useEffect(() => {
    if (sound) {
      // Play the audio when it's loaded
      sound.playAsync();
      setIsPlaying(true);
    }
  }, [sound]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [sound]);

  useEffect(() => {
    checkIfFileExists();
  }, []);

  const checkIfFileExists = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + `surah_${surahNumber}.mp3`
      );
      if (fileInfo.exists) {
        setDownloaded(true);
      } else {
        setDownloaded(false);
      }
    } catch (error) {
      console.error("Error checking file:", error);
    }
  };

  const loadAudio = async () => {
    setIsLoading(true);
    try {
      const localFileUri =
        FileSystem.documentDirectory + `surah_${surahNumber}.mp3`;
      const localFileInfo = await FileSystem.getInfoAsync(localFileUri);

      if (localFileInfo.exists) {
        // Load and play audio from local file system
        const { sound } = await Audio.Sound.createAsync(
          { uri: localFileUri },
          { shouldPlay: false }
        );
        setSound(sound);
      } else {
        // Load and play audio from provided audioUrl
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false }
        );
        setSound(sound);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading audio:", error);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setPlaybackPosition(status.positionMillis);
    setPlaybackDuration(status.durationMillis || 1);

    // Check if playback has reached the end
    if (status.didJustFinish) {
      // Reset playback position to the beginning
      setPlaybackPosition(0);
      setIsPlaying(false);
      sound.stopAsync(); // Stop the audio
    }
  };

  const handlePlayPauseToggle = async () => {
    if (!sound) {
      await loadAudio();
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        if (playbackPosition >= playbackDuration) {
          await sound.setPositionAsync(0);
        }
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(Math.round(value));
      setPlaybackPosition(value);
    }
  };

  const downloadAudio = async () => {
    Alert.alert(
      "Download",
      "Do you want to download the audio file?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Download", onPress: performDownload },
      ],
      { cancelable: false }
    );
  };

  const performDownload = async () => {
    setIsDownloading(true);
    setShowSlider(false);
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        audioUrl,
        FileSystem.documentDirectory + `surah_${surahNumber}.mp3`
      );

      const { uri } = await downloadResumable.downloadAsync();
      setIsDownloading(false);
      setShowSlider(true);
      setDownloaded(true);
      Alert.alert("Download Complete", `Audio downloaded to: ${uri}`);
    } catch (error) {
      setIsDownloading(false);
      setShowSlider(true);
      Alert.alert("Error", "Failed to download audio");
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={{ color: "#ffff", fontSize: 15 }}>Buffering.....</Text>
      ) : (
        <View style={styles.playbackContainer}>
          {showSlider ? (
            <>
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={32}
                color="white"
                style={styles.icon}
                onPress={handlePlayPauseToggle}
              />
              {!downloaded && (
                <Pressable onPress={downloadAudio}>
                  <Feather
                    name={isDownloading ? "download-cloud" : "download-cloud"}
                    size={32}
                    color="white"
                    style={styles.icon}
                  />
                </Pressable>
              )}
              <Text style={styles.timeText}>
                {formatTime(playbackPosition)}
              </Text>
              <Slider
                style={styles.slider}
                step={1}
                minimumValue={0}
                maximumValue={playbackDuration}
                value={playbackPosition}
                onValueChange={handleSliderValueChange}
                minimumTrackTintColor="#cfffe8"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#3CFFA1"
              />
              <Text style={styles.timeText}>
                {formatTime(playbackDuration)}
              </Text>
            </>
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playbackContainer: {
    flexDirection: "row",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  slider: {
    flex: 1,
    width: 300,
    height: 40,
  },
  timeText: {
    color: "white",
  },
  icon: {
    marginRight: 10,
  },
});

export default AudioPlayer;
