export function handleFirebaseError(code) {
  let fbError = "";
  let selectedLanguage = localStorage.getItem("selectedLanguage");
  selectedLanguage = selectedLanguage || "en";

  switch (code) {
    case "auth/user-not-found":
      fbError =
        selectedLanguage === "en"
          ? "User not found. Please check your email."
          : "המשתמש לא נמצא. אנא בדוק את האימייל שלך.";
      break;
    case "auth/wrong-password":
      fbError =
        selectedLanguage === "en"
          ? "Invalid password. Please try again."
          : "סיסמה שגויה. בבקשה נסה שוב.";
      break;
    case "auth/invalid-credential":
      fbError =
        selectedLanguage === "en"
          ? "Check your Credentials"
          : "בדוק את האישורים שלך";
      break;
    case "auth/email-already-in-use":
      fbError =
        selectedLanguage === "en"
          ? "User is already registered"
          : "המשתמש כבר רשום";
      break;
    case "auth/too-many-requests":
      fbError =
        selectedLanguage === "en"
          ? "Too many attempts, try again later"
          : "יותר מדי ניסיונות, נסה שוב מאוחר יותר";
      break;
    default:
      fbError = code;
  }

  return fbError;
}
