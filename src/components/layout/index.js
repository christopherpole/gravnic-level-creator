import React from 'react';
import styled from 'styled-components';

import LevelEditor from '../levelEditor';
import LevelManager from '../levelManager';
import LevelSolver from '../levelSolver';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.maskColor};
`;

const AppContainer = styled.div`
  background: ${props => props.theme.backgroundColor};
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.foregroundColor};
  margin: ${props => props.theme.structureSpacing};
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
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
