import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  background: ${props => props.theme.backgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${props =>
    props.tileId === 0 &&
    css`
      background: ${props.theme.backgroundColor};
    `}

  ${props =>
    props.tileId === 1 &&
    css`
      background: white;
    `}

  ${props =>
    props.tileId === 2 &&
    css`
      background: red;
    `}

  ${props =>
    props.tileId === 3 &&
    css`
      background: orange;
    `}

  ${props =>
    props.tileId === 4 &&
    css`
      background: yellow;
    `}

  ${props =>
    props.tileId === 5 &&
    css`
      background: green;
    `}

  ${props =>
    props.tileId === 6 &&
    css`
      background: blue;
    `}

  ${props =>
    props.tileId === 7 &&
    css`
      background: purple;
    `}

  ${props =>
    props.tileId === 8 &&
    css`
      background: grey;
    `}
`;

const Tile = ({ tileId }) => <Wrapper tileId={tileId} />;

Tile.defaultProps = {
  tileId: null,
};

Tile.propTypes = {
  tileId: PropTypes.number,
};

export default Tile;
