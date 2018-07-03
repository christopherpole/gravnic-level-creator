import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: radial-gradient(
    ellipse at center,
    #ffb76b 0%,
    #ffa73d 50%,
    #ff7c00 51%,
    #ff7f04 100%
  );
`;

const LavaTile = () => <Wrapper />;

export default LavaTile;
