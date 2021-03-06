import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WarningIcon from 'common/icons/warningIcon';
import Button from 'common/button';
import { retrieveLevels } from '../actions';

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

export const ReloadButton = styled(Button)``;

export const ErrorMessage = styled.p`
  margin: calc(${props => props.theme.structureSpacing} / 1) 0
    ${props => props.theme.structureSpacing};
`;

export const ErrorScreen = ({ retrieveLevelsAction }) => (
  <Wrapper id="error-screen">
    <WarningIcon size={50} />
    <ErrorMessage>There was a problem communicating with the server</ErrorMessage>
    <ReloadButton id="btn-reload" onClick={retrieveLevelsAction}>
      Reload
    </ReloadButton>
  </Wrapper>
);

ErrorScreen.propTypes = {
  retrieveLevelsAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.levelManager.loading,
});

const mapDispatchToProps = dispatch => ({
  retrieveLevelsAction: bindActionCreators(retrieveLevels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorScreen);
