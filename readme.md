# Sos App Introduction

Sos App is a simple application that allows you to send sos messages to all your emergency contacts. The user selects up to 5 emergency contacts to whom Sos messages will be sent. This message will have as text the coordinates of the user's position making the Sos request and a link to the google map with the user's position. It is also possible to view your position on the map.

## Screens

### Home

The home screen has a sos button which, when you tap it, immediately brings you in the map screen and activates the sos routine. From the home screen it is possible to access the contacts screen and the map screen. Furthermore, the tutorial modal (TutorialModal) is managed on the home screen

### Contacts

The screen contacts implements the management logic of:

- Emergency contacts (ContactsList)
- Add contact modal (ContactsModal)
- Filtering contacts rendered in modal
- Added emergency contact in local storage
- Deleting emergency contact from local storage
- Check the validity of the number of the contact you are adding

### Map

In the map screen it is managed:

- Geolocation and rendering of the map with the marker in the user's position
- Sos routine
- Send SMS to contacts stored in local storage

## Components

### BlurStatusBar

BlurStatusBar is a component that inserts the blur effect under the status bar. This component uses the useSafeAreaInsets hook imported from react-native-safe-area-context to ensure perfect adaptability to any device.

### ContactItem

The ContactItem component has the following props:

- item: element that must show
- handleDelete: callback that is activated when you tap the delete button
- handlePressContact: callback that is activated when a contact is tapped (first a series of checks are made)
- isSwipeable: to indicate if it should be swipeable (this prop is set only to manage element deletion)

### ContactList

The ContactList component renders the list of emergency contacts which are stored in local storage. It has the following properties:

- storedContacts: the contacts to be rendered in the FlashList
- handleDelete: callback that is activated to manage the deletion of a contact from local storage

### ContactsModal

The ContactsModal component manages a modal which, when displayed, lists all the contacts that are located on the device. Those contacts are passed from the contactList prop. The complete list of props is as follows:

- closeModal: callback that manages the closure of the modal
- handlePressContact: callback that manages the tap on a contact
- showContactsModal: callback to manage the visibility of the modal
- contactList: contact list to be rendered
- handleFilter: callback to manage filtering of rendered data

### DeviceContactList

The DeviceContactList component manages the list of emergency contacts located on the device. It has the following props:

- handlePressContact callback to handle user tap on a contact
- handlePressClose callback to manage closure on user tap
- handleFilter: callback to manage the filter
- contactList: list of contacts (located on the device) to be rendered

### TutorialModal

The TutorialModal component manages the modal that is opened when the application is first started. It has two props:

- showTutorial: boolean that manages the visibility of the modal
- handleTutorialDone: callback that manages the end of the tutorial

### CustomButton

The CustomButton component is a custom button that renders a default button or a sos-style button. The props are the following:

- sos: boolean to specify the style of the button
- handleTap: callback to manage the tap on the button

## Project Structure

- `src/`: contains the source code of the application
  - `components`: contains reusable components
    - `functionalComponents`: contains all functional components
    - `classComponents`: containes all class components
  - `screens/`: contains all the screens of the app
  - `assets/`: contains the assets of the application
    - `images/`: contains the images
    - `translations`: contains all translations json and the setup configuration
    - `lottie-animations`: contains all lottie animations json

## Project Dependencies

- @react-native-async-storage/async-storage
- @react-navigation/bottom-tabs
- @react-navigation/native
- @react-navigation/native-stack
- @shopify/flash-list
- expo
- expo-blur
- expo-contacts
- expo-linking
- expo-localization
- expo-location
- expo-sms
- expo-status-bar
- google-libphonenumber
- i18n-js
- lodash
- lottie-react-native
- moment
- react
- react-native
- react-native-gesture-handler
- react-native-maps
- react-native-onboarding-swiper
- react-native-reanimated
- react-native-safe-area-context
- react-native-screens

## Configuration

1. Install nodejs
2. Install expo by running `npm install -g expo-cli`

## installation and launch

1. Run `npm install` to install the project dependencies.
2. Run `npx expo start` to launch

## Important Note

Number validation for Android was handled differently. On ios the contact list that is given, for each number, also contains the country code that is used to instantiate a number with the google-libphonenumber library and proceed with validation. Android returns contact whose numbers don't have the country code property, this turned out to be a problem to instantiate the number with google-libphonenumber. To solve this problem, on Android, the number that is instantiated has the language code of the user's device as its country code. This management on Android could be problematic for those users who have contacts whose numbers belong to a country that has a different language from the one set on the device
