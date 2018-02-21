import React from 'react';
import styled from 'styled-components';

import Tile from '../common/tile';
import tiles from '../../config/tiles.json';

const Wrapper = styled.div`
  position: relative;
`;

const WrapperInner = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-content: flex-start;
  margin: -1px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TileWrapper = styled.div`
  width: 25%;
  height: 0;
  padding-bottom: 25%;
  position: relative;
`;

const TileSelector = () => (
  <Wrapper>
    <WrapperInner>
      <TileWrapper>
        <Tile id={0} />
      </TileWrapper>

      {tiles.map(tile => (
        <TileWrapper key={tile.id}>
          <Tile id={tile.id} />
        </TileWrapper>
      ))}
    </WrapperInner>
  </Wrapper>
);

export default TileSelector;
