import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GRID_SIZE } from 'config/settings';
import { Tile } from 'common/tiles';

export const Wrapper = styled.div`
  height: ${props => props.heightPercentage}%;
  width: ${props => props.widthPercentage}%;
  position: absolute;
  left: ${props => props.xPos}%;
  top: ${props => props.yPos}%;
  transition: all ${props => props.moveSpeed}ms linear;
  z-index: ${props => (props.isMovableEntity ? 1 : 0)};
`;

export const Entity = ({ entity, xPos, yPos, gameSpeed, isMovableEntity }) => (
  <Wrapper
    xPos={xPos}
    yPos={yPos}
    heightPercentage={100 / GRID_SIZE}
    widthPercentage={100 / GRID_SIZE}
    moveSpeed={gameSpeed}
    isMovableEntity={isMovableEntity}
  >
    <Tile entity={entity} moveSpeed={gameSpeed} />
  </Wrapper>
);

Entity.propTypes = {
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  gameSpeed: PropTypes.number.isRequired,
  isMovableEntity: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    entityId: PropTypes.string.isRequired,
    fading: PropTypes.bool,
    color: PropTypes.string,
    targetEntity: PropTypes.object,
    shrinking: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  gameSpeed: state.levelPreview.gameSpeed,
});

export default connect(mapStateToProps)(Entity);
