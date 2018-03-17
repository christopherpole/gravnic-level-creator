import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LevelsList from './levelsList';
import ManagerActions from './managerActions';

export const Wrapper = styled.section`
  border-left: 1px solid ${props => props.theme.foregroundColor};
  display: flex;
  flex-direction: column;
`;

export const LevelManager = ({ loaded, error }) => (
  <Wrapper>
    <LevelsList />
    {loaded && !error && <ManagerActions />}
  </Wrapper>
);

LevelManager.propTypes = {
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loaded: state.levelManager.loaded,
  error: state.levelManager.error,
});

export default connect(mapStateToProps)(LevelManager);
