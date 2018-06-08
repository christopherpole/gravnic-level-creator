import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GRID_SIZE } from 'config/settings';
import { Wrapper as EntityWrapper } from 'common/tile';

export const Wrapper = styled.div`
  height: ${props => props.heightPercentage}%;
  width: ${props => props.widthPercentage}%;
  position: absolute;
  left: ${props => props.xPos}%;
  top: ${props => props.yPos}%;
  transition: all ${props => props.moveSpeed}ms linear;
  opacity: ${props => (props.fading ? 0 : 1)};
  z-index: ${props => (props.isMovableEntity ? 1 : 0)};
`;

export const Entity = ({ entityId, color, xPos, yPos, fading, gameSpeed, isMovableEntity }) => (
  <Wrapper
    xPos={xPos}
    yPos={yPos}
    heightPercentage={100 / GRID_SIZE}
    widthPercentage={100 / GRID_SIZE}
    moveSpeed={gameSpeed}
    fading={fading}
    isMovableEntity={isMovableEntity}
  >
    <EntityWrapper entityId={entityId} color={color} />
  </Wrapper>
);

Entity.defaultProps = {
  fading: false,
  color: null,
};

Entity.propTypes = {
  entityId: PropTypes.string.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  fading: PropTypes.bool,
  color: PropTypes.string,
  gameSpeed: PropTypes.number.isRequired,
  isMovableEntity: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  gameSpeed: state.levelPreview.gameSpeed,
});

export default connect(mapStateToProps)(Entity);
