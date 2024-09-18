import ChapterListItem from "./ChapterListItem";
import { useNavigation } from "@react-navigation/native";
import ChapterService from "../services/ChapterService";

export default function ChapterList() {
  const navigation = useNavigation();
  const chapters = ChapterService.getChapters();

  return (
    <>
      {chapters.map((chapter) => (
        <ChapterListItem
          chapter={chapter}
          navigation={navigation}
          key={chapter.id}
        ></ChapterListItem>
      ))}
    </>
  );
}
