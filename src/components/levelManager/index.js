import React from 'react';
import styled from 'styled-components';

import LevelsList from './levelsList';
import ManagerActions from './managerActions';

export const Wrapper = styled.section`
  border-left: 1px solid ${props => props.theme.foregroundColor};
  display: flex;
  flex-direction: column;
`;

const LevelManager = () => (
  <Wrapper>
    <LevelsList />
    <ManagerActions />
  </Wrapper>
);

export default LevelManager;
