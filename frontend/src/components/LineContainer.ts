import styled from 'styled-components';

interface TypeLineContainerItem {
  grid?: string;
}

export const LineContainer = styled.div<TypeLineContainerItem>`
  grid-area: ${(props) => props.grid};
  width: 100%;
  height: 20% 0.5px;
  background-color: #cdcdcd;
`;
