import React, { useRef } from "react";
import { Image, Modal } from "react-native";

// Images
import welcomeImage from "../../../assets/images/welcome.png";
import sosImage from "../../../assets/images/sos.png";
import mapImage from "../../../assets/images/map.png";
import contactsImage from "../../../assets/images/contacts.png";

// Tutorial slider
import Onboarding from "react-native-onboarding-swiper";

// Translation
import i18n from "../../../assets/translations/i18n";

function TutorialModal(props) {
  let onBoardingRef = useRef(null);
  let indexPageRef = useRef(null);

  const tutorialSlides = [
    {
      backgroundColor: "#222",
      title: i18n.t("translations.tutorial.welcomeSlide.title"),
      subtitle: i18n.t("translations.tutorial.welcomeSlide.subTitle"),
      image: (
        <Image source={welcomeImage} style={{ width: 300, height: 300 }} />
      ),
    },
    {
      backgroundColor: "#222",
      title: i18n.t("translations.tutorial.contactsSlide.title"),
      subtitle: i18n.t("translations.tutorial.contactsSlide.subTitle"),
      image: (
        <Image source={contactsImage} style={{ width: 300, height: 300 }} />
      ),
    },
    {
      backgroundColor: "#222",
      title: i18n.t("translations.tutorial.sosSlide.title"),
      subtitle: i18n.t("translations.tutorial.sosSlide.subTitle"),
      image: <Image source={sosImage} style={{ width: 300, height: 300 }} />,
    },
    {
      backgroundColor: "#222",
      title: i18n.t("translations.tutorial.mapSlide.title"),
      subtitle: i18n.t("translations.tutorial.mapSlide.subTitle"),
      image: <Image source={mapImage} style={{ width: 300, height: 300 }} />,
    },
  ];

  function handleButtons(pageIndex) {
    console.log("Page Index:", pageIndex);
    indexPageRef.current = pageIndex;

    if (pageIndex === 0 || null) {
      onBoardingRef.current.props.showSkip = false;
    } else {
      onBoardingRef.current.props.showSkip = true;
    }
  }

  function goToPreviousPage() {
    indexPageRef.current = indexPageRef.current - 1;
    onBoardingRef.current.goToPage(indexPageRef.current, true);
  }

  return (
    <Modal visible={props.showTutorial} animationType="slide">
      <Onboarding
        ref={onBoardingRef}
        onDone={props.handleTutorialDone}
        pages={tutorialSlides}
        nextLabel={i18n.t("translations.tutorial.buttonsSlide.next")}
        showSkip={false}
        skipLabel={i18n.t("translations.tutorial.buttonsSlide.back")}
        pageIndexCallback={handleButtons}
        onSkip={goToPreviousPage}
      />
    </Modal>
  );
}

export default TutorialModal;
