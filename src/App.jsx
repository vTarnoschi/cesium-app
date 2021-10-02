import React, { memo } from "react";

import GlobalWrapper from "./style";
import MenuOptions from "./MenuOptions";
import SelectLanguages from "./SelectLanguages";

const App = memo(() => (
  <GlobalWrapper>
    <MenuOptions />
    <SelectLanguages />
    <div id="cesiumContainer" />
  </GlobalWrapper>
));

export default App;
