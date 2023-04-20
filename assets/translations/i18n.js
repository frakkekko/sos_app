import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// Languages
import english from "./en.json";
import italian from "./it.json";

const i18n = new I18n(
  {
    en: english,
    it: italian,
  },
  { enableFallback: true }
);

i18n.locale = getLocales()[0].languageCode;

export default i18n;
