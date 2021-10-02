import React, { memo, useEffect } from "react";

import { createGlobe } from "./globe";

const App = memo(() => {
  useEffect(() => {
    createGlobe();
  }, []);

  return (
    <React.Fragment>
      <div id="cesiumContainer" />
    </React.Fragment>
  );
});

export default App;
