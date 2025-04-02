// src/store/useCategoryStore.js
import { create } from "zustand";

const useCategoryStore = create((set) => ({
  categories: [
    { id: "basics", name: "Basics", icon: "book-open", color: "#FF6B6B" },
    {
      id: "daily",
      name: "Daily Conversations",
      icon: "coffee",
      color: "#48DBFB",
    },
    {
      id: "business",
      name: "Business English",
      icon: "briefcase",
      color: "#FECA57",
    },
    {
      id: "academic",
      name: "Academic",
      icon: "graduation-cap",
      color: "#1DD1A1",
    },
    {
      id: "idioms",
      name: "Idioms & Expressions",
      icon: "message-circle",
      color: "#FF6B6B",
    },
  ],
  selectedCategory: "basics",
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
}));

export default useCategoryStore;
