import styled from "styled-components";

import { configPopup } from "../Utils/mixins";

const MenuOptionsWrapper = styled.div`
  width: 200px;
  top: 15%;
  left: 10px;
  color: #fff;
  padding: 10px;
  ${configPopup}

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .minimize {
      font-size: 40px;
      font-weight: 600;
      line-height: 12px;
      cursor: pointer;
    }
  }

  .menu-options {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .menu-item {
      display: flex;
      align-items: center;

      color: #fff;

      input + span {
        margin-left: 5px;
      }

      .legend {
        margin-left: 5px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
      }
    }
  }
`;

export default MenuOptionsWrapper;
