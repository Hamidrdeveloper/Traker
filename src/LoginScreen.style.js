import { StyleSheet } from "react-native";
import {
  ScreenWidth,
  ScreenHeight,
  isIPhoneXFamily
} from "@freakycoder/react-native-helpers";

export const container = loginButtonBackgroundColor => {
  return {
    marginBottom: 32,
    width: ScreenWidth,
    height: `100%`,
    backgroundColor: "#8a8a8c"
  };
};

export default {
  spinnerStyle: {
    left: 0,
    right: 0,
    zIndex: 9,
    height: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
   
  },
  loginButtonStyle: {

    alignItems: "center",
    justifyContent: "center",
    width: `100%`,
    height: 85,
    backgroundColor: "#ccc",
   
  },
  loginButtonTextStyle: {
    color: "white",
    fontSize: 20,
  
    fontFamily: "IRANSansMobile_Bold"
  },
  imagebackgroundStyle: {

    width: ScreenWidth,
    height:100,
    position: "absolute",
    width: ScreenWidth,
  },
  blackoverlay: {
    width: ScreenWidth,
    height: `100%`,
    backgroundColor: "rgba(138,138,140,0.1)"
  },
  safeAreaViewStyle: {
    flex: 1
  },
  loginContainer: {
    marginTop: 24
  }
};
