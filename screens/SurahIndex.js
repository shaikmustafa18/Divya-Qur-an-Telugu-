import { StyleSheet, ScrollView } from "react-native";
import ChapterListIem from "../components/ChapterList";

export default function SurahIndex() {
  return (
    <ScrollView style={styles.container}>
      <ChapterListIem />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F1F1",
  },
});
