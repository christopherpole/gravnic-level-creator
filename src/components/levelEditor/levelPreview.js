import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const WrapperInner = styled.div`
  background: white;
  color: black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const LevelPreview = () => (
  <Wrapper id="level-preview">
    <WrapperInner>
      <p>This is a preview</p>
    </WrapperInner>
  </Wrapper>
);

export default LevelPreview;
