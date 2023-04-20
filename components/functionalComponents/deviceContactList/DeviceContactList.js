import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

// Styles
import deviceContactListStyles from "./deviceContactListStyles";

// Translations
import i18n from "../../../assets/translations/i18n";

// FlashList
import { FlashList } from "@shopify/flash-list";

// Components
import ContactItem from "../contactItem/ContactItem";

function DeviceContactList(props) {
  function handlePressClose() {
    if (!props.handlePressClose) return;

    props.handlePressClose();
  }

  function handlePressContact(item) {
    props.handlePressContact(item);
    props.handlePressClose();
  }

  // useEffect(() => {
  //   console.log(props.contactList);
  // });

  function renderItemList({ item }) {
    // console.log(item.id);
    return (
      <ContactItem
        item={item}
        isSwipeable={false}
        handlePressContact={handlePressContact}
      />
    );
  }

  function handleFilter(str) {
    if (!props.handleFilter) return;

    props.handleFilter(str);
  }

  function dismissKeyboard() {
    Keyboard.dismiss();
  }

  return (
    <View style={deviceContactListStyles.mainView}>
      <Text style={deviceContactListStyles.headerText}>
        {i18n.t("translations.contactsModalScreen.contactsList")}
      </Text>
      <TouchableOpacity
        onPress={handlePressClose}
        style={deviceContactListStyles.closeButton}
      >
        <Text style={deviceContactListStyles.closeButtonText}>
          {i18n.t("translations.buttons.close")}
        </Text>
      </TouchableOpacity>

      <TextInput
        onChangeText={handleFilter}
        onBlur={dismissKeyboard}
        placeholder={i18n.t(
          "translations.contactsModalScreen.searchPlaceholder"
        )}
        style={deviceContactListStyles.textInput}
      />

      <View style={deviceContactListStyles.listContainer}>
        <FlashList
          renderItem={renderItemList}
          data={props.contactList}
          estimatedItemSize={100}
        />
      </View>
    </View>
  );
}

export default DeviceContactList;
