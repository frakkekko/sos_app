import React, { useEffect, useRef, useState } from "react";
import { View, Text, Alert, Image, TouchableOpacity } from "react-native";

// Components
import CustomButton from "../../components/functionalComponents/CustomButton/CustomButton";

// Style
import styles from "../../commonStyles";
import mapStyles from "./mapStyles";

// Translations
import i18n from "../../assets/translations/i18n";

// Location
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

// Local Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// SMS
import * as SMS from "expo-sms";

// Blur Effect
import { BlurView } from "expo-blur";
import BlurStatusBar from "../../components/functionalComponents/blurStatusBar/BlurStatusBar";

// Linking
import moment from "moment/moment";

// Images
import compassImage from "../../assets/images/compass.png";

function Map(props) {
  const locationRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      locationRef.current = location;
      // console.log(location);

      if (props.route.params.activateSosRoutine) {
        handleSosRoutine();
      }

      setLocation(location);
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  function goBack() {
    props.navigation.goBack();
  }

  async function handleSosRoutine() {
    try {
      const storedContactsRaw = await AsyncStorage.getItem("contacts");
      // console.log("STORED CONTACTS RAW:", storedContactsRaw);
      const storedContacts = JSON.parse(storedContactsRaw);

      if (!storedContacts || storedContacts?.length === 0) {
        console.log("No contacts Found");

        Alert.alert(
          i18n.t("translations.alert.noContactsFound.title"),
          i18n.t("translations.alert.noContactsFound.subTitle")
        );
        return;
      }
      console.log("Sos Routine activated");

      sendSosMsg(storedContacts);
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  async function sendSosMsg(storedContacts) {
    try {
      console.log(storedContacts);
      const extractedNumbers = storedContacts.map((contact) => {
        return contact.phoneNumbers[0].number;
      });

      const googleMapUrl = `https://www.google.com/maps?q=${locationRef.current.coords.latitude},${locationRef.current.coords.longitude}`;
      const msg = `${i18n.t("translations.sosMessage.messageStart")}\n${i18n.t(
        "translations.sosMessage.latitude"
      )} -> ${locationRef.current.coords.latitude},\n${i18n.t(
        "translations.sosMessage.longitude"
      )} -> ${locationRef.current.coords.longitude}.\n\n${i18n.t(
        "translations.sosMessage.googleMapUrl"
      )}\n${googleMapUrl}\n${i18n.t("translations.sosMessage.messageEnd")}\n`;

      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          i18n.t("translations.alert.messageApplication.title"),
          i18n.t("translations.alert.messageApplication.subTitle")
        );

        return;
      }

      const currentDate = moment().format("DD/MM/YYYY h:mm:ss a");
      const { result } = await SMS.sendSMSAsync(
        extractedNumbers,
        msg + currentDate
      );
      console.log(result);
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  function handleRegion() {
    setRegion(null);
  }

  function setRegionToPosition() {
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    });
  }

  return (
    <View style={[styles.container, styles.center]}>
      {!location && !errorMsg && <Text style={styles.text}>Loading...</Text>}
      {errorMsg && <Text style={styles.text}>{errorMsg}</Text>}
      {location && (
        <>
          <BlurStatusBar />

          <MapView
            style={mapStyles.mapView}
            onRegionChangeComplete={handleRegion}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
            region={region}
          >
            <Marker
              title={i18n.t("translations.map.labelMarker.title")}
              description={i18n.t("translations.map.labelMarker.subTitle")}
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>

          <BlurView intensity={60} tint="dark" style={mapStyles.bottomBlur}>
            <View style={[styles.center, mapStyles.viewButtonsContainer]}>
              <CustomButton label={"Home"} sos={false} handleTap={goBack} />
            </View>
            <View style={[styles.center, mapStyles.viewButtonsContainer]}>
              <CustomButton
                label={"SOS"}
                sos={true}
                handleTap={handleSosRoutine}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                overflow: "hidden",
                borderRadius: 10,
                position: "absolute",
                top: -80,
                right: 20,
                zIndex: 20,
              }}
            >
              <BlurView
                intensity={30}
                tint="dark"
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={setRegionToPosition}>
                  <Image
                    source={compassImage}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>
              </BlurView>
            </View>
          </BlurView>
        </>
      )}
    </View>
  );
}

export default Map;
