import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArrowsDisplay from 'common/arrowsDisplay';
import SolutionStatus from './solutionStatus';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};
  text-align: center;
`;

export const ArrowsDisplayWrapper = styled.div`
  margin: calc(${props => props.theme.structureSpacing} / 4) auto
    calc(-${props => props.theme.structureSpacing} / 2);
  text-align: center;
`;

export const LevelSolver = ({ solution }) => (
  <Wrapper id="level-solver">
    <SolutionStatus />
    {solution &&
      solution.length > 0 && (
        <ArrowsDisplayWrapper>
          <ArrowsDisplay justifyContent="center" maxArrowWidth="10%" arrows={solution} />
        </ArrowsDisplayWrapper>
      )}
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
