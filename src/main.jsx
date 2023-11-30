import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: "Hello",
        dashboard: "Dashboard",
        uploadFile: "Upload File",
        logOut: "logout",
        signUp: "Register",
        signIn: "Sign In",
        zeroFiles: "Zero files available.",
        gridView: "Grid View",
        listView: "List View",
        fileManager: "File Manager",
        selectFile: "Select or drag and drop file",
        dropFile: "Drag & Drop your files here",
        upload: "Upload",
        getStarted: "Get started today",
        getProductive: "Get productive again",
        haveAccount: "Have an Account Already?",
        noAccount: "Don't have an account?",
        enterEmail: "Enter Email",
        enterPassword: "Enter Password",
        signInAcc: "Sign in to your account",
        createAcc: "Create account",
        // Add other English translations here
      },
    },
    he: {
      translation: {
        hello: "שלום",
        dashboard: "לוּחַ מַחווָנִים",
        uploadFile: "העלה קובץ",
        logOut: "להתנתק",
        signUp: "הירשם",
        signIn: "להיכנס",
        zeroFiles: "אפס קבצים זמינים.",
        gridView: "תצוגת רשת",
        listView: "תצוגת רשימה",
        fileManager: "מנהל קבצים",
        selectFile: "בחר או גרור ושחרר קובץ",
        dropFile: "גרור ושחרר את הקבצים שלך כאן",
        upload: "העלה",
        getStarted: "להתחיל היום",
        getProductive: "להיות פרודוקטיבי שוב",
        haveAccount: "יש לך כבר חשבון?",
        noAccount: "אין לך חשבון?",
        enterEmail: "הזן אימייל",
        enterPassword: "הזן את הסיסמה",
        signInAcc: "תתחבר לחשבון שלך",
        createAcc: "צור חשבון",
        // Add other Hebrew translations here
      },
    },
  },
  lng: "en", // Default language is English
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
