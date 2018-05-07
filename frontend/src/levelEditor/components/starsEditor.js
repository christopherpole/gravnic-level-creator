import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from 'common/button';
import StarIcon from 'common/starIcon';
import { setStars } from '../actions';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};
`;

export const StarsWrapper = styled.ul`
  display: flex;
`;

export const StarIconWrapper = styled.li`
  margin-right: 0.2em;
  list-style-type: none;

  &:last-child {
    margin-right: 0;
  }
`;

export const StarsList = styled.ul``;

export const StarListItem = styled.li`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  align-items: center;
  margin-bottom: 0.3em;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.grayedOut &&
    css`
      color: #999;
    `};
`;

export const StarsLabel = styled.span`
  font-size: 1.2em;
  user-select: none;
`;

export const ControlsWrapper = styled.div`
  display: flex;
`;

export const ControlButton = styled(Button)`
  margin-right: 0.3em;
  padding: 0;
  height: 2em;
  width: 2em;
  line-height: 2em;

  &:last-child {
    margin-right: 0;
  }
`;

export const ButtonDecrement = styled(ControlButton)``;

export const ButtonIncrement = styled(ControlButton)``;

export const StarsEditor = ({ stars, setStarsAction, previewing, movesMade }) => (
  <Wrapper id="stars-editor">
    <StarsList>
      {stars.map((noOfMoves, i) => (
        <StarListItem
          className="stars-container"
          grayedOut={previewing && movesMade > noOfMoves}
          key={i}
        >
          <StarsWrapper>
            {[...Array(3)].map((_, j) => {
              let starColor;

              if (previewing && movesMade > noOfMoves) starColor = '#999';
              if (i > j) starColor = 'transparent';

              return (
                <StarIconWrapper key={j}>
                  <StarIcon fillColor={starColor} size={20} />
                </StarIconWrapper>
              );
            })}
          </StarsWrapper>

          <StarsLabel>{noOfMoves}</StarsLabel>

          <ControlsWrapper>
            <ButtonDecrement
              disabled={previewing}
              onClick={() => {
                setStarsAction(i, noOfMoves - 1);
              }}
              className="btn-decrement"
            >
              -
            </ButtonDecrement>
            <ButtonIncrement
              disabled={previewing}
              onClick={() => {
                setStarsAction(i, noOfMoves + 1);
              }}
              className="btn-increment"
            >
              +
            </ButtonIncrement>
          </ControlsWrapper>
        </StarListItem>
      ))}
    </StarsList>
  </Wrapper>
);

StarsEditor.defaultProps = {};

StarsEditor.propTypes = {
  stars: PropTypes.array.isRequired,
  setStarsAction: PropTypes.func.isRequired,
  previewing: PropTypes.bool.isRequired,
  movesMade: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  stars: state.levelEditor.stars,
  previewing: state.levelPreview.previewing,
  movesMade: state.levelPreview.gameHistory.length - 1,
});

const mapDispatchToProps = dispatch => ({
  setStarsAction: bindActionCreators(setStars, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarsEditor);
