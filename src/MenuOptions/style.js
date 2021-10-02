import styled from "styled-components";

import { configPopup } from "../Utils/mixins";

const MenuOptionsWrapper = styled.div`
  width: 200px;
  top: 15%;
  left: 10px;
  color: #fff;
  padding: 10px;
  ${configPopup}

  .menu-options {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }
  .menu-item {
    display: flex;
    align-items: center;

    color: #fff;

    input + span {
      margin-left: 5px;
    }
  }
`;

export default MenuOptionsWrapper;
