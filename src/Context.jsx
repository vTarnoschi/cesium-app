import React, {
  memo,
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  useLayoutEffect,
  useEffect,
} from "react";
import language from "./language";

import { fetchApi } from "./Utils/fetch";
import { createGlobe } from "./Utils/globe";
import { parseTleFile } from "./Utils/functions";
import { createSatellites, removeSatellites } from "./Utils/satellites";

const Context = createContext();

function removeCaracter(lang) {
  return lang.replace("-", "");
}

function fetchSatellite(url, viewer, color) {
  const satellitePoint = [];

  return new Promise((resolve) => {
    fetchApi(url, null, (text) => {
      const stations = parseTleFile(text);

      stations.forEach((station) => {
        const point = createSatellites(station, viewer, color);

        satellitePoint.push(point);
      });
    });
    resolve(satellitePoint);
  });
}

const initialState = {
  language: language.ptBR,
  currentLanguage: "ptBR",
  selectedValues: ["weather"],
  sattelites: {},
  globe: null,
  loading: false,
};

const GlobalContextProvider = memo(({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { viewer, satellitePoint } = createGlobe(state.language);

    setState((prevState) => ({
      ...prevState,
      globe: viewer,
      sattelites: {
        weather: satellitePoint,
      },
    }));
  }, []);

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

  const setValues = (satellitePoint, satellite) => {
    setState((prevState) => ({
      ...prevState,
      selectedValues: [...prevState.selectedValues, satellite.name],
      sattelites: {
        ...prevState.sattelites,
        [satellite.name]: satellitePoint,
      },
      loading: false,
    }));
  };

  const onChangeSatellite = useCallback(
    (url, satellite) => {
      if (satellite.checked) {
        setState(
          (prevState) => ({ ...prevState, loading: true }),
          fetchSatellite(url, state.globe, satellite.color).then(
            (satellitePoint) =>
              setTimeout(() => setValues(satellitePoint, satellite), 3000)
          )
        );
      }

      if (!satellite.checked) {
        removeSatellites(state.sattelites[satellite.name], state.globe);

        let newState = { ...state };
        delete newState.sattelites[satellite.name];

        newState.selectedValues = newState.selectedValues.filter(
          (item) => item !== satellite.name
        );

        setState(newState);
      }
    },
    [state.sattelites, state.globe]
  );

  const providerValues = useMemo(
    () => ({
      state,
      actions: {
        setLanguage,
        onChangeSatellite,
      },
    }),
    [setLanguage, state, onChangeSatellite]
  );

  return <Context.Provider value={providerValues}>{children}</Context.Provider>;
});

const useGlobalContext = () => useContext(Context);

export { useGlobalContext };

export default GlobalContextProvider;
