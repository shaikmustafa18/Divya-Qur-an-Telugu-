import chapters from "../data/chapters.json";

export default class ChapterService {
  static getChapters() {
    return chapters.map((chapter) => ({
      id: chapter.id,
      nameAr: chapter.name_ar,
      namePron: chapter.name_pron_en,
      surahtitle: chapter.surah_title,
      versesNumber: chapter.verses_number,
      class: chapter.class,
      verses: chapter.content
        .trim()
        .split(/\s*\[[0-9]+\]\s*/)
        .filter((a) => a),
      translation: chapter.Translation.trim()
        .split(/\s*\[[0-9]+\]\s*/)
        .filter((a) => a),
    }));
  }
}
