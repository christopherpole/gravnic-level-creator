import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TickIcon from 'common/icons/tickIcon';
import CrossIcon from 'common/icons/crossIcon';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};
`;

export const SolutionStatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SolutionStatus = styled.p`
  margin-left: 0.4em;
`;

export const SolutionDisplay = ({ solution }) => (
  <Wrapper id="solution-display">
    {!solution && (
      <SolutionStatusWrapper>
        <CrossIcon />
        <SolutionStatus>Not yet solved</SolutionStatus>
      </SolutionStatusWrapper>
    )}

    {solution && (
      <SolutionStatusWrapper>
        <TickIcon />
        <SolutionStatus>Solved!</SolutionStatus>
      </SolutionStatusWrapper>
    )}
  </Wrapper>
);

SolutionDisplay.defaultProps = {
  solution: null,
};

SolutionDisplay.propTypes = {
  solution: PropTypes.array,
};

const mapStateToProps = state => ({
  solution: state.levelEditor.solution,
});

export default connect(mapStateToProps)(SolutionDisplay);
