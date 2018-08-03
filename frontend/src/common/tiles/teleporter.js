import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #146bf3;

  &:before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    bottom: 20%;
    right: 20%;
    background: #2de9f3;
  }
`;

const TeleporterTile = () => <Wrapper />;

export default TeleporterTile;
