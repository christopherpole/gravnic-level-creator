import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLinkCoords, isLinkingMode } from '../selectors';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  ${props =>
    props.faded &&
    css`
      opacity: 0.5;
    `};
`;

export const LinesWrapper = styled.svg`
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

export const Line = styled.line`
  stroke: white;
  stroke-width: 4;
  pointer-events: none;
`;

export const LinkDisplay = ({ formattedLinks, linkingMode }) => (
  <Wrapper faded={!linkingMode} id="link-display">
    <LinesWrapper>
      {formattedLinks.map((formattedLink, index) => (
        <Line
          key={index}
          x1={formattedLink.x1}
          y1={formattedLink.y1}
          x2={formattedLink.x2}
          y2={formattedLink.y2}
        />
      ))}
    </LinesWrapper>
  </Wrapper>
);

LinkDisplay.propTypes = {
  formattedLinks: PropTypes.array.isRequired,
  linkingMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  formattedLinks: getLinkCoords(state),
  linkingMode: isLinkingMode(state),
});

export default connect(mapStateToProps)(LinkDisplay);
