import {
  DefaultTheme,
  DarkTheme,
  Theme
} from '@react-navigation/native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';


const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000',
    background: '#fff',
    primaryColor: '#00bfa5',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  }
};
const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fff',
    background: '#000',
    primaryColor: '#7fdfd2',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  }
};

export type colorType = typeof light | typeof dark;

export default {
  light, dark
};
