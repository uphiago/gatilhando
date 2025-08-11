import { useCallback, useContext, useMemo } from "react";

import { LanguageContext } from "./LanguageContext";
import en from "./en";
import pt from "./pt";

const dicts = { "en-US": en, "pt-BR": pt };

function deepGet(obj, path) {
  return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);
}

export function useTranslation() {
  const { language } = useContext(LanguageContext);
  const dict = useMemo(() => dicts[language] || en, [language]);

  const t = useCallback(
    (key, vars) => {
      let val = deepGet(dict, key);
      if (val == null) val = deepGet(en, key); // fallback pro inglês
      if (val == null) return key;
      if (vars && typeof val === "string") {
        return val.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
      }
      return val;
    },
    [dict],
  );

  return { t };
}
