import React from 'react';
import styled from 'styled-components';

import Grid from './grid';
import TileSelector from './tileSelector';

export const Wrapper = styled.section`
  border-bottom: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
  grid-column-gap: ${props => props.theme.structureSpacing};
  display: grid;
  min-height: 0;
  grid-template-columns: 2fr 1fr;
  position: relative;
`;

const LevelEditor = () => (
  <Wrapper>
    <Grid />
    <TileSelector />
  </Wrapper>
);

export default LevelEditor;
