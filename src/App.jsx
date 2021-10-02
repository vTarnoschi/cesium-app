import React, { memo } from "react";

import GlobalWrapper from "./style";

import Loading from "./Loading";
import MenuOptions from "./MenuOptions";
import { useGlobalContext } from "./Context";
import SelectLanguages from "./SelectLanguages";

const App = memo(() => {
  const {
    state: { loading },
  } = useGlobalContext();
  return (
    <GlobalWrapper>
      <MenuOptions />
      <SelectLanguages />
      {loading && <Loading />}
      <div id="cesiumContainer"></div>
    </GlobalWrapper>
  );
});

export default App;
