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

  ${props => props.id === 0 && css`
    background: ${props.theme.backgroundColor};
  `}

  ${props => props.id === 1 && css`
    background: white;
  `}

  ${props => props.id === 2 && css`
    background: red;
  `}

  ${props => props.id === 3 && css`
    background: orange;
  `}

  ${props => props.id === 4 && css`
    background: yellow;
  `}

  ${props => props.id === 5 && css`
    background: green;
  `}

  ${props => props.id === 6 && css`
    background: blue;
  `}

  ${props => props.id === 7 && css`
    background: purple;
  `}

  ${props => props.id === 8 && css`
    background: grey;
  `}
`;

const Tile = ({ id }) => (
  <Wrapper id={id} />
);

Tile.defaultProps = {
  id: null,
};

Tile.propTypes = {
  id: PropTypes.number,
};

export default Tile;
