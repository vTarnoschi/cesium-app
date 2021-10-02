import React, { memo, useCallback, useState } from "react";

import { urlConfigs } from "../Utils/urlsConfig";

import { useGlobalContext } from "../Context";

import colors from "./colors";

import MenuOptionsWrapper from "./style";

function validColor(color) {
  return {
    background: colors[color],
  };
}

const initialState = {
  minimize: true,
};

const MenuOptions = memo(() => {
  const [state, setState] = useState(initialState);
  const {
    state: { language, selectedValues },
    actions: { onChangeSatellite },
  } = useGlobalContext();

  const onMinimize = useCallback(() => {
    setState((prevState) => ({ ...prevState, minimize: !prevState.minimize }));
  }, []);

  const handleOnChange = useCallback(
    (color) => (evt) => {
      const { name, value, checked } = evt.target;

      const satellite = {
        name,
        color,
        checked,
      };

      onChangeSatellite(value, satellite);
    },
    [onChangeSatellite]
  );

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
          {urlConfigs(language.optionsLanguage).map((item) => (
            <div key={item.key} className="menu-item">
              <input
                type="checkbox"
                name={item.dataIndex}
                value={item.url}
                onChange={handleOnChange(item.color)}
                checked={selectedValues.includes(item.dataIndex)}
              />
              <span>{item.name}</span>
              <div className="legend" style={validColor(item.color)}></div>
            </div>
          ))}
        </div>
      )}
    </MenuOptionsWrapper>
  );
});

export default MenuOptions;
