import styled, { css } from 'styled-components';

export const Container = styled.div<{ isFixed: boolean }>`
  width: 240px;
  height: 100vh;
  background: #e9e9e9;
  padding: 16px;

  display: flex;
  flex-direction: column;

  .container-items-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon-fixed-menu {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      border: none;
      color: #000;
      width: 25px;
      height: 20px;
      border-radius: 10px;
    }
  }

  .container-title-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }

    small {
      color: #fff;
      font-size: 10px;
      text-align: center;
    }
  }

  .divided {
    background: #bcbcbc;
    height: 1px;
    width: 100%;
    margin: 14px 0px;
  }

  ${({ isFixed }) =>
  !isFixed &&
    css`
      width: 100px;
      height: 100vh;
      background: linear-gradient(180deg, #0a0860 0%, #0e4171 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 16px;

      display: flex;
      flex-direction: column;
    `}
`;


