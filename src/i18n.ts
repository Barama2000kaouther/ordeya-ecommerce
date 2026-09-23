import translation from "i18next";
import { initReactI18next }
    from "react-i18next";
import fr from "./locales/fr";
import ar from "./locales/ar";
import en from "./locales/en";
translation
    .use(initReactI18next)
    .init({
        resources: { fr, ar, en, },
        lng: "fr",
        fallbackLng: "fr",
        interpolation: { escapeValue: false, },
    });
export default translation;