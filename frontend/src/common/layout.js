import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import 'normalize.css';

import LevelEditor from 'levelEditor/components';
import LevelManager from 'levelManager/components';

injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  //  Requried for the sortable list cursor
  .drag-cursor {
    cursor: move;
    pointer-events: auto !important;  //  Not pretty but needed
  }
`;

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
  grid-template-columns: 2.5fr 1fr;
  min-width: ${props => props.theme.containerWidth};
  max-width: ${props => props.theme.containerWidth};
`;

const Layout = () => (
  <Wrapper id="level-creator">
    <AppContainer>
      <LevelEditor />
      <LevelManager />
    </AppContainer>
  </Wrapper>
);

export default Layout;
