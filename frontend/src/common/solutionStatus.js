import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TickIcon from 'common/icons/tickIcon';
import CrossIcon from 'common/icons/crossIcon';
import WarningIcon from 'common/icons/warningIcon';
import LoadingIcon from 'common/icons/loadingIcon';

export const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const SolutionStatusText = styled.p`
  white-space: nowrap;
  margin-left: calc(${props => props.theme.structureSpacing} / 2);
`;

export const SolutionStatus = ({ loading, error, solution, maxMoves }) => {
  if (loading) {
    return (
      <Wrapper>
        <LoadingIcon size={15} />
        <SolutionStatusText>Solving</SolutionStatusText>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <CrossIcon size={15} />
        <SolutionStatusText>An error has occured</SolutionStatusText>
      </Wrapper>
    );
  }

  if (solution && solution.length === 0) {
    return (
      <Wrapper>
        <WarningIcon color="yellow" />
        <SolutionStatusText>Solved by default</SolutionStatusText>
      </Wrapper>
    );
  }

  if (solution) {
    return (
      <Wrapper>
        <TickIcon />
        <SolutionStatusText>
          Solvable in {solution.length} move{solution.length !== 1 && 's'}!
        </SolutionStatusText>
      </Wrapper>
    );
  }

  if (solution === false) {
    return (
      <Wrapper>
        <CrossIcon />
        <SolutionStatusText>
          Unsolvable in {maxMoves} move{solution.length !== 1 && 's'}!
        </SolutionStatusText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <WarningIcon size={15} color="yellow" />
      <SolutionStatusText>Not yet solved</SolutionStatusText>
    </Wrapper>
  );
};

SolutionStatus.defaultProps = {
  loading: false,
  solution: null,
  maxMoves: null,
  error: null,
};

SolutionStatus.propTypes = {
  loading: PropTypes.bool,
  solution: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  maxMoves: PropTypes.number,
  error: PropTypes.bool,
};

export default SolutionStatus;
