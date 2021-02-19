import React, { useState, ReactChild, createContext } from "react";

import useColorScheme from "../hooks/useColorScheme";
import Colors, { colorType } from "../constants/Colors";

export type contextType = {
  theme: colorType;
  setThemeType: Function;
  userName: string;
  image: string;
  setImage: Function;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  userName: "maheshbhat2012@gmail.com",
  image: "",
  setThemeType: () => {},
  setImage: () => {},
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<"light" | "dark">(colorScheme);
  const [image, setImage] = useState<string>("");
  const { children } = props;

  return (
    <AppContext.Provider
      value={{
        theme: themeType === "dark" ? Colors.dark : Colors.light,
        setThemeType,
        userName: "maheshbhat2012@gmail.com",
        image,
        setImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
