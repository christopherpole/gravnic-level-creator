import React from 'react';
import { MOVE_NONE, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #000;
  }

  ${props => css`
    ${props.direction === MOVE_UP &&
      css`
        &:before {
          border-left-color: transparent;
          border-right-color: transparent;
          border-top: none;
        }
      `};

    ${props.direction === MOVE_RIGHT &&
      css`
        &:before {
          border-bottom-color: transparent;
          border-top-color: transparent;
          border-right: none;
        }
      `};

    ${props.direction === MOVE_DOWN &&
      css`
        &:before {
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom: none;
        }
      `};

    ${props.direction === MOVE_LEFT &&
      css`
        &:before {
          border-bottom-color: transparent;
          border-top-color: transparent;
          border-left: none;
        }
      `};
  `};
`;

const GravityChangerTile = ({ direction }) => <Wrapper direction={direction} />;

GravityChangerTile.propTypes = {
  direction: PropTypes.oneOf([MOVE_NONE, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT]).isRequired,
};

export default GravityChangerTile;
