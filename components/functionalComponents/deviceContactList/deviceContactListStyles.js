import { StyleSheet } from "react-native";

const deviceContactListStyles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: "80%",
    backgroundColor: "#222",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    gap: 20,
  },
  headerText: { fontSize: 30, color: "#fff", fontWeight: "700" },
  closeButton: { position: "absolute", top: 20, left: 20 },
  closeButtonText: { color: "#0071E3", fontSize: 20 },
  textInput: {
    width: "84%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#444",
    fontSize: 18,
    color: "#fff",
    borderRadius: 20,
  },
  listContainer: { height: 500, width: "100%", paddingBottom: 10 },
});

export default deviceContactListStyles;
