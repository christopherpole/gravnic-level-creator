import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArrowIcon from './icons/arrowIcon';

export const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.justifyContent};
  margin: calc(-${props => props.theme.structureSpacing} / 8);
`;

export const ArrowIconWrapper = styled.li`
  list-style-type: none;
  max-width: ${props => props.maxArrowWidth};
  padding: calc(${props => props.theme.structureSpacing} / 8);
`;

const ArrowsDisplay = ({ arrows, maxArrowWidth, justifyContent }) => (
  <Wrapper justifyContent={justifyContent} className="arrows">
    {arrows.map((direction, i) => (
      <ArrowIconWrapper maxArrowWidth={maxArrowWidth} key={i}>
        <ArrowIcon direction={direction} />
      </ArrowIconWrapper>
    ))}
  </Wrapper>
);

ArrowsDisplay.defaultProps = {
  arrows: [],
  maxArrowWidth: 'auto',
  justifyContent: 'left',
};

ArrowsDisplay.propTypes = {
  arrows: PropTypes.array,
  maxArrowWidth: PropTypes.string,
  justifyContent: PropTypes.string,
};

export default ArrowsDisplay;
