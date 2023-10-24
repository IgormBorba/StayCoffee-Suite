import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  body {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* Responsividade para telas menores */
    @media (max-width: 768px) {
      font-size: 14px;
      /* Outras regras para dispositivos com tela menor que 768px */
    }
  }

  button{
    cursor: pointer;
  }
`;
