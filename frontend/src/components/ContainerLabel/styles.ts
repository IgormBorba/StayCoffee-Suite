import styled from 'styled-components';

interface TypeContainerLabelItem {
  grid?: string;
  bottom?: string;
  background?: string;
}

export const ContainerLabel = styled.div<TypeContainerLabelItem>`
  grid-area: ${props => props.grid};
  border-radius: 10px;
  background-color: ${props => props.background};
  margin-bottom: ${props => props.bottom};
`;
