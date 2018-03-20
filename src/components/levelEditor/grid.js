import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Tile from '../common/tile';
import { updateTile } from '../../actions/levelEditor';

export const Wrapper = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const TilesWrapper = styled.div`
  border: 1px solid white;
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

export const Grid = ({ tiles, updateTileAction }) => (
  <Wrapper id="editor-grid">
    <TilesWrapper>
      {tiles.map(editorTile => (
        <TileWrapper
          onClick={() => {
            updateTileAction(editorTile.position);
          }}
          key={editorTile.position}
          className="tile"
        >
          <Tile id={editorTile.selectedTileId} />
        </TileWrapper>
      ))}
    </TilesWrapper>
  </Wrapper>
);

Grid.propTypes = {
  updateTileAction: PropTypes.func.isRequired,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      selectedTileId: PropTypes.number,
      position: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  tiles: state.levelEditor.tiles,
});

const mapDispatchToProps = dispatch => ({
  updateTileAction: bindActionCreators(updateTile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
