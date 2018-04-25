import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tile from 'common/tile';

export const Wrapper = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 100%;
`;

export const WrapperInner = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const TileContainer = styled.div`
  position: relative;
`;

export const LevelPreview = ({ tiles }) => (
  <Wrapper className="level-preview">
    <WrapperInner>
      {tiles.map(tile => (
        <TileContainer className="preview-tile" key={tile.position}>
          <Tile tileId={tile.selectedTileId} />
        </TileContainer>
      ))}
    </WrapperInner>
  </Wrapper>
);

LevelPreview.propTypes = {
  tiles: PropTypes.array.isRequired,
};

export default LevelPreview;
