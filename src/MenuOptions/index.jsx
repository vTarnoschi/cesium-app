import React, { memo } from "react";

import { useGlobalContext } from "../Context";

import dataOptions from "./data";
import MenuOptionsWrapper from "./style";

const MenuOptions = memo(() => {
  const {
    state: { language },
  } = useGlobalContext();

  return (
    <MenuOptionsWrapper>
      <div>{language.legend}</div>
      <div className="menu-options">
        {dataOptions(language.optionsLanguage).map((item) => (
          <div key={item.key} className="menu-item">
            <input type="checkbox" name={item.dataIndex} value={item.url} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </MenuOptionsWrapper>
  );
});

export default MenuOptions;
