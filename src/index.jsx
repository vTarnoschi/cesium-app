import React from "react";
import ReactDom from "react-dom";

import App from "./App";
import GlobalContextProvider from "./Context";

ReactDom.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
  document.getElementById("root")
);
