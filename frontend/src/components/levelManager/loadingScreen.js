import React from 'react';
import styled from 'styled-components';

import LoadingIcon from '../common/loadingIcon';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: ${props => props.theme.structureSpacing};
  left: ${props => props.theme.structureSpacing};
  bottom: ${props => props.theme.structureSpacing};
  right: ${props => props.theme.structureSpacing};
`;

export const LoadingScreen = () => (
  <Wrapper>
    <LoadingIcon />
  </Wrapper>
);

export default LoadingScreen;
