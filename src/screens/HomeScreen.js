// src/screens/HomeScreen.js
import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBox, createText, useTheme } from "@shopify/restyle";
import {
  BookOpen,
  Coffee,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Star,
  Trophy,
} from "lucide-react-native";

import { Button, Card, ProgressBar, AchievementIcon } from "../components/ui";
import useCategoryStore from "../store/useCategoryStore";
import useGameStore from "../store/useGameStore";

const Box = createBox();
const Text = createText();

const CategoryCard = ({ category, onPress }) => {
  const getIcon = () => {
    switch (category.icon) {
      case "book-open":
        return <BookOpen color={category.color} size={24} />;
      case "coffee":
        return <Coffee color={category.color} size={24} />;
      case "briefcase":
        return <Briefcase color={category.color} size={24} />;
      case "graduation-cap":
        return <GraduationCap color={category.color} size={24} />;
      case "message-circle":
        return <MessageCircle color={category.color} size={24} />;
      default:
        return <BookOpen color={category.color} size={24} />;
    }
  };

  return (
    <Card marginVertical="md" decorative={true}>
      <Button
        variant="secondary"
        label={category.name}
        icon={getIcon()}
        onPress={onPress}
      />
    </Card>
  );
};

const DecorativeShape = ({ style, color }) => (
  <Box
    style={[styles.decorativeShape, style]}
    backgroundColor={color}
    borderWidth={2}
    borderColor="outline"
  />
);

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const categories = useCategoryStore((state) => state.categories);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  const points = useGameStore((state) => state.points);
  const completedLevels = useGameStore((state) => state.completedLevels);
  const currentLevel = useGameStore((state) => state.currentLevel);

  const navigateToCategory = (category) => {
    setSelectedCategory(category.id);
    navigation.navigate("LevelSelect", { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      {/* Decorative elements */}
      <DecorativeShape
        style={{ top: 60, right: 20 }}
        color={theme.colors.primary}
      />
      <DecorativeShape
        style={{ top: 180, left: 10, width: 15, height: 15, borderRadius: 5 }}
        color={theme.colors.accent1}
      />
      <DecorativeShape
        style={{
          bottom: 100,
          right: 30,
          width: 20,
          height: 20,
          borderRadius: 3,
        }}
        color={theme.colors.accent2}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Box paddingHorizontal="lg" paddingTop="lg">
          <Text variant="header" marginBottom="lg">
            Sentence Master
          </Text>

          <Card marginBottom="lg" paddingVertical="lg">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text variant="subtitle">Your Progress</Text>
                <Text variant="title" color="primary">
                  {completedLevels.length} levels completed
                </Text>
              </Box>
              <AchievementIcon
                icon={<Trophy color={theme.colors.text} size={28} />}
                backgroundColor="accent1"
              />
            </Box>

            <Box marginTop="lg">
              <Text variant="small">Total Points</Text>
              <Text variant="title">{points} pts</Text>
            </Box>

            <Box marginTop="md" flexDirection="row" alignItems="center">
              <Star
                color={theme.colors.accent1}
                fill={theme.colors.accent1}
                size={20}
              />
              <Text variant="body" marginLeft="sm">
                Current Level: {currentLevel}
              </Text>
            </Box>

            <Box marginTop="md">
              <ProgressBar
                progress={Math.min((completedLevels.length / 20) * 100, 100)}
                height={12}
              />
            </Box>
          </Card>

          <Text variant="title" marginVertical="md">
            Categories
          </Text>

          <Box>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => navigateToCategory(category)}
              />
            ))}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  decorativeShape: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: -1,
  },
});

export default HomeScreen;
