import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom right, red, orange, yellow, green, cyan, blue, violet);
`;

const RainbowBlockTile = () => <Wrapper />;

export default RainbowBlockTile;
