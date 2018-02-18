import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid green;
  height: 0;
  padding: ${props => props.theme.structureSpacing};
  padding-bottom: 100%;
`;

const Grid = () => (
  <Wrapper>
    <p>Grid goes here</p>
  </Wrapper>
);

export default Grid;
