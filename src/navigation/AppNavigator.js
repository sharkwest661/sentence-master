// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shopify/restyle";
import { Home, Award, Settings as SettingsIcon } from "lucide-react-native";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import LevelSelectScreen from "../screens/LevelSelectScreen";
import GameScreen from "../screens/GameScreen";
import ResultScreen from "../screens/ResultScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigators for each tab
const HomeStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 3,
          borderBottomColor: theme.colors.outline,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: "WorkSans-SemiBold",
          fontSize: 20,
          color: theme.colors.text,
          textTransform: "uppercase",
        },
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LevelSelect"
        component={LevelSelectScreen}
        options={({ route }) => ({
          title: route.params?.category?.name || "Levels",
        })}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const AchievementsStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 3,
          borderBottomColor: theme.colors.outline,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: "WorkSans-SemiBold",
          fontSize: 20,
          color: theme.colors.text,
          textTransform: "uppercase",
        },
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 3,
          borderBottomColor: theme.colors.outline,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: "WorkSans-SemiBold",
          fontSize: 20,
          color: theme.colors.text,
          textTransform: "uppercase",
        },
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Main tab navigator
const AppNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 3,
            borderTopColor: theme.colors.outline,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarLabelStyle: {
            fontFamily: "WorkSans-Medium",
            fontSize: 12,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: "Learn",
            tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="AchievementsTab"
          component={AchievementsStack}
          options={{
            tabBarLabel: "Achievements",
            tabBarIcon: ({ color }) => <Award color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStack}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => <SettingsIcon color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
