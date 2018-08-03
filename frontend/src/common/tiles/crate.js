import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  transition: background ${props => props.moveSpeed}ms linear;
  height: 100%;
  width: 100%;
  background: brown;

  &:before {
    background: ${props => (props.moved ? '#ccc' : '#f1af48')};
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    bottom: 10%;
    right: 10%;
  }
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
