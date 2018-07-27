import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: white;

  &:before {
    height: 100%;
    width: 100%;
    content: 'B';
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    border-radius: 100%;
  }

  ${props =>
    props.exploding &&
    css`
      &:before {
        display: none;
      }

      &:after {
        position: absolute;
        content: '';
        height: 300%;
        width: 300%;
        margin-top: -100%;
        margin-left: -100%;
        background: yellow;
        z-index: 3;
        top: 0;
        left: 0;
      }
    `};
`;

const Bomb = ({ exploding, moveSpeed }) => <Wrapper exploding={exploding} moveSpeed={moveSpeed} />;

Bomb.defaultProps = {
  exploding: false,
  moveSpeed: 0,
};

Bomb.propTypes = {
  exploding: PropTypes.bool,
  moveSpeed: PropTypes.number,
};

export default Bomb;
