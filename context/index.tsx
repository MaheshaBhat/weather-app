import React, { useState, ReactChild, createContext, useEffect } from "react";
import * as FileSystem from "expo-file-system";

import useColorScheme from "../hooks/useColorScheme";
import Colors, { colorType } from "../constants/Colors";
import { getValueFor } from "../api-service";

export type contextType = {
  theme: colorType;
  setThemeType: Function;
  userName: string;
  image: string;
  setImage: Function;
  setUsername: Function;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  userName: "maheshbhat2012@gmail.com",
  image: "",
  setThemeType: () => {},
  setImage: () => {},
  setUsername: () => {},
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<"light" | "dark">(colorScheme);
  const [image, setImage] = useState<any>("");
  const [userName, setUsername] = useState<string>("");
  const { children } = props;

  useEffect(() => {
    (async () => {
      try {
        const user = await getValueFor("userName");
        const img = (await getValueFor("user-image")) as string;

        // console.log(res);
        if (user) setUsername(user);
        if (img === "") setImage("");
        if (img) {
          const res = await FileSystem.getInfoAsync(img);
          setImage(res.uri);
        }
      } catch (ex) {
        // console.log(ex);
      }
    })();
  }, [image]);

  return (
    <AppContext.Provider
      value={{
        theme: themeType === "dark" ? Colors.dark : Colors.light,
        setThemeType,
        userName,
        image,
        setUsername,
        setImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
