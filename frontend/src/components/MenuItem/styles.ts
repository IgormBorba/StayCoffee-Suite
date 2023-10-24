import styled from 'styled-components';

export const Container = styled.a<{ hasSubmenu: boolean; active: boolean }>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? '#0a0860' : 'black')};;
  text-decoration: none;
  padding: ${(props) => (props.hasSubmenu ? '4px 15px' : '10px 15px')};
  background: ${(props) => (props.active ? '#D2C77D' : '#DEDEDE')};
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #D2C77D;
    color: #000;
  }
`;

export const Icon = styled.img`
  margin-right: 12px;

  &:hover{
    filter: drop-shadow(0px 0px 5px #ffffff);
  }
`;

export const ArrowIcon = styled.span<{ isExpanded: boolean }>`
  margin-left: auto;
  transform: ${(props) => (props.isExpanded ? 'rotate(0deg)' : 'rotate(90deg)')};
  transition: transform 0.2s ease-in-out;
  padding-top: 8px;

  &::before {
    content: '';
    display: inline-block;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #000 transparent transparent transparent;
    padding-top: 8px;
  }
`;

export const SubMenu = styled.div<{ isExpanded: boolean; isFixed: boolean }>`
  display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  margin-left: ${(props) => (props.isFixed ? '16px' : '0px')};
`;

export const SubMenuItem = styled.a<{ isFixed: boolean; active: boolean }>`
  font-size: ${(props) => (props.isFixed ? '12px' : '10px')};
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? '#CECECE' : '#1B212D')};
  background: ${(props) => (props.active ? '#008036' : '')};
  text-decoration: none;
  padding: ${(props) => (props.isFixed ? '8px' : '5px')};
  margin-bottom: 8px;
  /* text-indent: ${(props) => (props.isFixed ? '16px' : '0px')}; */
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: #CECECE;
    background: #008036;
  }
`;
