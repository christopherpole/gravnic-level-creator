import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  background: white;
  height: 100%;
  width: 100%;

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

  ${props =>
    props.shrinking &&
    css`
      &:before {
        height: 0;
        width: 0;
      }
    `};
`;

const BlackHoleTile = ({ shrinking }) => <Wrapper shrinking={shrinking} />;

BlackHoleTile.defaultProps = {
  shrinking: false,
};

BlackHoleTile.propTypes = {
  shrinking: PropTypes.bool,
};

export default BlackHoleTile;
