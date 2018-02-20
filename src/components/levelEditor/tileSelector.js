import React from 'react';
import styled from 'styled-components';

import Tile from '../common/tile';

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

  & > div {
    position: absolute;
    top: .5px;
    left: .5px;
    right: .5px;
    bottom: .5px;
  }
`;

const TileSelector = () => (
  <Wrapper>
    <WrapperInner>
      {[...Array(44)].map((tile, index) => (
        <TileWrapper key={index}>
          <Tile />
        </TileWrapper>
      ))}
    </WrapperInner>
  </Wrapper>
);

export default TileSelector;
