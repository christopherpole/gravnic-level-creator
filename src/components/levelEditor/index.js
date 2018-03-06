import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LevelPreview from './levelPreview';
import Grid from './grid';
import EditorToolbar from './editorToolbar';
import TileSelector from './tileSelector';

export const Wrapper = styled.section`
  border-bottom: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
  position: relative;
`;

export const WrapperInner = styled.section`
  display: grid;
  grid-gap: ${props => props.theme.structureSpacing};
  grid-template-columns: 2fr 1fr;
`;

export const LevelEditor = ({ previewing }) => (
  <Wrapper>
    <WrapperInner>
      {previewing ? <LevelPreview /> : <Grid />}
      <EditorToolbar />
      <TileSelector />
    </WrapperInner>
  </Wrapper>
);

LevelEditor.propTypes = {
  previewing: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  previewing: state.levelEditor.previewing,
});

export default connect(mapStateToProps)(LevelEditor);
