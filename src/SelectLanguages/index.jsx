import React, { memo, useCallback } from "react";

import SelectLanguagesWrapper from "./style";

import brazil from "./img/brazil.png";
import eua from "./img/united-states.png";
import { useGlobalContext } from "../Context";

const SelectLanguages = memo(() => {
  const {
    state: { currentLanguage, language },
    actions: { setLanguage },
  } = useGlobalContext();

  const setLang = useCallback(
    (item) => {
      setLanguage(item);
    },
    [setLanguage]
  );

  const imgs = () => ({
    ptBR: <img src={brazil} onClick={() => setLang("ptBR")} />,
    enUS: <img src={eua} onClick={() => setLang("enUS")} />,
  });
  return (
    <SelectLanguagesWrapper lang={currentLanguage}>
      <div className="language">{imgs()[currentLanguage]}</div>
      <div className="menu">
        {imgs().ptBR}
        {imgs().enUS}
        <div className="select-message">{language.languages}</div>
      </div>
    </SelectLanguagesWrapper>
  );
});

export default SelectLanguages;
