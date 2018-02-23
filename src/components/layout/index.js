import React from 'react';
import styled from 'styled-components';
import 'normalize.css';

import LevelEditor from '../levelEditor';
import LevelManager from '../levelManager';
import LevelSolver from '../levelSolver';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.theme.structureSpacing};
  background: ${props => props.theme.maskColor};
`;

export const AppContainer = styled.div`
  background: ${props => props.theme.backgroundColor};
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.foregroundColor};
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
`;

const Layout = () => (
  <Wrapper id="level-creator">
    <AppContainer>
      <LevelEditor />
      <LevelManager />
      <LevelSolver />
    </AppContainer>
  </Wrapper>
);

export default Layout;
