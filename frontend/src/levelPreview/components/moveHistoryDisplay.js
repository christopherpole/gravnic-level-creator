import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArrowsDisplay from 'common/arrowsDisplay';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
`;

const MovesContainerWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  margin-bottom: ${props => props.theme.structureSpacing};
`;

const MovesContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
`;

const MovesMade = styled.p`
  font-size: 1.4em;
  text-align: center;
  width: 100%;
`;

export const MoveHistoryDisplay = ({ moveHistory }) => (
  <Wrapper id="moves-container">
    <MovesContainerWrapper>
      <MovesContainer>
        <ArrowsDisplay maxArrowWidth="25%" arrows={moveHistory} />
      </MovesContainer>
    </MovesContainerWrapper>
    <MovesMade id="moves-made-label">Moves made: {moveHistory.length}</MovesMade>
  </Wrapper>
);

MoveHistoryDisplay.propTypes = {
  moveHistory: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  moveHistory: state.levelPreview.moveHistory,
});

export default connect(mapStateToProps)(MoveHistoryDisplay);
