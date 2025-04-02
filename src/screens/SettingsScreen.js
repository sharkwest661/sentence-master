// src/screens/SettingsScreen.js
import React from "react";
import {
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBox, createText, useTheme } from "@shopify/restyle";
import {
  Volume2,
  Volume2Off,
  Vibrate,
  VibrateOff,
  Lightbulb,
  LightbulbOff,
  Moon,
  Sun,
  RefreshCw,
  User,
  InfoIcon,
  ThumbsUp,
} from "lucide-react-native";

import { Card, Button } from "../components/ui";
import useSettingsStore from "../store/useSettingsStore";
import useGameStore from "../store/useGameStore";

const Box = createBox();
const Text = createText();

const DecorativeShape = ({ style, color }) => (
  <Box
    style={[styles.decorativeShape, style]}
    backgroundColor={color}
    borderWidth={2}
    borderColor="outline"
  />
);

const SettingRow = ({
  icon,
  label,
  description,
  toggleIcon,
  value,
  onToggle,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingVertical="md"
      borderBottomWidth={1}
      borderBottomColor={theme.colors.outline + "40"}
      opacity={disabled ? 0.5 : 1}
    >
      <Box flexDirection="row" alignItems="center" flex={1}>
        <Box
          width={40}
          height={40}
          borderRadius={20}
          backgroundColor="background"
          borderWidth={2}
          borderColor="outline"
          justifyContent="center"
          alignItems="center"
          marginRight="md"
        >
          {React.cloneElement(icon, {
            color: theme.colors.text,
            size: 20,
          })}
        </Box>

        <Box flex={1}>
          <Text variant="subtitle">{label}</Text>
          {description && (
            <Text variant="small" opacity={0.6}>
              {description}
            </Text>
          )}
        </Box>
      </Box>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: theme.colors.outline + "40",
          true: theme.colors.primary,
        }}
        thumbColor={value ? theme.colors.background : theme.colors.background}
        disabled={disabled}
      />
    </Box>
  );
};

const SelectableOption = ({ label, isSelected, onSelect, color }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.selectableOption,
        {
          backgroundColor: isSelected ? color : theme.colors.background,
          borderColor: theme.colors.outline,
        },
      ]}
    >
      <Text variant="button" color={isSelected ? "white" : "text"}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const theme = useTheme();
  const {
    soundEnabled,
    vibrationEnabled,
    showHints,
    darkMode,
    difficulty,
    toggleSound,
    toggleVibration,
    toggleHints,
    toggleDarkMode,
    setDifficulty,
  } = useSettingsStore();

  const resetGame = useGameStore((state) => state.resetGame);

  const handleResetProgress = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all your progress? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => resetGame(),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* Decorative elements */}
      <DecorativeShape
        style={{ top: 20, right: 20, borderRadius: 5 }}
        color={theme.colors.accent1}
      />
      <DecorativeShape
        style={{ bottom: 100, left: 15 }}
        color={theme.colors.primary}
      />
      <DecorativeShape
        style={{
          top: 200,
          left: 30,
          width: 15,
          height: 15,
          borderRadius: 2,
          transform: [{ rotate: "45deg" }],
        }}
        color={theme.colors.accent2}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Box paddingHorizontal="lg">
          <Text variant="title" marginBottom="lg">
            Settings
          </Text>

          <Card marginBottom="xl">
            <Text variant="subtitle" marginBottom="md">
              Game Settings
            </Text>

            <SettingRow
              icon={soundEnabled ? <Volume2 /> : <Volume2Off />}
              label="Sound"
              description="Enable game sounds and effects"
              value={soundEnabled}
              onToggle={toggleSound}
            />

            <SettingRow
              icon={vibrationEnabled ? <Vibrate /> : <VibrateOff />}
              label="Vibration"
              description="Enable haptic feedback"
              value={vibrationEnabled}
              onToggle={toggleVibration}
            />

            <SettingRow
              icon={showHints ? <Lightbulb /> : <LightbulbOff />}
              label="Show Hints"
              description="Enable hints during gameplay"
              value={showHints}
              onToggle={toggleHints}
            />

            <SettingRow
              icon={darkMode ? <Moon /> : <Sun />}
              label="Dark Mode"
              description="Coming soon!"
              value={darkMode}
              onToggle={toggleDarkMode}
              disabled={true}
            />
          </Card>

          <Card marginBottom="xl">
            <Text variant="subtitle" marginBottom="md">
              Difficulty Level
            </Text>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginVertical="md"
            >
              <SelectableOption
                label="Easy"
                isSelected={difficulty === "easy"}
                onSelect={() => setDifficulty("easy")}
                color={theme.colors.accent2}
              />

              <SelectableOption
                label="Normal"
                isSelected={difficulty === "normal"}
                onSelect={() => setDifficulty("normal")}
                color={theme.colors.accent1}
              />

              <SelectableOption
                label="Hard"
                isSelected={difficulty === "hard"}
                onSelect={() => setDifficulty("hard")}
                color={theme.colors.primary}
              />
            </Box>

            <Text variant="small" opacity={0.6} marginTop="sm">
              Adjusting difficulty changes time limits and scoring.
            </Text>
          </Card>

          <Card marginBottom="xl">
            <Text variant="subtitle" marginBottom="md">
              Account
            </Text>

            <Button
              variant="secondary"
              label="Reset Progress"
              icon={<RefreshCw color={theme.colors.text} size={20} />}
              onPress={handleResetProgress}
              marginVertical="md"
            />

            <Button
              variant="secondary"
              label="Profile"
              icon={<User color={theme.colors.text} size={20} />}
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "User profiles will be available in a future update."
                )
              }
              marginBottom="md"
              opacity={0.7}
            />
          </Card>

          <Card marginBottom="xl">
            <Text variant="subtitle" marginBottom="md">
              About
            </Text>

            <Button
              variant="secondary"
              label="About Sentence Master"
              icon={<InfoIcon color={theme.colors.text} size={20} />}
              onPress={() =>
                Alert.alert(
                  "Sentence Master",
                  "An English learning app designed to help users master sentence construction. Version 1.0.0"
                )
              }
              marginVertical="md"
            />

            <Button
              variant="secondary"
              label="Rate This App"
              icon={<ThumbsUp color={theme.colors.text} size={20} />}
              onPress={() =>
                Alert.alert(
                  "Thank You!",
                  "Rating feature will be available when the app is published."
                )
              }
              marginBottom="md"
              opacity={0.7}
            />
          </Card>
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
    paddingVertical: 16,
    paddingBottom: 40,
  },
  decorativeShape: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: -1,
  },
  selectableOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
});

export default SettingsScreen;
