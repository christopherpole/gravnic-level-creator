import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: ${props => props.theme.structureSpacing};
`;

const LevelSolver = () => (
  <Wrapper>
    <p>Level Solver goes here</p>
  </Wrapper>
);

export default LevelSolver;
