import React from 'react';
import { ENTITIES } from 'gravnic-game';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background: white;
  height: 100%;
  width: 100%;

  &:before {
    height: 40%;
    width: 40%;
    top: 50%;
    left: 50%;
    margin-top: -20%;
    margin-left: -20%;
    content: '';
    position: absolute;

    ${props => css`
      ${props.entityId === ENTITIES.BLOCK.id &&
        css`
          background: ${props.color};
        `};

      ${props.entityId === ENTITIES.RAINBOW_BLOCK.id &&
        css`
          background: linear-gradient(
            to bottom right,
            red,
            orange,
            yellow,
            green,
            cyan,
            blue,
            violet
          );
        `};
    `};
  }
`;

const ColorChangerTile = ({ targetEntity }) => <Wrapper {...targetEntity} />;

ColorChangerTile.propTypes = {
  targetEntity: PropTypes.shape({
    entityId: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default ColorChangerTile;
