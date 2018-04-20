import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ENTITIES } from 'gravnic-game';

export const Wrapper = styled.div`
  background: ${props => props.theme.backgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${props =>
    props.tileId === ENTITIES.NONE &&
    css`
      background: ${props.theme.backgroundColor};
    `}

  ${props =>
    props.tileId === ENTITIES.FLOOR &&
    css`
      background: white;
    `}

  ${props =>
    props.tileId === ENTITIES.BLOCK &&
    css`
      background: red;
    `}
`;

const Tile = ({ tileId }) => <Wrapper tileId={tileId} />;

Tile.defaultProps = {
  tileId: null,
};

Tile.propTypes = {
  tileId: PropTypes.string,
};

export default Tile;
