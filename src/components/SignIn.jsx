// src/components/SignIn.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (user) {
      // User is not authenticated, navigate to the desired route
      navigate("/upload-file");
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      const uid = response.user.uid;
      localStorage.setItem("user", JSON.stringify({ email, uid }));
      setIsLoading(false);
      navigate("/upload-file");
      window.location.reload();
    } catch (error) {
      setError(error.code);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        {/* Move LanguageToggle to the right */}
        <div className="flex-grow"></div>
      </div>
      <div className="mx-auto max-w-lg">
        <LanguageToggle />
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl pt-4">
          {t("getProductive")}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        {error && <p className="text-center text-red-500">{error}</p>}

        <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">{t("signInAcc")}</p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="bg-indigo-200 text-indigo-900 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder={t("enterEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-indigo-200 text-indigo-900 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder={t("enterPassword")}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            {isLoading ? <LoadingOutlined /> : t("signIn")}
          </button>

          <p className="text-center text-sm text-gray-500">
            {t("noAccount")}
            <a className="underline" href="/signup">
              {t("signUp")}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
