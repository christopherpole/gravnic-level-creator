import React from 'react';
import styled from 'styled-components';

import Grid from './grid';
import TileSelector from './tileSelector';

const Wrapper = styled.div`
  border: 1px solid blue;
  padding: ${props => props.theme.structureSpacing};
  grid-column-gap: ${props => props.theme.structureSpacing};
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const LevelEditor = () => (
  <Wrapper>
    <Grid />
    <TileSelector />
  </Wrapper>
);

export default LevelEditor;
