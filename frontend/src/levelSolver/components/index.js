import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import LevelPreview from 'common/levelPreview';
import SolutionSummary from './solutionSummary';

export const Wrapper = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const WrapperInner = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

export const LevelInfo = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${props => props.theme.structureSpacing};
`;

export const LevelPreviewContainer = styled.div`
  width: 30%;
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-right: ${props => props.theme.structureSpacing};
`;

export const LevelInfoCopyContainer = styled.div`
  font-size: 1.2em;
`;

export const SolutionsContainer = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LevelSolver = ({ editorTiles, loading, loaded, error, solution, maxMoves }) => (
  <Wrapper>
    <WrapperInner>
      <LevelInfo>
        <LevelPreviewContainer>
          <LevelPreview tiles={editorTiles} />
        </LevelPreviewContainer>
        <LevelInfoCopyContainer>
          {error && <p>There was a problem solving the level</p>}
          {loading && <p>Searching for solutions...</p>}
          {!loaded && !loading && <p>No solutions available</p>}
          {solution && <SolutionSummary solution={solution} />}
          {loaded && solution === false && <p>Could not solve in {maxMoves} moves</p>}
        </LevelInfoCopyContainer>
      </LevelInfo>
      <SolutionsContainer>
        <p>Full solutions will appear here</p>
      </SolutionsContainer>
    </WrapperInner>
  </Wrapper>
);

LevelSolver.defaultProps = {
  solution: null,
  maxMoves: null,
};

LevelSolver.propTypes = {
  editorTiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  solution: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  maxMoves: PropTypes.number,
};

const mapStateToProps = state => ({
  editorTiles: state.levelEditor.tiles,
  loading: state.levelSolver.loading,
  loaded: state.levelSolver.loaded,
  error: state.levelSolver.error,
  solution: state.levelSolver.solution,
  maxMoves: state.levelSolver.maxMoves,
});

export default connect(mapStateToProps)(LevelSolver);
