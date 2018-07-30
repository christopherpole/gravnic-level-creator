import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Tile from 'common/tiles';
import LinkDisplay from './linkDisplay';
import { updateTile, startDrag, stopDrag, mouseoverTile } from '../actions';

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
  tiles,
  updateTileAction,
  startDragAction,
  stopDragAction,
  mouseoverTileAction,
  linkFromTilePos,
  availableTiles,
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
        {tiles.map(editorTile => (
          <TileWrapper
            //  Add this bit to a selector?
            darkened={
              !!(
                linkFromTilePos &&
                (availableTiles[editorTile.selectedTileId] &&
                  !availableTiles[editorTile.selectedTileId].entity.linkable)
              )
            }
            onMouseDown={() => {
              handleMouseDown(editorTile.position);
            }}
            onClick={() => {
              updateTileAction(editorTile.position, true);
            }}
            key={editorTile.position}
            onMouseMove={() => {
              mouseoverTileAction(editorTile.position);
            }}
            className="tile"
          >
            <Tile tileId={editorTile.selectedTileId} />
          </TileWrapper>
        ))}
        <LinkDisplay />
      </TilesWrapper>
    </Wrapper>
  );
};

LevelEditor.defaultProps = {
  linkFromTilePos: null,
};

LevelEditor.propTypes = {
  startDragAction: PropTypes.func.isRequired,
  stopDragAction: PropTypes.func.isRequired,
  updateTileAction: PropTypes.func.isRequired,
  mouseoverTileAction: PropTypes.func.isRequired,
  linkFromTilePos: PropTypes.number,
  availableTiles: PropTypes.array.isRequired,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      selectedTileId: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  tiles: state.levelEditor.tiles,
  linkFromTilePos: state.levelEditor.linkFromTilePos,
  availableTiles: state.levelEditor.availableTiles,
});

const mapDispatchToProps = dispatch => ({
  updateTileAction: bindActionCreators(updateTile, dispatch),
  startDragAction: bindActionCreators(startDrag, dispatch),
  stopDragAction: bindActionCreators(stopDrag, dispatch),
  mouseoverTileAction: bindActionCreators(mouseoverTile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelEditor);
