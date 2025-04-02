// src/screens/LevelSelectScreen.js
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBox, createText, useTheme } from "@shopify/restyle";
import { FlashList } from "@shopify/flash-list";
import { Star, Lock, Check } from "lucide-react-native";

import { Card } from "../components/ui";
import useCategoryStore from "../store/useCategoryStore";
import useGameStore from "../store/useGameStore";
import { getSentencesByCategory } from "../data/sentences";

const Box = createBox();
const Text = createText();

const DIFFICULTY_COLORS = {
  beginner: "#1DD1A1", // Green
  intermediate: "#FECA57", // Yellow
  advanced: "#FF6B6B", // Red
};

const LevelCard = ({ level, isCompleted, isUnlocked, onPress }) => {
  const theme = useTheme();

  // Calculate stars based on score
  const stars = useMemo(() => {
    if (!isCompleted) return 0;

    const completedLevel = level.completedData;
    if (!completedLevel) return 0;

    return completedLevel.stars || 0;
  }, [isCompleted, level]);

  return (
    <Pressable
      onPress={isUnlocked ? onPress : null}
      style={({ pressed }) => [
        styles.levelCardContainer,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
    >
      <Card
        flex={1}
        padding="md"
        opacity={isUnlocked ? 1 : 0.7}
        decorative={false}
      >
        <Box
          position="absolute"
          top={-8}
          left={-8}
          width={24}
          height={24}
          borderRadius={12}
          backgroundColor={
            DIFFICULTY_COLORS[level.difficulty] || theme.colors.primary
          }
          borderWidth={2}
          borderColor="outline"
          justifyContent="center"
          alignItems="center"
        />

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="subtitle">Level {level.level}</Text>
          {isCompleted ? (
            <Box
              backgroundColor="accent2"
              borderRadius="round"
              width={28}
              height={28}
              justifyContent="center"
              alignItems="center"
              borderWidth={2}
              borderColor="outline"
            >
              <Check color={theme.colors.text} size={16} />
            </Box>
          ) : !isUnlocked ? (
            <Box
              backgroundColor="background"
              borderRadius="round"
              width={28}
              height={28}
              justifyContent="center"
              alignItems="center"
              borderWidth={2}
              borderColor="outline"
            >
              <Lock color={theme.colors.text} size={16} />
            </Box>
          ) : null}
        </Box>

        <Box marginTop="sm">
          <Text variant="small" numberOfLines={2} ellipsizeMode="tail">
            {level.instructions}
          </Text>
        </Box>

        {isCompleted && (
          <Box flexDirection="row" marginTop="md">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                size={16}
                color={theme.colors.text}
                fill={i <= stars ? theme.colors.accent1 : "transparent"}
                style={{ marginRight: 2 }}
              />
            ))}
          </Box>
        )}
      </Card>
    </Pressable>
  );
};

const LevelSelectScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { category } = route.params;

  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const completedLevels = useGameStore((state) => state.completedLevels);
  const startLevel = useGameStore((state) => state.startLevel);

  const levels = useMemo(() => {
    return getSentencesByCategory(selectedCategory).map((level) => {
      const completedData = completedLevels.find((cl) => cl.id === level.id);
      return {
        ...level,
        completedData,
      };
    });
  }, [selectedCategory, completedLevels]);

  const handleLevelPress = (level) => {
    startLevel(level);
    navigation.navigate("Game", { levelId: level.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Box
        width={50}
        height={50}
        borderRadius={25}
        backgroundColor="primary"
        position="absolute"
        top={10}
        right={-15}
        borderWidth={2}
        borderColor="outline"
        zIndex={-1}
      />

      <Box
        width={20}
        height={20}
        borderRadius={4}
        backgroundColor="accent1"
        position="absolute"
        top={80}
        left={15}
        borderWidth={2}
        borderColor="outline"
        transform={[{ rotate: "15deg" }]}
        zIndex={-1}
      />

      <Box paddingHorizontal="lg" paddingBottom="md">
        <Text variant="body">Select a level to start playing:</Text>
      </Box>

      <FlashList
        data={levels}
        keyExtractor={(item) => item.id}
        estimatedItemSize={120}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          // Level is unlocked if it's the first level or if the previous level is completed
          const isUnlocked =
            index === 0 ||
            completedLevels.some((cl) => cl.id === levels[index - 1]?.id);
          const isCompleted = completedLevels.some((cl) => cl.id === item.id);

          return (
            <LevelCard
              level={item}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              onPress={() => handleLevelPress(item)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  levelCardContainer: {
    width: "50%",
    padding: 8,
  },
});

export default LevelSelectScreen;
