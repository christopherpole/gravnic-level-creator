import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import LevelPreview from 'common/levelPreview';

export const Wrapper = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const WrapperInner = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const LevelInfo = styled.div`
  display: flex;
  width: 100%;
`;

export const LevelPreviewContainer = styled.div`
  width: 30%;
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-right: ${props => props.theme.structureSpacing};
`;

export const LevelInfoCopyContainer = styled.div`
  font-size: 1.2em;
`;

export const LevelSolver = ({ editorTiles }) => (
  <Wrapper>
    <WrapperInner>
      <LevelInfo>
        <LevelPreviewContainer>
          <LevelPreview tiles={editorTiles} />
        </LevelPreviewContainer>
        <LevelInfoCopyContainer>
          <p>No solutions available</p>
        </LevelInfoCopyContainer>
      </LevelInfo>
    </WrapperInner>
  </Wrapper>
);

LevelSolver.propTypes = {
  editorTiles: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  editorTiles: state.levelEditor.tiles,
});

export default connect(mapStateToProps)(LevelSolver);
