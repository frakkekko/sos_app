import React from "react";
import { Text, TouchableOpacity } from "react-native";

// Style
import styles from "../../../commonStyles";
import customButtonStyle from "./customButtonStyle";

function CustomButton(props) {
  function handleTap() {
    if (!props.handleTap) return;

    props.handleTap();
  }

  return (
    <TouchableOpacity
      onPress={handleTap}
      style={[
        customButtonStyle.generalStyle,
        props.sos ? customButtonStyle.sosStyle : customButtonStyle.defaultStyle,
      ]}
    >
      <Text style={[props.sos ? customButtonStyle.sosText : styles.text]}>
        {" "}
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
