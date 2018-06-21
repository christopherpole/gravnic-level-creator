import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import 'normalize.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LevelEditor from 'levelEditor/components';
import LevelPreview from 'levelPreview/components';
import LevelManager from 'levelManager/components';
import EditorToolbar from 'levelEditor/components/editorToolbar';
import StarsEditor from 'levelEditor/components/starsEditor';
import SolutionDisplay from 'levelSolver/components';
import TileSelector from 'levelEditor/components/tileSelector';
import PreviewToolbar from 'levelPreview/components/previewToolbar';
import MoveHistoryDisplay from 'levelPreview/components/moveHistoryDisplay';

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
  grid-template-columns: 1.8fr 1.1fr 1.3fr;
  min-width: ${props => props.theme.containerWidth};
  max-width: ${props => props.theme.containerWidth};
`;

export const GridWrapper = styled.div`
  display: flex;
  padding: ${props => props.theme.structureSpacing};
  padding-right: 0;
  flex-direction: column;
`;

export const PanesWrapper = styled.div`
  display: flex;
  padding: ${props => props.theme.structureSpacing};
  flex-direction: column;
`;

export const Layout = ({ previewing }) => (
  <Wrapper id="level-creator">
    <AppContainer>
      <GridWrapper>
        {!previewing && <LevelEditor />}
        {previewing && <LevelPreview />}
        {!previewing && <EditorToolbar />}
        {previewing && <PreviewToolbar />}
      </GridWrapper>

      <PanesWrapper>
        <StarsEditor />
        <SolutionDisplay />
        {previewing ? <MoveHistoryDisplay /> : <TileSelector />}
      </PanesWrapper>
      <LevelManager />
    </AppContainer>
  </Wrapper>
);

Layout.propTypes = {
  previewing: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  previewing: state.levelPreview.previewing,
});

export default connect(mapStateToProps)(Layout);
