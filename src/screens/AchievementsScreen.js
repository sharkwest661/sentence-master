// src/screens/AchievementsScreen.js
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBox, createText, useTheme } from "@shopify/restyle";
import { FlashList } from "@shopify/flash-list";
import {
  Trophy,
  Star,
  Zap,
  Clock,
  BookOpen,
  Award,
  Badge,
  Sparkles,
  Lock,
} from "lucide-react-native";

import { Card } from "../components/ui";
import useGameStore from "../store/useGameStore";

const Box = createBox();
const Text = createText();

const ACHIEVEMENTS = [
  {
    id: "starter",
    name: "Getting Started",
    description: "Complete your first level",
    icon: <Trophy />,
    color: "#FF6B6B",
    condition: (state) => state.completedLevels.length >= 1,
  },
  {
    id: "basics-master",
    name: "Basics Master",
    description: "Complete all levels in the Basics category",
    icon: <BookOpen />,
    color: "#FF6B6B",
    condition: (state) =>
      state.completedLevels.filter((l) => l.id.startsWith("basics-")).length >=
      3,
  },
  {
    id: "daily-master",
    name: "Conversation Expert",
    description: "Complete all levels in the Daily Conversations category",
    icon: <Trophy />,
    color: "#48DBFB",
    condition: (state) =>
      state.completedLevels.filter((l) => l.id.startsWith("daily-")).length >=
      3,
  },
  {
    id: "business-master",
    name: "Business Linguistics",
    description: "Complete all levels in the Business English category",
    icon: <Trophy />,
    color: "#FECA57",
    condition: (state) =>
      state.completedLevels.filter((l) => l.id.startsWith("business-"))
        .length >= 3,
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get a perfect 3-star score on any level",
    icon: <Star />,
    color: "#FECA57",
    condition: (state) => state.completedLevels.some((l) => l.stars === 3),
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Complete a level with more than 30 seconds left",
    icon: <Clock />,
    color: "#1DD1A1",
    condition: (state) => state.completedLevels.some((l) => l.score >= 150),
  },
  {
    id: "no-hints",
    name: "Self-Reliant",
    description: "Complete 5 levels without using any hints",
    icon: <Zap />,
    color: "#FF6B6B",
    condition: (state) =>
      state.completedLevels.filter((l) => !l.hintsUsed).length >= 5,
  },
  {
    id: "advanced-thinker",
    name: "Advanced Thinker",
    description: "Complete an advanced difficulty level",
    icon: <Badge />,
    color: "#48DBFB",
    condition: (state) =>
      state.completedLevels.some(
        (l) => l.id.includes("-") && ["business-3", "academic-1"].includes(l.id)
      ),
  },
  {
    id: "master-linguist",
    name: "Master Linguist",
    description: "Complete at least 10 levels",
    icon: <Award />,
    color: "#1DD1A1",
    condition: (state) => state.completedLevels.length >= 10,
  },
  {
    id: "sentence-champion",
    name: "Sentence Champion",
    description: "Earn a total of 1000 points",
    icon: <Sparkles />,
    color: "#FECA57",
    condition: (state) => state.points >= 1000,
  },
];

const AchievementCard = ({ achievement, isUnlocked }) => {
  const theme = useTheme();

  return (
    <Card marginVertical="md" decorative={true}>
      <Box flexDirection="row" alignItems="center">
        <Box
          width={50}
          height={50}
          borderRadius={25}
          backgroundColor={isUnlocked ? achievement.color : "background"}
          borderWidth={2}
          borderColor="outline"
          justifyContent="center"
          alignItems="center"
          marginRight="md"
        >
          {isUnlocked ? (
            React.cloneElement(achievement.icon, {
              color: theme.colors.text,
              size: 24,
            })
          ) : (
            <Lock color={theme.colors.text} size={24} />
          )}
        </Box>

        <Box flex={1}>
          <Text
            variant="subtitle"
            color={isUnlocked ? "text" : "text"}
            opacity={isUnlocked ? 1 : 0.6}
          >
            {achievement.name}
          </Text>

          <Text variant="small" color="text" opacity={isUnlocked ? 0.8 : 0.4}>
            {achievement.description}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

const AchievementsScreen = () => {
  const theme = useTheme();
  const achievements = useGameStore((state) => state.achievements);
  const gameState = useGameStore();

  // Calculate unlocked vs. locked achievements
  const achievementsWithStatus = ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    isUnlocked:
      achievements.includes(achievement.id) || achievement.condition(gameState),
  }));

  const unlockedCount = achievementsWithStatus.filter(
    (a) => a.isUnlocked
  ).length;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Box
        paddingHorizontal="lg"
        paddingVertical="lg"
        backgroundColor="background"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="lg"
        >
          <Text variant="title">Your Achievements</Text>
          <Box
            backgroundColor="primary"
            paddingHorizontal="md"
            paddingVertical="xs"
            borderRadius="sm"
            borderWidth={2}
            borderColor="outline"
          >
            <Text variant="body" color="white">
              {unlockedCount}/{ACHIEVEMENTS.length}
            </Text>
          </Box>
        </Box>

        <ProgressBar
          progress={(unlockedCount / ACHIEVEMENTS.length) * 100}
          height={12}
          marginBottom="lg"
        />
      </Box>

      {/* Decorative elements */}
      <Box
        position="absolute"
        width={40}
        height={40}
        borderRadius={20}
        backgroundColor="accent1"
        borderWidth={2}
        borderColor="outline"
        top={40}
        right={-15}
        zIndex={-1}
      />

      <Box
        position="absolute"
        width={20}
        height={20}
        borderRadius={3}
        backgroundColor="accent2"
        borderWidth={2}
        borderColor="outline"
        top={100}
        left={10}
        transform={[{ rotate: "15deg" }]}
        zIndex={-1}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Box paddingHorizontal="lg">
          {/* Unlocked achievements first */}
          {achievementsWithStatus
            .filter((a) => a.isUnlocked)
            .map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isUnlocked={true}
              />
            ))}

          {/* Locked achievements */}
          {achievementsWithStatus
            .filter((a) => !a.isUnlocked)
            .map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isUnlocked={false}
              />
            ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

// Import needed component
const ProgressBar = ({ progress, height = 15, ...rest }) => {
  return (
    <Box
      backgroundColor="background"
      borderWidth={2}
      borderColor="outline"
      borderRadius="sm"
      height={height}
      overflow="hidden"
      {...rest}
    >
      <Box
        backgroundColor="secondary"
        height="100%"
        width={`${progress}%`}
        borderRadius="sm"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
});

export default AchievementsScreen;
