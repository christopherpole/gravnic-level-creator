import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LevelPreview from '../levelPreview';
import PreviewToolbar from '../levelPreview/previewToolbar';
import Grid from './grid';
import EditorToolbar from './editorToolbar';
import TileSelector from './tileSelector';
import StarsEditor from './starsEditor';

export const Wrapper = styled.section`
  padding: ${props => props.theme.structureSpacing};
  position: relative;
`;

export const WrapperInner = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: ${props => props.theme.structureSpacing};
`;

export const GridWrapper = styled.div``;

export const PanesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LevelEditor = ({ previewing }) => (
  <Wrapper>
    <WrapperInner>
      <GridWrapper>
        {previewing ? <LevelPreview /> : <Grid />}
        {previewing ? <PreviewToolbar /> : <EditorToolbar />}
      </GridWrapper>
      <PanesWrapper>
        <StarsEditor />
        <TileSelector />
      </PanesWrapper>
    </WrapperInner>
  </Wrapper>
);

LevelEditor.propTypes = {
  previewing: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  previewing: state.levelPreview.previewing,
});

export default connect(mapStateToProps)(LevelEditor);
