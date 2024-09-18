import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper";

export default function BookmarkScreen() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const savedBookmarks = await AsyncStorage.getItem("bookmarks");
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks", error);
      }
    };

    loadBookmarks();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.text}>Chapter ID: {item.chapterId}</Text>
        <Text style={styles.text}>Verse: {item.verse}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No bookmarks added yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
