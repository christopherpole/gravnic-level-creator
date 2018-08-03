import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Tile from 'common/tiles';
import LinkDisplay from './linkDisplay';
import { updateTile, startDrag, stopDrag, mouseoverTile } from '../actions';
import { getTilesWithDarkenedStates } from '../selectors';

export const Wrapper = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const TilesWrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  background: white;
  display: grid;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 1px;
`;

export const TileWrapper = styled.div`
  position: relative;
  cursor: pointer;
  user-drag: none;
  user-select: none;

  ${props =>
    props.darkened &&
    css`
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: black;
        opacity: 0.5;
      }
    `};
`;

export const LevelEditor = ({
  tilesWithDarkenedStates,
  updateTileAction,
  startDragAction,
  stopDragAction,
  mouseoverTileAction,
}) => {
  const handleMouseUp = () => {
    stopDragAction();
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = pos => {
    startDragAction(pos);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Wrapper id="editor-grid">
      <TilesWrapper>
        {tilesWithDarkenedStates.map(tile => (
          <TileWrapper
            //  Add this bit to a selector?
            darkened={tile.darkened}
            onMouseDown={() => {
              handleMouseDown(tile.position);
            }}
            onClick={() => {
              updateTileAction(tile.position);
            }}
            key={tile.position}
            onMouseMove={() => {
              mouseoverTileAction(tile.position);
            }}
            className="tile"
          >
            <Tile tileId={tile.selectedTileId} />
          </TileWrapper>
        ))}
        <LinkDisplay />
      </TilesWrapper>
    </Wrapper>
  );
};

LevelEditor.propTypes = {
  startDragAction: PropTypes.func.isRequired,
  stopDragAction: PropTypes.func.isRequired,
  updateTileAction: PropTypes.func.isRequired,
  mouseoverTileAction: PropTypes.func.isRequired,
  tilesWithDarkenedStates: PropTypes.arrayOf(
    PropTypes.shape({
      selectedTileId: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
      darkened: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  tilesWithDarkenedStates: getTilesWithDarkenedStates(state),
});

const mapDispatchToProps = dispatch => ({
  updateTileAction: bindActionCreators(updateTile, dispatch),
  startDragAction: bindActionCreators(startDrag, dispatch),
  stopDragAction: bindActionCreators(stopDrag, dispatch),
  mouseoverTileAction: bindActionCreators(mouseoverTile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelEditor);
