import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${props => props.theme.backgroundColor};
`;

const BlankTile = () => <Wrapper />;

export default BlankTile;
