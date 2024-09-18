import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import chapterBg from "../assets/images/chapter-number.png";
import LoadingScreen from "../screens/LoadingScreen";
import fonts from "../constants/fonts";
import { useFonts } from "expo-font";

export default function ChapterListItem({ navigation, chapter }) {
  const [fontsLoaded] = useFonts(fonts);
  function ViewSurah(c) {
    navigation.navigate("ViewSurah", {
      name: c.namePron,
      chapter: c,
    });
  }

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => ViewSurah(chapter)}
    >
      <ImageBackground
        source={chapterBg}
        resizeMode="cover"
        style={styles.chapterNumber}
      >
        <Text style={styles.chapterNumberText}>{chapter.id}</Text>
      </ImageBackground>
      <View style={{ flexGrow: 1 }}>
        <Text style={styles.name}>{chapter.namePron}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.class}>
            {chapter.class === "మక్కీ" ? "మక్కీ" : "మదనీ"}
          </Text>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.versesNumber}>
            {chapter.versesNumber + " ఆయత్"}
          </Text>
        </View>
      </View>
      <Text style={styles.nameAr}>{chapter.nameAr}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#b5b5b5",
    flexDirection: "row",
    alignItems: "center",
  },
  chapterNumber: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 17,
  },
  chapterNumberText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "PoppinsMedium",
    color: "black",
    letterSpacing: 1,
  },
  nameAr: {
    fontSize: 25,
    marginTop: -10,
    fontFamily: "AmiriBold",
    color: "#8A46E9",
  },
  bullet: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#A19CC5",
    paddingHorizontal: 4,
  },
  class: {
    fontSize: 18,
    color: "#A19CC5",
  },
  versesNumber: {
    fontSize: 18,
    color: "#A19CC5",
  },
});
