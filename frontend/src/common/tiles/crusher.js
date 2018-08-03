import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: white;

  &:before {
    height: 100%;
    width: 100%;
    content: 'C';
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    border-radius: 100%;
  }
`;

const Crusher = () => <Wrapper />;

export default Crusher;
