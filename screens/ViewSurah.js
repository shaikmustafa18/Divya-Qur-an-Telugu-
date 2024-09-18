import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import LoadingScreen from "../screens/LoadingScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import verseBullet from "../assets/images/chapter-number.png";
import AudioPlayer from "../audioscreens/AudioPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Menu, Provider } from "react-native-paper";
import fonts from "../constants/fonts";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function ViewSurah({ route }) {
  const [fontsLoaded] = useFonts(fonts);
  const [chapter, setChapter] = useState(null);
  const [arabicTextSize, setArabicTextSize] = useState(16);
  const [teluguTextSize, setTeluguTextSize] = useState(16);
  const [bookmarkVisible, setBookmarkVisible] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const arabicSize = await AsyncStorage.getItem("arabicTextSize");
        const teluguSize = await AsyncStorage.getItem("teluguTextSize");
        if (arabicSize !== null) setArabicTextSize(JSON.parse(arabicSize));
        if (teluguSize !== null) setTeluguTextSize(JSON.parse(teluguSize));
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    setChapter(route?.params?.chapter);
  }, [route.params]);

  const addBookmark = async (verse) => {
    try {
      const existingBookmarks = await AsyncStorage.getItem("bookmarks");
      let bookmarks = existingBookmarks ? JSON.parse(existingBookmarks) : [];
      bookmarks.push({ chapterId: chapter.id, verse });
      await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      Alert.alert(
        "Bookmarked!",
        "This verse has been added to your bookmarks."
      );
    } catch (error) {
      console.error("Failed to add bookmark", error);
    }
  };

  const openMenu = (index) => {
    setSelectedVerse(index);
    setBookmarkVisible(true);
  };

  const closeMenu = () => {
    setBookmarkVisible(false);
  };

  if (!chapter) {
    return <LoadingScreen />;
  }

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={[styles.headerContainer]}>
            <View style={styles.headerCard}>
              <Text style={styles.headerText}>{chapter.namePron}</Text>
              <Text style={styles.headerSubText}>{chapter.surahtitle}</Text>
              <View style={styles.separator} />
              <Text style={styles.headerVerses}>
                {chapter.class === "మక్కీ" ? "మక్కీ" : "మదనీ"} •
                {chapter.versesNumber + " ఆయత్"}
              </Text>
              <Text style={[styles.arabic]}>
                بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
              </Text>
            </View>
          </View>
          <View style={styles.verses}>
            <Animated.View style={{ flex: 1 }}>
              {chapter.verses &&
                chapter.verses.map((verse, index) => (
                  <Card style={styles.card} key={index}>
                    <Card.Content style={styles.verseContainer}>
                      <View style={styles.verseHeader}>
                        <ImageBackground
                          source={verseBullet}
                          resizeMode="cover"
                          style={styles.verseNumber}
                        >
                          <Text style={styles.verseNumberText}>
                            {index + 1}
                          </Text>
                        </ImageBackground>
                        <TouchableOpacity onPress={() => openMenu(index)}>
                          <Text style={styles.menuIcon}>⋮</Text>
                        </TouchableOpacity>
                        {selectedVerse === index && (
                          <Menu
                            visible={bookmarkVisible}
                            onDismiss={closeMenu}
                            anchor={<Text style={styles.menuIcon}>⋮</Text>}
                          >
                            <Menu.Item
                              onPress={() => addBookmark(verse)}
                              title="Add Bookmark"
                              icon="bookmark-outline"
                            />
                            <Menu.Item
                              onPress={() => {}}
                              title="Copy Arabic + Telugu"
                              icon="content-copy"
                            />
                            <Menu.Item
                              onPress={() => {}}
                              title="Copy Arabic"
                              icon="content-copy"
                            />
                            <Menu.Item
                              onPress={() => {}}
                              title="Copy Telugu"
                              icon="content-copy"
                            />
                          </Menu>
                        )}
                      </View>
                      <Text
                        style={[styles.verse, { fontSize: arabicTextSize }]}
                      >
                        {verse}
                      </Text>
                      {chapter.translation && chapter.translation[index] && (
                        <Text
                          style={[
                            styles.translation,
                            { fontSize: teluguTextSize },
                          ]}
                        >
                          {chapter.translation[index]}
                        </Text>
                      )}
                    </Card.Content>
                  </Card>
                ))}
            </Animated.View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <AudioPlayer
            audioUrl={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${chapter.id}.mp3`}
            surahNumber={chapter.id}
          />
        </View>
        {/* <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => navigation.navigate("BookmarkScreen")}
        >
          <Text style={styles.bookmarkButtonText}>Go to Bookmarks</Text>
        </TouchableOpacity> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  bookmarkButton: {
    backgroundColor: "#240F4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  headerCard: {
    backgroundColor: "#863ED5",
    borderRadius: 15,
    padding: 16,
    shadowColor: "purple",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 15,
    width: 310,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "500",
    fontFamily: "PoppinsMedium",
    color: "#ffff",
    marginTop: 10,
  },
  headerSubText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "PoppinsMedium",
    color: "#ffff",
    marginTop: 8,
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 18,
  },
  headerVerses: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: "#ffff",
    marginTop: 8,
  },
  arabic: {
    fontSize: 35,
    fontFamily: "AlQalamQuran",
    color: "#fff",
  },
  verses: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  verseContainer: {
    backgroundColor: "#ffff",
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderBottomWidth: 10,
    borderColor: "#ffff",
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verse: {
    fontSize: 25,
    flexShrink: 1,
    flexGrow: 1,
    marginBottom: 10,
    color: "black",
    textAlign: "right",
    lineHeight: 40,
    paddingHorizontal: 20,
  },
  translation: {
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    flexShrink: 1,
    flexGrow: 1,
    lineHeight: 40,
    textAlign: "center",
    color: "#240F4F",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  verseNumber: {
    width: 45,
    height: 45,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verseNumberText: {
    fontWeight: "bold",
    color: "black",
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "8%",
    backgroundColor: "#863ED5",
  },
  menuIcon: {
    fontSize: 24,
    color: "#240F4F",
    paddingHorizontal: 10,
  },
  card: {
    marginVertical: 8,
    backgroundColor: "#fff",
  },
});
