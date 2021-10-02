import styled from "styled-components";

import { configPopup } from "../mixins";

const SelectLanguagesWrapper = styled.div`
  ${configPopup};
  top: 10px;
  right: 10px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  .menu {
    width: 0;
    visibility: hidden;
    position: relative;

    img {
      cursor: pointer;
    }

    img + img {
      margin-left: 5px;
    }

    .select-message {
      visibility: hidden;
      position: absolute;
      bottom: -20px;
      color: #fff;
      font-size: 12px;
      width: ${(props) => (props.lang === "ptBR" ? "102px" : "85px")};
      right: 0px;
    }
  }

  :hover {
    .language {
      display: none;
    }
    .menu {
      width: auto;
      visibility: visible;
      .select-message {
        visibility: visible;
      }
    }
  }
`;

export default SelectLanguagesWrapper;
