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
`;

export const Entity = ({ entityId, xPos, yPos }) => (
  <Wrapper
    xPos={xPos}
    yPos={yPos}
    heightPercentage={100 / GRID_SIZE}
    widthPercentage={100 / GRID_SIZE}
  >
    <Tile tileId={entityId} />
  </Wrapper>
);

Entity.propTypes = {
  entityId: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
};

export default Entity;
