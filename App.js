import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Style
import styles from "./commonStyles";
import { DarkTheme } from "@react-navigation/native";

// Screens
import Home from "./screens/home/Home";
import Map from "./screens/map/Map";
import ContactsScreen from "./screens/contacts/ContactsScreen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Translations
import i18n from "./assets/translations/i18n";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: "#000" }]}>
        <StatusBar style="auto" />
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="ContactsScreen"
              component={ContactsScreen}
              options={{
                title: i18n.t("translations.screenHeaders.emergencyContacts"),
              }}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
