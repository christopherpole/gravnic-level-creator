import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  border-left: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
  grid-column: 2;
  grid-row: 1 / 3;
`;

const LevelManager = () => (
  <Wrapper>
    <p>Level Manager goes here</p>
  </Wrapper>
);

export default LevelManager;
