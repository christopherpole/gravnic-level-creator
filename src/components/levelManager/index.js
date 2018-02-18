import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid brown;
  padding: ${props => props.theme.structureSpacing};
`;

const LevelManager = () => (
  <Wrapper>
    <p>Level Manager goes here</p>
  </Wrapper>
);

export default LevelManager;
