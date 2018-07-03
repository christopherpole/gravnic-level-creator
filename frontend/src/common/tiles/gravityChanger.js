import React from 'react';
import { MOVE_NONE, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.svg`
  transform: rotate(${props => props.rotation}deg);
  transform-origin: 50% 50%;
`;

const GravityChangerTile = ({ direction }) => (
  <Wrapper
    rotation={[MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT].indexOf(direction) * 90}
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    version="1.1"
  >
    <defs />
    <g stroke="none" strokeWidth="0" fill="none" fillRule="evenodd">
      <g>
        <rect fill="#FFFFFF" x="0" y="0" width="100" height="100" />
        {direction === MOVE_NONE && (
          <polygon
            stroke="#979797"
            strokeWidth="2"
            fill="#D8D8D8"
            points="25 25 25 75 75 75 75 25"
          />
        )}
        {direction !== MOVE_NONE && (
          <polygon stroke="#979797" strokeWidth="2" fill="#D8D8D8" points="50 25 75 75 25 75" />
        )}
      </g>
    </g>
  </Wrapper>
);

GravityChangerTile.propTypes = {
  direction: PropTypes.oneOf([MOVE_NONE, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT]).isRequired,
};

export default GravityChangerTile;
