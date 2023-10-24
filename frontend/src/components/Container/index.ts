import styled from 'styled-components';

interface TypeContainerItems {
  grid?: string;
  gridtemplate?: string;
  gridGap?: string;
}

export const Container = styled.div<TypeContainerItems>`
  display: grid;

  grid-template:
    "FEH SQ"
    "RPH SQ"
    "RPL SQ";

  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;

  /* padding: 25px; */
  height: 90%;
`;
