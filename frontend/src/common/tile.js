import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ENTITIES } from 'gravnic-game';
import { connect } from 'react-redux';

import { getEntityForTileId } from 'levelEditor/selectors';

export const Wrapper = styled.div`
  background: ${props => props.theme.backgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => (props.fading ? 0 : 1)};
  transition: all ${props => props.moveSpeed}ms linear;

  ${props =>
    props.shrinking &&
    css`
      opacity: 0;
    `}

  ${props =>
    props.moveSpeed &&
    css`
      transition: opacity ${props.moveSpeed}ms linear;
    `}

  ${props =>
    props.entityId === ENTITIES.NONE &&
    css`
      background: ${props.theme.backgroundColor};
    `}

  ${props =>
    props.entityId === ENTITIES.FLOOR &&
    css`
      background: white;
    `}

  ${props =>
    props.entityId === ENTITIES.BLOCK &&
    css`
      background: ${props.color};
    `}

  ${props =>
    props.entityId === ENTITIES.GLASS &&
    css`
      background: #ccc;
    `}

  ${props =>
    props.entityId === ENTITIES.RAINBOW_BLOCK &&
    css`
      background: linear-gradient(to bottom right, red, orange, yellow, green, cyan, blue, violet);
    `}

  ${props =>
    props.entityId === ENTITIES.BLACK_HOLE &&
    css`
      background: white;

      &:before {
        transition: all 0.2s linear;
        height: 50%;
        width: 50%;
        background: black;
        border-radius: 100%;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25%;
        margin-left: -25%;
      }

      ${props.shrinking &&
        css`
          opacity: 1;

          &:before {
            height: 0%;
            width: 0%;
            margin-top: 0;
            margin-left: 0;
          }
        `};
    `}
`;

export const Tile = ({ entity }) => (
  <Wrapper
    entityId={entity.entityId}
    color={entity.color}
    fading={entity.fading}
    shrinking={entity.shrinking}
  />
);

Tile.propTypes = {
  entity: PropTypes.shape({
    entityId: PropTypes.string.isRequired,
    color: PropTypes.string,
    fading: PropTypes.bool,
    shrinking: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state, props) => ({
  entity: getEntityForTileId(state, props.tileId),
});

export default connect(mapStateToProps)(Tile);
