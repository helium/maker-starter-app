import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import { useCallback, useEffect, useState } from "react";
import { getSecureItem, setSecureItem } from "utils/secureAccount";
import en from "./en";

const locales = RNLocalize.getLocales();

const numberFormatSettings = RNLocalize.getNumberFormatSettings();
export const groupSeparator = numberFormatSettings.groupingSeparator;
export const { decimalSeparator } = numberFormatSettings;
export const [currencyType] = RNLocalize.getCurrencies() || ["USD"];
export const usesMetricSystem = RNLocalize.usesMetricSystem();

let phoneLang = "en";
let phoneLocale = "en-US";
if (Array.isArray(locales)) {
  phoneLang = locales[0].languageCode;
  phoneLocale = locales[0].languageTag;
}

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: { translation: en },
  },
  lng: phoneLang,
  fallbackLng: ["en"],
});

export const locale = phoneLocale;

export const useLanguage = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    initLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = useCallback((lang: string) => {
    setLanguage(lang);
    setSecureItem("language", lang);
    i18n.changeLanguage(lang);
  }, []);

  const initLanguage = useCallback(async () => {
    const lang = await getSecureItem("language");
    if (lang) {
      changeLanguage(lang);
    }
    setLanguage(lang || phoneLang);
  }, [changeLanguage]);

  return { language, changeLanguage };
};

export default i18n;
