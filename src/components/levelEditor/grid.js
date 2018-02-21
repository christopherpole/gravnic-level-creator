import React from 'react';
import styled from 'styled-components';

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


const Grid = () => (
  <Wrapper>
    <TilesWrapper>
      {[...Array(Grid.SIZE * Grid.SIZE)].map((tile, index) => (
        <TileWrapper key={index} >
          <Tile />
        </TileWrapper>
      ))}
    </TilesWrapper>
  </Wrapper>
);

Grid.SIZE = 10;

export default Grid;
