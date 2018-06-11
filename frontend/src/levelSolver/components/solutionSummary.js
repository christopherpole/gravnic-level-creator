import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArrowIcon from 'common/icons/arrowIcon';

export const Wrapper = styled.div``;

export const StatusText = styled.p`
  margin-bottom: ${props => props.theme.structureSpacing};
`;

export const Solution = styled.ul`
  list-style-type: none;
  display: flex;
`;

export const SolutionStep = styled.li`
  max-width: calc(${props => props.theme.structureSpacing} * 2);
  margin-right: calc(${props => props.theme.structureSpacing} / 2);

  &:last-child {
    margin-right: 0;
  }
`;

export const SolutionSummary = ({ solution }) => (
  <Wrapper>
    <StatusText>Quickest solution:</StatusText>
    <Solution>
      {solution.map((move, index) => (
        <SolutionStep key={index}>
          <ArrowIcon direction={move} />
        </SolutionStep>
      ))}
    </Solution>
  </Wrapper>
);

SolutionSummary.propTypes = {
  solution: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  solution: state.levelSolver.result.solution,
});

export default connect(mapStateToProps)(SolutionSummary);
