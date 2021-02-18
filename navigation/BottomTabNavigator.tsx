/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import NewsLetterScreen from "../screens/NewsLetterScreen";
import {
  BottomTabParamList,
  HomeParamList,
  NewsLetterParamList,
} from "../types";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: Colors.light.primaryColor }}
      activeColor="#fff"
      inactiveColor="#ffffff80"
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
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
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
