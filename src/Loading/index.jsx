import React, { memo } from "react";
import { useGlobalContext } from "../Context";

import LoadingWrapper from "./style";

const Loading = memo(() => {
  const {
    state: { language },
  } = useGlobalContext();
  return (
    <LoadingWrapper>
      <div className="content">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <p>{language.loading}...</p>
    </LoadingWrapper>
  );
});

export default Loading;
