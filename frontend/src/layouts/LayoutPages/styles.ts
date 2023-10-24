import styled from 'styled-components';

interface TypeLayoutPagesItem {
  gridArea?: string;
  gridtemplate?: string;
}

const gridTemplateColumn = 'auto auto auto';

export const Container = styled.div<TypeLayoutPagesItem>`
  display: grid;

  grid-template: ${({ gridArea }) => gridArea};

  grid-template-columns: ${({ gridtemplate }) =>
  gridtemplate || gridTemplateColumn};
  grid-gap: 10px;

  padding: 20px;
  height: 90%;
`;
