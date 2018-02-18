import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid red;
  padding: ${props => props.theme.structureSpacing};
`;

const TileSelector = () => (
  <Wrapper>
    <p>This be the tile selector</p>
  </Wrapper>
);

export default TileSelector;
