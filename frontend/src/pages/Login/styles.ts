import styled from 'styled-components';

interface SeparatorProps {
  margin?: string;
  justify?: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  button:hover {
    color: black;
    background-color: #d2c77d;
  }
`;

export const ContainerContent = styled.div`
  position: relative;
  width: 40%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1120px) {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
`;

export const ContainerInputs = styled.div`
  max-width: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  align-self: baseline;

  span {
    color: #434343;
    font-size: 1.6rem;
    margin-top: 10px;
  }

  .title {
    font-weight: 600;
    font-style: normal;
    font-family: "Kumbh Sans", sans-serif;
  }

  .subTitle {
    font-weight: 600;
    font-style: normal;
    font-family: "Kumbh Sans", sans-serif;
  }
`;

export const Separator = styled.div<SeparatorProps>`
  width: 100%;
  margin: ${(props) => props.margin || '0px 0px 0px 0px'};

  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify || 'left'};

  .subTitle {
    color: #646464;
  }

  .checkBox {
    input[type="checkbox"] {
      margin-right: 10px;
    }
  }
`;

export const ContainerInput = styled.div`
  width: 100%;
  height: 45px;
  border: 1px solid #979797;
  padding: 0px 0px 0px 20px;

  display: flex;
  align-items: center;
`;

export const ContainerImage = styled.div`
  width: 60%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 90%;
    height: 90%;
  }

  span {
    display: flex;

    font-size: 1rem;
    align-self: baseline;
    margin-left: 170px;
    color: white;
  }

  @media only screen and (max-width: 1120px) {
    display: none;
    visibility: hidden;
  }

  background-color: #008036;

  @-webkit-keyframes animate-svg-fill-1 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(255, 255, 255);
    }
  }

  @keyframes animate-svg-fill-1 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(255, 255, 255);
    }
  }

  .loginSvg-1 {
    -webkit-animation: animate-svg-fill-1 0.7s linear 0.8s both;
    animation: animate-svg-fill-1 0.7s linear 0.8s both;
  }

  @-webkit-keyframes animate-svg-fill-2 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  @keyframes animate-svg-fill-2 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  .loginSvg-2 {
    -webkit-animation: animate-svg-fill-2 0.7s linear 1.3s both;
    animation: animate-svg-fill-2 0.7s linear 1.3s both;
  }

  @-webkit-keyframes animate-svg-fill-3 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  @keyframes animate-svg-fill-3 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  .loginSvg-3 {
    -webkit-animation: animate-svg-fill-3 0.7s linear 1.8s both;
    animation: animate-svg-fill-3 0.7s linear 1.8s both;
  }

  @-webkit-keyframes animate-svg-fill-4 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  @keyframes animate-svg-fill-4 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  .loginSvg-4 {
    -webkit-animation: animate-svg-fill-4 0.7s linear 2.3s both;
    animation: animate-svg-fill-4 0.7s linear 2.3s both;
  }

  @-webkit-keyframes animate-svg-fill-5 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  @keyframes animate-svg-fill-5 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  .loginSvg-5 {
    -webkit-animation: animate-svg-fill-5 0.7s linear 2.8s both;
    animation: animate-svg-fill-5 0.7s linear 2.8s both;
  }

  @-webkit-keyframes animate-svg-fill-6 {
    0% {
      fill: transparent;
    }

    100% {
      fill: rgb(210, 199, 125);
    }
  }

  @keyframes animate-svg-fill-6 {
    0% {
      fill: transparent;
    }

    100% {
      fill: white;
    }
  }

  .loginSvg-6 {
    -webkit-animation: animate-svg-fill-6 0.7s linear 3.3s both;
    animation: animate-svg-fill-6 0.7s linear 3.3s both;
  }
`;

export const ContainerFooter = styled.div`
  @media only screen and (max-width: 920px) {
    display: none;
    visibility: hidden;
  }
`;