import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

// Style
import styles from "../../../commonStyles";
import contactItemStyles from "./contactItemStyles";

// Translations
import i18n from "../../../assets/translations/i18n";

// Gestures
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

// Lodash
import _ from "lodash";

function ContactItem(props) {
  function handlePressContact() {
    if (!props.handlePressContact) return;

    if (props.item.phoneNumbers.length === 1)
      return props.handlePressContact(props.item);

    const alertButtons = props.item.phoneNumbers.map((phoneNumber) => {
      return {
        text: phoneNumber.number,
        onPress: () => {
          const contactInfoToSend = {
            ...props.item,
            phoneNumbers: [{ ...phoneNumber }],
          };
          props.handlePressContact(contactInfoToSend);
        },
      };
    });

    Alert.alert(
      i18n.t("translations.alert.multipleNumbers.title"),
      i18n.t("translations.alert.multipleNumbers.subTitle"),
      alertButtons
    );
  }

  function handleDelete() {
    if (!props.handleDelete) return;
    props.handleDelete(props.item);
  }

  function renderRightActions() {
    return (
      <TouchableOpacity
        style={[
          styles.center,
          {
            width: 100,
            backgroundColor: "#d90429",
            borderRadius: 10,
          },
        ]}
        onPress={handleDelete}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
          {i18n.t("translations.buttons.delete")}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={contactItemStyles.mainView}>
      {props.isSwipeable && (
        <GestureHandlerRootView>
          <Swipeable renderRightActions={renderRightActions}>
            <Text
              style={[
                styles.defaultTextColor,
                contactItemStyles.swipeableHeader,
              ]}
            >
              {props.item.name}
            </Text>
            <Text
              style={[styles.defaultTextColor, contactItemStyles.swipeableText]}
            >
              {props.item.phoneNumbers[0].number}
            </Text>
          </Swipeable>
        </GestureHandlerRootView>
      )}
      {!props.isSwipeable && (
        <TouchableOpacity onPress={handlePressContact}>
          <Text
            style={[styles.defaultTextColor, contactItemStyles.defaultText]}
          >
            {props.item.name}
          </Text>
        </TouchableOpacity>
      )}
      <View style={contactItemStyles.upperLine}></View>
    </View>
  );
}

export default ContactItem;
