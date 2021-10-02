import React, { memo, useEffect } from "react";

import GlobalWrapper from "./style";
import MenuOptions from "./MenuOptions";
import SelectLanguages from "./SelectLanguages";
import { createGlobe } from "./Utils/globe";

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
