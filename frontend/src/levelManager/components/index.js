import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { retrieveLevels } from '../actions';
import LoadingScreen from './loadingScreen';
import ConfirmationScreen from './confirmationScreen';
import ErrorScreen from './errorScreen';
import LevelsList from './levelsList';
import ManagerActions from './managerActions';

export const Wrapper = styled.section`
  border-left: 1px solid ${props => props.theme.foregroundColor};
  display: flex;
  flex-direction: column;
  position: relative;
`;

export class LevelManager extends Component {
  componentDidMount() {
    this.props.retrieveLevelsAction();
  }

  render() {
    const { loaded, loading, error, confirmationMessage } = this.props;

    if (error) {
      return (
        <Wrapper id="level-manager">
          <ErrorScreen />
        </Wrapper>
      );
    }

    if (loading) {
      return (
        <Wrapper id="level-manager">
          <LoadingScreen />
        </Wrapper>
      );
    }

    if (confirmationMessage) {
      return (
        <Wrapper id="level-manager">
          <ConfirmationScreen />
        </Wrapper>
      );
    }

    if (loaded) {
      return (
        <Wrapper id="level-manager">
          <LevelsList />
          <ManagerActions />
        </Wrapper>
      );
    }

    return false;
  }
}

LevelManager.defaultProps = {
  error: null,
  confirmationMessage: null,
};

LevelManager.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  retrieveLevelsAction: PropTypes.func.isRequired,
  confirmationMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  loading: state.levelManager.loading,
  loaded: state.levelManager.loaded,
  error: state.levelManager.error,
  confirmationMessage: state.levelManager.confirmationMessage,
});

const mapDispatchToProps = dispatch => ({
  retrieveLevelsAction: bindActionCreators(retrieveLevels, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelManager);
