import React from 'react';
import styled from 'styled-components';

import LevelEditor from '../levelEditor';
import LevelManager from '../levelManager';
import LevelSolver from '../levelSolver';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: ${props => props.theme.structureSpacing};
  left: ${props => props.theme.structureSpacing};
  right: ${props => props.theme.structureSpacing};
  bottom: ${props => props.theme.structureSpacing};
`;

const AppContainer = styled.div`
  border: 1px solid red;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
  height: 0;
  padding-bottom: 65%;
`;

const Layout = () => (
  <Wrapper>
    <AppContainer>
      <LevelEditor />
      <LevelManager />
      <LevelSolver />
    </AppContainer>
  </Wrapper>
);

export default Layout;
