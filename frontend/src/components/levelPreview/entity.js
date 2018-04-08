import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tile from '../common/tile';
import { GRID_SIZE } from '../../config/settings';

export const Wrapper = styled.div`
  height: ${props => props.heightPercentage}%;
  width: ${props => props.widthPercentage}%;
  position: absolute;
  left: ${props => props.xPos}%;
  top: ${props => props.yPos}%;
  transition: all 1s;
  background: ${props => (props.entityId === 1 ? 'white' : 'red')};
  z-index: ${props => (props.entityId === 2 ? 2 : 1)};
`;

export const Entity = ({ id, entityId, xPos, yPos }) => (
  <Wrapper
    xPos={xPos}
    yPos={yPos}
    id={id}
    heightPercentage={100 / GRID_SIZE}
    widthPercentage={100 / GRID_SIZE}
    entityId={entityId}
  />
);

Entity.propTypes = {
  entityId: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
};

export default Entity;
