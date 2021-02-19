import { useContext } from "react";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors, { colorType } from "../constants/Colors";
import DrawerContent from "../components/DrawerContent";
import { AppContext, contextType } from "../context";

export default function Navigation() {
  const { theme } = useContext<contextType>(AppContext);
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <TabNavigator />
    </NavigationContainer>
  );
}

const HeaderLeft = (props: StackHeaderLeftButtonProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
    >
      <Ionicons
        name="menu"
        size={30}
        color={"#009688"}
        style={{ paddingLeft: 20 }}
      />
    </TouchableOpacity>
  );
};

// A root stack navigator is often used for displaying modals on top of all other content
const Stack = createStackNavigator<RootStackParamList>();

function TabNavigator() {
  const theme = useTheme() as colorType;
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: (props) => <HeaderLeft {...props} />,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primaryColor,
        },
        headerTitle: "Weather App",
        headerTitleStyle: { color: "white" },
      }}
    >
      <Stack.Screen name="Tab" component={RootDrawer} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function RootDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
