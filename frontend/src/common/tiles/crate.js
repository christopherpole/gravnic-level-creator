import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  transition: background ${props => props.moveSpeed}ms linear;
  background: ${props => (props.moved ? '#ccc' : '#f1af48')};
  height: 100%;
  width: 100%;
  border: 4px solid brown;
`;

const CrateTile = ({ moved, moveSpeed }) => <Wrapper moveSpeed={moveSpeed} moved={moved} />;

CrateTile.defaultProps = {
  moved: false,
  moveSpeed: 0,
};

CrateTile.propTypes = {
  moved: PropTypes.bool,
  moveSpeed: PropTypes.number,
};

export default CrateTile;
