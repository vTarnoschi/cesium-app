import React, { memo, useEffect } from "react";

import GlobalWrapper from "./style";
import { createGlobe } from "./globe";
import MenuOptions from "./MenuOptions";
import SelectLanguages from "./SelectLanguages";

const App = memo(() => {
  useEffect(() => {
    createGlobe();
  }, []);

  return (
    <GlobalWrapper>
      <MenuOptions />
      <SelectLanguages />
      <div id="cesiumContainer" />
    </GlobalWrapper>
  );
});

export default App;
