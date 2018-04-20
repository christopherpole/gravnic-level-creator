import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GRID_SIZE } from 'config/settings';

export const Wrapper = styled.div`
  height: ${props => props.heightPercentage}%;
  width: ${props => props.widthPercentage}%;
  position: absolute;
  left: ${props => props.xPos}%;
  top: ${props => props.yPos}%;
  transition: all ${props => props.moveSpeed}ms linear;
  background: ${props => (props.entityId === 1 ? 'white' : 'red')};
  z-index: ${props => (props.entityId === 2 ? 2 : 1)};
  opacity: ${props => (props.fading ? 0 : 1)};
`;

export const Entity = ({ entityId, xPos, yPos, fading, gameSpeed }) => (
  <Wrapper
    xPos={xPos}
    yPos={yPos}
    heightPercentage={100 / GRID_SIZE}
    widthPercentage={100 / GRID_SIZE}
    entityId={entityId}
    moveSpeed={gameSpeed}
    fading={fading}
  />
);

Entity.defaultProps = {
  fading: false,
};

Entity.propTypes = {
  entityId: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  fading: PropTypes.bool,
  gameSpeed: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  gameSpeed: state.levelPreview.gameSpeed,
});

export default connect(mapStateToProps)(Entity);
