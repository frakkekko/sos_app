import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  mainView: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 120,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 52,
    fontWeight: 800,
    color: "#fff",
  },
  sosAnimationWrapper: { backgroundColor: "#111", borderRadius: 20 },
  animation: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 150,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  goToMapButton: { width: 180 },
  goToContactsButton: { width: 150 },
});

export default homeStyles;
