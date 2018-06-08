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
`;

export const Tile = ({ entity }) => <Wrapper entityId={entity.entityId} color={entity.color} />;

Tile.propTypes = {
  entity: PropTypes.shape({
    entityId: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state, props) => ({
  entity: getEntityForTileId(state, props.tileId),
});

export default connect(mapStateToProps)(Tile);
