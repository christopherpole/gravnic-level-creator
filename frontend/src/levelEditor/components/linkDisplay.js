import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Wrapper = styled.div`
  background: ${props => (props.linkFromTilePos ? 'rgba(0,0,0,.2)' : 'transparent')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
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

export const LinkDisplay = ({ linkFromTilePos, linkToTilePos }) => (
  <Wrapper linkFromTilePos={linkFromTilePos} id="link-display">
    <LinesWrapper>
      <Line
        x1={(linkFromTilePos % 10) * 10 + 5 + '%'}
        y1={Math.floor(linkFromTilePos / 10) * 10 + 5 + '%'}
        x2={(linkToTilePos % 10) * 10 + 5 + '%'}
        y2={Math.floor(linkToTilePos / 10) * 10 + 5 + '%'}
      />
    </LinesWrapper>
  </Wrapper>
);

LinkDisplay.defaultProps = {
  linkFromTilePos: null,
  linkToTilePos: null,
};

LinkDisplay.propTypes = {
  linkFromTilePos: PropTypes.number,
  linkToTilePos: PropTypes.number,
};

const mapStateToProps = state => ({
  linkFromTilePos: state.levelEditor.linkFromTilePos,
  linkToTilePos: state.levelEditor.linkToTilePos,
});

export default connect(mapStateToProps)(LinkDisplay);
