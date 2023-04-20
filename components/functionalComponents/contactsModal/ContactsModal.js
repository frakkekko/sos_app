import React from "react";
import { View, Modal } from "react-native";

// Components
import DeviceContactList from "../deviceContactList/DeviceContactList";

// Style
import styles from "../../../commonStyles";
import contactsModalStyles from "./contactsModalStyles";

function ContactsModal(props) {
  function handleFilter(str) {
    if (!props.handleFilter) return;

    props.handleFilter(str);
  }

  return (
    <Modal visible={props.showContactsModal} animationType="slide" transparent>
      <View style={[styles.container, contactsModalStyles.centerMainView]}>
        <DeviceContactList
          handlePressClose={props.closeModal}
          handlePressContact={props.handlePressContact}
          contactList={props.contactList}
          handleFilter={handleFilter}
        />
      </View>
    </Modal>
  );
}

export default ContactsModal;
