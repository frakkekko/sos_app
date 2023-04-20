import React from "react";
import { View, Dimensions } from "react-native";

// FlashList
import { FlashList } from "@shopify/flash-list";

// Components
import ContactItem from "../contactItem/ContactItem";

function ContactsList(props) {
  function handleDelete(item) {
    if (!props.handleDelete) return;

    props.handleDelete(item);
  }

  function renderItemList({ item }) {
    return (
      <ContactItem item={item} isSwipeable={true} handleDelete={handleDelete} />
    );
  }

  function extractFlashListItemKey(item) {
    return item.phoneNumbers[0].id.toString();
  }

  return (
    <View
      style={{ height: Dimensions.get("window").height * 0.6, width: "100%" }}
    >
      <FlashList
        renderItem={renderItemList}
        data={props.storedContactList}
        keyExtractor={extractFlashListItemKey}
        estimatedItemSize={80}
      />
    </View>
  );
}

export default ContactsList;
