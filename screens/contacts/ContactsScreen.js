import React, { useEffect, useRef, useState } from "react";
import { View, Alert, Platform, Text } from "react-native";

// Style
import styles from "../../commonStyles";
import contactsScreenStyles from "./contactsScreenStyles";

// Components
import CustomButton from "../../components/functionalComponents/CustomButton/CustomButton";
import ContactsList from "../../components/functionalComponents/contactsList/ContactsList";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Contacts
import * as Contacts from "expo-contacts";
import googleLibPhoneNumber from "google-libphonenumber";

// Localization
import { getLocales } from "expo-localization";

// Lodash
import _ from "lodash";

// Components
import ContactsModal from "../../components/functionalComponents/contactsModal/ContactsModal";

// Translation
import i18n from "../../assets/translations/i18n";

function ContactsScreen() {
  let storedContactsRef = useRef(null);
  let contactsRef = useRef(null);

  let [showContactsModal, setShowContactsModal] = useState(false);
  let [contactList, setContactList] = useState(null);
  let [storedContactList, setStoredContactsList] = useState(null);

  useEffect(() => {
    getLocalStorage();
  }, []);

  // useEffect(() => {
  //   console.log("ref:", storedContactsRef.current);
  // });

  async function getContacts() {
    try {
      const contactsPermission = await Contacts.requestPermissionsAsync();

      if (contactsPermission.status !== "granted") {
        Alert.alert(
          i18n.t("translations.alert.contactsPermission.title"),
          i18n.t("translations.alert.contactsPermission.subTitle")
        );
        return;
      }

      const { data } = await Contacts.getContactsAsync({ sort: "firstName" });
      // console.log(data);

      contactsRef.current = _.cloneDeep(data);
      setContactList(_.cloneDeep(data));

      openModal();
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  async function getLocalStorage() {
    try {
      let localData = await AsyncStorage.getItem("contacts");

      // console.log(storedContactsRef.current);
      // console.log(storedContactsRef.current);
      if (!localData) {
        storedContactsRef.current = [];
      } else {
        storedContactsRef.current = JSON.parse(localData);
      }
      // console.log("PROVA", storedContactsRef.current);
      setStoredContactsList(_.cloneDeep(storedContactsRef.current));
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  async function handleDelete(item) {
    try {
      const update = storedContactsRef.current.filter(
        (contact) => contact.phoneNumbers[0].id !== item.phoneNumbers[0].id
      );
      storedContactsRef.current = _.cloneDeep(update);

      await AsyncStorage.setItem(
        "contacts",
        JSON.stringify(storedContactsRef.current)
      );

      setStoredContactsList(_.cloneDeep(storedContactsRef.current));
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  function openModal() {
    setShowContactsModal(true);
  }

  function closeModal() {
    setShowContactsModal(false);
  }

  async function handlePressContact(item) {
    try {
      if (storedContactsRef.current.length === 5) {
        console.log("full");

        Alert.alert(
          i18n.t("translations.alert.listFull.title"),
          i18n.t("translations.alert.listFull.subTitle")
        );

        return;
      }

      const isAlreadyPresent = storedContactsRef.current.find((contact) => {
        return contact.phoneNumbers[0].id === item.phoneNumbers[0].id;
      });

      console.log("IS ALREADY PRESENT: ", isAlreadyPresent);

      if (isAlreadyPresent) {
        console.log("is already present");
        Alert.alert(
          i18n.t("translations.alert.alreadyPresent.title"),
          i18n.t("translations.alert.alreadyPresent.subTitle")
        );
        return;
      }

      let isValidNumber = null;
      const phoneUtil = googleLibPhoneNumber.PhoneNumberUtil.getInstance();

      if (Platform.OS === "ios") {
        console.log(item); // ERRORE: ANDROID NON RITORNA IL COUNTRY CODE
        const number = phoneUtil.parseAndKeepRawInput(
          item.phoneNumbers[0].number,
          item.phoneNumbers[0].countryCode.toUpperCase()
        );

        isValidNumber = phoneUtil.isValidNumberForRegion(
          number,
          item.phoneNumbers[0].countryCode.toUpperCase()
        );
      } else {
        const countryCode = getLocales()[0].languageCode.toUpperCase();
        console.log(countryCode);
        const number = phoneUtil.parseAndKeepRawInput(
          item.phoneNumbers[0].number,
          countryCode
        );

        isValidNumber = phoneUtil.isValidNumberForRegion(number, countryCode);
      }

      if (!isValidNumber) {
        console.log("Number is not valid");
        Alert.alert(
          i18n.t("translations.alert.invalidNumber.title"),
          i18n.t("translations.alert.invalidNumber.subTitle")
        );
        return;
      }

      storedContactsRef.current.push(_.cloneDeep(item));

      await AsyncStorage.setItem(
        "contacts",
        JSON.stringify(storedContactsRef.current)
      );

      setStoredContactsList(_.cloneDeep(storedContactsRef.current));
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  function handleFilter(str) {
    // console.log("str: ", str);
    // console.log(contactsRef.current);
    const filteredList = contactsRef.current.filter((contact) =>
      contact.name.toLowerCase().includes(str.toLowerCase())
    );

    setContactList(_.cloneDeep(filteredList));
  }

  return (
    <View style={[styles.container, contactsScreenStyles.mainView]}>
      {(!storedContactList || storedContactList.length === 0) && (
        <Text style={{ color: "#aaa", fontSize: 22, textAlign: "center" }}>
          {i18n.t("translations.contactsScreen.noContact")}
        </Text>
      )}
      <ContactsList
        storedContactList={storedContactList}
        handleDelete={handleDelete}
      />

      <ContactsModal
        showContactsModal={showContactsModal}
        closeModal={closeModal}
        handlePressContact={handlePressContact}
        contactList={contactList}
        handleFilter={handleFilter}
      />
      <View style={contactsScreenStyles.buttonContainer}>
        <View style={contactsScreenStyles.buttonWrapper}>
          <CustomButton
            handleTap={getContacts}
            label={i18n.t("translations.buttons.addContact")}
            sos={false}
          />
        </View>
      </View>
    </View>
  );
}

export default ContactsScreen;
