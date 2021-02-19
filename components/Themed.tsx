import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";

import { colorType } from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const theme = useTheme() as colorType;
  const { style, ...otherProps } = props;
  const color = theme.colors.text;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const theme = useTheme() as colorType;
  const { style, ...otherProps } = props;
  const backgroundColor = theme.colors.background;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
