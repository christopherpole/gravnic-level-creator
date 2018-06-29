import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background: ${props => (props.shrinking ? 'white' : props.color)};
  transition: background ${props => props.moveSpeed}ms linear;
  height: 100%;
  width: 100%;
`;

const BlockTile = ({ color, shrinking, moveSpeed }) => (
  <Wrapper color={color} moveSpeed={moveSpeed} shrinking={shrinking} />
);

BlockTile.defaultProps = {
  shrinking: false,
  moveSpeed: 0,
};

BlockTile.propTypes = {
  shrinking: PropTypes.bool,
  moveSpeed: PropTypes.number,
  color: PropTypes.string.isRequired,
};

export default BlockTile;
