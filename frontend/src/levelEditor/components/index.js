import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Tile from 'common/tiles';
import { updateTile, startDrag, stopDrag } from '../actions';

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
`;

export const LevelEditor = ({
  tiles,
  selectedTileId,
  updateTileAction,
  startDragAction,
  stopDragAction,
  dragging,
}) => {
  const handleMouseUp = () => {
    stopDragAction();
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    startDragAction();
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = tile => {
    if (dragging && selectedTileId !== tile.selectedTileId) {
      updateTileAction(tile.position);
    }
  };

  return (
    <Wrapper id="editor-grid">
      <TilesWrapper onMouseDown={handleMouseDown}>
        {tiles.map(editorTile => (
          <TileWrapper
            onClick={() => {
              updateTileAction(editorTile.position);
            }}
            key={editorTile.position}
            onMouseMove={() => {
              handleMouseMove(editorTile);
            }}
            className="tile"
          >
            <Tile tileId={editorTile.selectedTileId} />
          </TileWrapper>
        ))}
      </TilesWrapper>
    </Wrapper>
  );
};

LevelEditor.propTypes = {
  startDragAction: PropTypes.func.isRequired,
  stopDragAction: PropTypes.func.isRequired,
  updateTileAction: PropTypes.func.isRequired,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      selectedTileId: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  dragging: PropTypes.bool.isRequired,
  selectedTileId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tiles: state.levelEditor.tiles,
  selectedTileId: state.levelEditor.selectedTileId,
  dragging: state.levelEditor.dragging,
});

const mapDispatchToProps = dispatch => ({
  updateTileAction: bindActionCreators(updateTile, dispatch),
  startDragAction: bindActionCreators(startDrag, dispatch),
  stopDragAction: bindActionCreators(stopDrag, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelEditor);
