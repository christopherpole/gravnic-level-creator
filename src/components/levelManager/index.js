import React from 'react';
import styled from 'styled-components';

import LevelsList from './levelsList';

export const Wrapper = styled.section`
  border-left: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
`;

const LevelManager = () => (
  <Wrapper>
    <LevelsList />
  </Wrapper>
);

export default LevelManager;
