import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

import en from "./en";
import pt from "./pt";

// Mapeia os códigos de idioma para os objetos de tradução correspondentes
const translations = {
  "en-US": en,
  "pt-BR": pt,
};

// Cria o contexto com um valor padrão (será sobrescrito pelo Provider)
export const LanguageContext = createContext({
  language: "en-US",
  toggleLanguage: () => {},
});

// Componente provedor de idioma
export function LanguageProvider({ children }) {
  // Estado do idioma, inicializando do localStorage ou padrão 'en-US'
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("language");
    return savedLang || "en-US"; // padrão inglês se não houver preferência salva
  });

  // Atualiza localStorage e <html lang> sempre que o idioma mudar
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language; // ajusta a tag <html lang="...">
  }, [language]);

  // Função de alternância entre en-US e pt-BR (envolta em useCallback para memorizar)
  const toggleLanguage = useCallback(() => {
    setLanguage((curr) => (curr === "en-US" ? "pt-BR" : "en-US"));
  }, []);

  // Valor do contexto memoizado para evitar recriação desnecessária em re-renders
  const contextValue = useMemo(
    () => ({
      language,
      toggleLanguage,
    }),
    [language, toggleLanguage],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}
