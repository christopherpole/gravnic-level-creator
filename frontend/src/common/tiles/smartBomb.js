import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: radial-gradient(
    ellipse at center,
    black 0%,
    black 70%,
    #00000000 71%,
    #00000000 100%
  );

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    content: '!';
    font-weight: bold;
    font-size: 20px;
  }
`;

const SmartBombTile = () => <Wrapper />;

export default SmartBombTile;
