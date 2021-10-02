import React, {
  memo,
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  useLayoutEffect,
} from "react";
import language from "./language";

const Context = createContext();

function removeCaracter(lang) {
  return lang.replace("-", "");
}

const initialState = {
  language: language.ptBR,
  currentLanguage: "ptBR",
};

const GlobalContextProvider = memo(({ children }) => {
  const [state, setState] = useState(initialState);

  const setLanguage = useCallback((lang) => {
    setState((prevState) => ({
      ...prevState,
      language: language[lang],
      currentLanguage: lang,
    }));
  }, []);

  useLayoutEffect(() => {
    const langNavigator = removeCaracter(navigator.language);
    let lang = "";

    if (langNavigator === "ptBR") {
      lang = langNavigator;
    } else {
      lang = "enUS";
    }
    setLanguage(lang);
  }, [setLanguage]);

  const providerValues = useMemo(
    () => ({
      state,
      actions: {
        setLanguage,
      },
    }),
    [setLanguage, state]
  );

  return <Context.Provider value={providerValues}>{children}</Context.Provider>;
});

const useGlobalContext = () => useContext(Context);

export { useGlobalContext };

export default GlobalContextProvider;
