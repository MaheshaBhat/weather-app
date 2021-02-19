import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";

import { colorType } from "../constants/Colors";
import { normalize } from "../constants/Layout";

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
  const newStyle = Object.assign((style as any) ?? {});
  const fontSize = normalize(newStyle?.fontSize ?? 14);

  return (
    <DefaultText
      style={[{ color, fontFamily: "space-mono", letterSpacing: -0.8 }, style, { fontSize }]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const theme = useTheme() as colorType;
  const { style, ...otherProps } = props;
  const backgroundColor = theme.colors.background;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
