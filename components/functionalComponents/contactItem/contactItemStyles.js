import { StyleSheet } from "react-native";

const contactItemStyles = StyleSheet.create({
  swipeableHeader: {
    paddingLeft: 50,
    fontWeight: 600,
    fontSize: 22,
  },
  swipeableText: {
    paddingLeft: 60,
    fontSize: 20,
  },
  defaultText: {
    paddingLeft: 20,
    fontSize: 22,
  },
  upperLine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#555",
  },
  mainView: {
    position: "relative",
    height: 80,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
  },
});

export default contactItemStyles;
