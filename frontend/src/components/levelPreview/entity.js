import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GRID_SIZE, ENTITY_MOVE_SPEED } from '../../config/settings';

export const Wrapper = styled.div`
  height: ${props => props.heightPercentage}%;
  width: ${props => props.widthPercentage}%;
  position: absolute;
  left: ${props => props.xPos}%;
  top: ${props => props.yPos}%;
  transition: all ${props => props.moveSpeed}ms linear;
  background: ${props => (props.entityId === 1 ? 'white' : 'red')};
  z-index: ${props => (props.entityId === 2 ? 2 : 1)};
`;

export const Entity = ({ entityId, xPos, yPos }) => (
  <Wrapper
    xPos={xPos}
    yPos={yPos}
    heightPercentage={100 / GRID_SIZE}
    widthPercentage={100 / GRID_SIZE}
    entityId={entityId}
    moveSpeed={ENTITY_MOVE_SPEED}
  />
);

Entity.propTypes = {
  entityId: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
};

export default Entity;
