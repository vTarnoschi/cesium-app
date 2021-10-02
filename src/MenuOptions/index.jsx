import React, { memo, useCallback, useState } from "react";

import { useGlobalContext } from "../Context";

import dataOptions from "./data";
import MenuOptionsWrapper from "./style";

const initialState = {
  minimize: true,
};

const MenuOptions = memo(() => {
  const [state, setState] = useState(initialState);
  const {
    state: { language },
  } = useGlobalContext();

  const onMinimize = useCallback(() => {
    setState((prevState) => ({ ...prevState, minimize: !prevState.minimize }));
  }, []);

  return (
    <MenuOptionsWrapper>
      <div className="title">
        {language.legend}
        <span className="minimize" onClick={onMinimize}>
          -
        </span>
      </div>
      {state.minimize && (
        <div className="menu-options">
          {dataOptions(language.optionsLanguage).map((item) => (
            <div key={item.key} className="menu-item">
              <input type="checkbox" name={item.dataIndex} value={item.url} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </MenuOptionsWrapper>
  );
});

export default MenuOptions;
