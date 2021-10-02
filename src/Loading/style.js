import styled from "styled-components";

const LoadingWrapper = styled.div`
  z-index: 8;
  background-color: rgba(255, 255, 255, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .content {
    width: 130px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .circle {
      width: 32px;
      height: 32px;
      background: radial-gradient(
        black,
        rgba(255, 255, 255, 0.8) 30%,
        rgba(255, 255, 255, 0) 60%
      );
      border-radius: 50%;
      animation: 1s bounce infinite;
      animation-delay: 0.15;
    }

    .circle:first-of-type {
      animation-delay: 0.15s;
    }

    .circle:last-of-type {
      animation-delay: -0.15s;
    }

    @keyframes bounce {
      0% {
        margin-top: 30px;
      }
      55% {
        margin-top: 0rem;
      }
      100% {
        margin-top: 30px;
      }
    }
  }

  p {
    color: white;
    text-shadow: 0px 0px 8px #114476;
    font-size: 16px;
    font-weight: bolder;
    margin-top: 12px;
  }
`;

export default LoadingWrapper;
