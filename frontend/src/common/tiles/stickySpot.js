import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom left,
    #f95de6,
    #ffa4ff,
    #f95de6,
    #ffa4ff,
    #f95de6,
    #ffa4ff,
    #f95de6
  );
`;

const StickySpotTile = () => <Wrapper />;

export default StickySpotTile;
