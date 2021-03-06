import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ENTITIES } from 'gravnic-game';
import { connect } from 'react-redux';

import { getEntityForTileId } from 'levelEditor/selectors';
import MissingTile from './missing';
import BlankTile from './blank';
import FloorTile from './floor';
import GlassTile from './glass';
import BlockTile from './block';
import RainbowBlockTile from './rainbowBlock';
import BlackHoleTile from './blackHole';
import StickySpotTile from './stickySpot';
import LavaTile from './lava';
import SmartBombTile from './smartBomb';
import ColorChangerTile from './colorChanger';
import GravityChangerTile from './gravityChanger';
import CrateTile from './crate';
import BarrierTile from './barrier';
import CrusherTile from './crusher';
import TeleporterTile from './teleporter';

export const Wrapper = styled.div`
  background: ${props => props.theme.backgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.fading ? 0 : 1)};
  transition: all ${props => props.moveSpeed}ms linear;

  ${props =>
    props.stuck &&
    css`
      &:after {
        height: 50%;
        width: 50%;
        background: #00f500;
        border-radius: 100%;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25%;
        margin-left: -25%;
      }
    `};
`;

export const Tile = ({ entity, moveSpeed }) => {
  let DisplayTile;

  switch (entity.entityId) {
    case undefined:
      DisplayTile = MissingTile;
      break;
    case ENTITIES.NONE.id:
      DisplayTile = BlankTile;
      break;
    case ENTITIES.FLOOR.id:
      DisplayTile = FloorTile;
      break;
    case ENTITIES.GLASS.id:
      DisplayTile = GlassTile;
      break;
    case ENTITIES.BLOCK.id:
      DisplayTile = BlockTile;
      break;
    case ENTITIES.RAINBOW_BLOCK.id:
      DisplayTile = RainbowBlockTile;
      break;
    case ENTITIES.BLACK_HOLE.id:
      DisplayTile = BlackHoleTile;
      break;
    case ENTITIES.STICKY_SPOT.id:
      DisplayTile = StickySpotTile;
      break;
    case ENTITIES.LAVA.id:
      DisplayTile = LavaTile;
      break;
    case ENTITIES.SMART_BOMB.id:
      DisplayTile = SmartBombTile;
      break;
    case ENTITIES.COLOR_CHANGER.id:
      DisplayTile = ColorChangerTile;
      break;
    case ENTITIES.GRAVITY_CHANGER.id:
      DisplayTile = GravityChangerTile;
      break;
    case ENTITIES.CRATE.id:
      DisplayTile = CrateTile;
      break;
    case ENTITIES.BARRIER.id:
      DisplayTile = BarrierTile;
      break;
    case ENTITIES.CRUSHER.id:
      DisplayTile = CrusherTile;
      break;
    case ENTITIES.TELEPORTER.id:
      DisplayTile = TeleporterTile;
      break;
    default:
      DisplayTile = MissingTile;
  }

  return (
    <Wrapper
      stuck={entity.stuck}
      shrinking={entity.shrinking}
      fading={entity.fading}
      moveSpeed={moveSpeed}
    >
      <DisplayTile {...entity} moveSpeed={moveSpeed} />
    </Wrapper>
  );
};

Tile.defaultProps = {
  moveSpeed: 0,
};

Tile.propTypes = {
  entity: PropTypes.shape({
    stuck: PropTypes.bool,
    shrinking: PropTypes.bool,
    fading: PropTypes.bool,
  }).isRequired,
  moveSpeed: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  entity: getEntityForTileId(state, props.tileId),
});

export default connect(mapStateToProps)(Tile);
