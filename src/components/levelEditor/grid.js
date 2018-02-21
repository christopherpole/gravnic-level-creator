import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tile from '../common/tile';

const Wrapper = styled.div`
  height: 0;
  padding: ${props => props.theme.structureSpacing};
  padding-bottom: 100%;
  position: relative;
`;

const TilesWrapper = styled.div`
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

const TileWrapper = styled.div`
  position: relative;
`;

export const Grid = ({ tiles }) => (
  <Wrapper>
    <TilesWrapper>
      {tiles.map(editorTile => (
        <TileWrapper key={editorTile.position} >
          <Tile id={editorTile.selectedTileId} />
        </TileWrapper>
      ))}
    </TilesWrapper>
  </Wrapper>
);

Grid.SIZE = 10;

Grid.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    selectedTileId: PropTypes.number,
    position: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = state => ({
  tiles: state.levelEditor.tiles,
});

export default connect(mapStateToProps)(Grid);
