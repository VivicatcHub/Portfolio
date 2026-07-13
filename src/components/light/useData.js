import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useData = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const lang = (i18n?.language || "en").split("-")[0];
    let active = true;
    fetch(`/locales/${lang}/data.json`)
      .then((res) => res.json())
      .then((json) => active && setData(json.data || {}))
      .catch(() => active && setData({}));
    return () => {
      active = false;
    };
  }, [i18n?.language]);

  return data;
};

export default useData;
