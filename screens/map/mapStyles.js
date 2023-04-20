import { StyleSheet } from "react-native";

const mapStyles = StyleSheet.create({
  topBlurView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 40,
    zIndex: 10,
  },
  bottomBlur: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 150,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  mapView: { height: "100%", width: "100%" },
  viewButtonsContainer: { width: 150 },
});

export default mapStyles;
