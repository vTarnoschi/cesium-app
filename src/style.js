import styled from "styled-components";

const GlobalWrapper = styled.div`
  height: 100%;
  position: relative;

  #loading {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.8;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s, visibility 0.5s;
    visibility: visible;
  }

  .disappear {
    opacity: 0 !important;
    visibility: hidden !important;
  }
`;

export default GlobalWrapper;
