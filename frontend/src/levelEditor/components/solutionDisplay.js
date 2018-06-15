import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SolutionStatus from 'common/solutionStatus';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};
  display: flex;
  justify-content: center;
`;

export const SolutionDisplay = ({ loading, solution, maxMoves, error }) => (
  <Wrapper id="solution-display">
    <SolutionStatus solution={solution} loading={loading} maxMoves={maxMoves} error={error} />
  </Wrapper>
);

SolutionDisplay.defaultProps = {
  solution: null,
  maxMoves: null,
};

SolutionDisplay.propTypes = {
  solution: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  maxMoves: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  solution: state.levelSolver.solution,
  maxMoves: state.levelSolver.maxMoves,
  loading: state.levelSolver.loading,
  error: state.levelSolver.error,
});

export default connect(mapStateToProps)(SolutionDisplay);
