import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("selectedLanguage") || i18n.language
  );

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "he" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  useEffect(() => {
    // Update the language when the component mounts
    i18n.changeLanguage(currentLanguage);
    // Set text direction based on the selected language
    document.documentElement.dir = currentLanguage === "he" ? "rtl" : "ltr";
  }, [currentLanguage, i18n]);

  return (
    <div>
      <button onClick={toggleLanguage}>
        {currentLanguage === "en" ? "🇮🇱 עברית" : "🇺🇸 English"}
      </button>
    </div>
  );
};

export default LanguageToggle;
