import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SolutionStatus from './solutionStatus';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};
  display: flex;
  justify-content: center;
`;

export const LevelSolver = solution => (
  <Wrapper id="level-solver">
    <SolutionStatus />
  </Wrapper>
);

LevelSolver.defaultProps = {
  solution: null,
};

LevelSolver.propTypes = {
  solution: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
};

const mapStateToProps = state => ({
  solution: state.levelSolver.solution,
});

export default connect(mapStateToProps)(LevelSolver);
