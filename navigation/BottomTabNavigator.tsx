/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";
import * as React from "react";

import Colors, { colorType } from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import NewsLetterScreen from "../screens/NewsLetterScreen";
import {
  BottomTabParamList,
  HomeParamList,
  NewsLetterParamList,
} from "../types";
import { normalize } from "../constants/Layout";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme() as colorType;

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: theme.colors.primaryColor,
        inactiveBackgroundColor: theme.colors.primaryColor + 80,
        activeTintColor: theme.colors.background,
        inactiveTintColor: theme.colors.background,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="NewsLetter"
        component={NewsLetterNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={normalize(20)} style={{ marginBottom: -3 }} {...props} />;
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const NewsLetterStack = createStackNavigator<NewsLetterParamList>();

function NewsLetterNavigator() {
  return (
    <NewsLetterStack.Navigator>
      <NewsLetterStack.Screen
        name="NewsLetterScreen"
        component={NewsLetterScreen}
        options={{ headerShown: false }}
      />
    </NewsLetterStack.Navigator>
  );
}
