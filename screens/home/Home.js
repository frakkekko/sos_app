import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

// Style
import styles from "../../commonStyles";
import homeStyles from "./homeStyles";

// Translations
import i18n from "../../assets/translations/i18n";

// Components
import CustomButton from "../../components/functionalComponents/CustomButton/CustomButton";
import TutorialModal from "../../components/functionalComponents/tutorialModal/TutorialModal";

// Lottie
import AnimatedLottieView from "lottie-react-native";
import sosAnimation from "../../assets/lottie-animations/sos-animation.json";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home(props) {
  let [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    //clearStorage();
    checkTutorial();
  }, []);

  async function checkTutorial() {
    try {
      const tutorialDone = await AsyncStorage.getItem("tutorial");

      console.log(tutorialDone);
      if (tutorialDone) return;

      setShowTutorial(true);
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  async function handleTutorialDone() {
    try {
      const resp = await AsyncStorage.setItem("tutorial", "true");
      console.log(resp);

      setShowTutorial(false);
    } catch (err) {
      Alert.alert(i18n.t("translations.alert.generalAlert"));
      console.log(err);
    }
  }

  function goToContacts() {
    props.navigation.navigate("ContactsScreen");
  }

  function goToMap() {
    props.navigation.navigate("Map", { activateSosRoutine: false });
  }

  async function clearStorage() {
    await AsyncStorage.removeItem("contacts");
    await AsyncStorage.removeItem("tutorial");
  }

  async function handleSosTap() {
    // console.log("STORED CONTACTS: ", storedContacts);
    props.navigation.navigate("Map", { activateSosRoutine: true });
  }

  return (
    <View style={[styles.container, homeStyles.mainView]}>
      <TutorialModal
        showTutorial={showTutorial}
        handleTutorialDone={handleTutorialDone}
      />
      <View>
        <Text style={homeStyles.headerText}> Sos App</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleSosTap}
          style={homeStyles.sosAnimationWrapper}
        >
          <AnimatedLottieView
            autoPlay
            duration={2000}
            style={homeStyles.animation}
            source={sosAnimation}
          />
        </TouchableOpacity>
      </View>

      <View style={homeStyles.buttonContainer}>
        <View style={[styles.center, homeStyles.goToContactsButton]}>
          <CustomButton
            handleTap={goToContacts}
            label={i18n.t("translations.buttons.contacts")}
            sos={false}
          />
        </View>
        <View style={[styles.center, homeStyles.goToMapButton]}>
          <CustomButton
            handleTap={goToMap}
            label={i18n.t("translations.buttons.goToMap")}
            sos={false}
          />
        </View>
      </View>
    </View>
  );
}

export default Home;
