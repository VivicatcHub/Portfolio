import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";

export const SUPPORTED_LANGUAGES = ["en", "fr", "ja"];
const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "i18nextLng";

const URL_PARAM = "l";

const ALIASES = {
  jp: "ja",
  jpn: "ja",
  english: "en",
  french: "fr",
  francais: "fr",
  japanese: "ja",
};

const normalizeLanguage = (value) => {
  if (!value) return null;
  const lower = value.toLowerCase();
  const mapped = ALIASES[lower] || lower.split("-")[0];
  return SUPPORTED_LANGUAGES.includes(mapped) ? mapped : null;
};

const readStoredLanguage = () => {
  try {
    return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

const writeStoredLanguage = (language) => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {}
};

const stripLanguageParam = () => {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has(URL_PARAM)) {
      url.searchParams.delete(URL_PARAM);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  } catch {}
};

const getInitialLanguage = () => {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = normalizeLanguage(params.get(URL_PARAM));
  if (fromUrl) return fromUrl;

  return readStoredLanguage() || DEFAULT_LANGUAGE;
};

export const setAppLanguage = (language) => {
  const normalized = normalizeLanguage(language) || DEFAULT_LANGUAGE;
  writeStoredLanguage(normalized);
  stripLanguageParam();
  return i18n.changeLanguage(normalized);
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    backend: {
      loadPath: "/locales/{{lng}}/data.json",
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
