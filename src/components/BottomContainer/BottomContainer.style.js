import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const container = backgroundColor => {
  return {
    height: 250,
    backgroundColor,
    borderRadius: 24,
    width: width * 0.9,
    alignSelf: "center",
    top:150,
    zIndex:0

    
  };
};

export default {
  containerGlue: {
    marginTop: 12
  },
  footerContainer: {
    flex: 1,
    margin: 16,
    alignItems: "center",
    flexDirection: "row"
  },
  rememberMeContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  switchTextStyle: {
    color: "white",
    fontSize:15,
    marginRight: 8,
    fontWeight: "700"
  }
};
