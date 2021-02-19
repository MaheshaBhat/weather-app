import * as React from "react";
import { WebView } from "react-native-webview";

const BrowserScreen = () => {
  return (
    <WebView source={{ uri: "https://www.google.com" }} style={{ marginTop: 20 }} />
  );
};
export default BrowserScreen;
