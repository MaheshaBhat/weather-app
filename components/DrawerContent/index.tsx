import React, { useState, useEffect, useCallback, useContext } from "react";
import { Platform, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { View, Text } from "../Themed";
import { AppContext, contextType } from "../../context";

export default function DrawerContent(Props: any) {
  const [image, setImageUrl] = useState("");
  const { setImage } = useContext<contextType>(AppContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          // alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageUrl(result.uri);
    }
  }, [setImage]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {!!image && (
        <Image
          source={{ uri: image }}
          style={{ width: 70, height: 70, borderRadius: 70 }}
        />
      )}
      <Button title="Upload a image" onPress={pickImage} />
    </View>
  );
}
