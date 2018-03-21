import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  padding: calc(${props => props.theme.structureSpacing} / 2)
    calc(${props => props.theme.structureSpacing} / 1);
  cursor: pointer;
  background-color: #fff;
  border: none;
  user-select: none;

  &:hover,
  &:focus {
    background-color: #eee;
    outline: none;
  }

  &:active {
    background-color: #fff;
  }

  ${props =>
    props.disabled &&
    css`
      background-color: #bbb;
      pointer-events: none;
    `};
`;

const Button = props => <Wrapper disabled={props.disabled} {...props} />;

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  disabled: PropTypes.bool,
};

export default Button;
