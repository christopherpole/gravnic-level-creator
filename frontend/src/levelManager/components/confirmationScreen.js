import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'common/button';
import { cancelConfirmation, confirmConfirmation } from '../actions';

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

export const Message = styled.p`
  margin-bottom: 1em;
  font-size: 1.2em;
`;

export const ActionsWrapper = styled.div``;

export const CancelButton = styled(Button)`
  margin-right: 0.5em;
`;

export const ConfirmButton = styled(Button)``;

export const ConfirmationScreen = ({
  message,
  cancelConfirmationAction,
  confirmConfirmationAction,
}) => (
  <Wrapper id="confirmation-screen">
    <Message>{message}</Message>
    <ActionsWrapper>
      <CancelButton id="btn-cancel" onClick={cancelConfirmationAction}>
        Cancel
      </CancelButton>
      <ConfirmButton id="btn-confirm" onClick={confirmConfirmationAction}>
        Confirm
      </ConfirmButton>
    </ActionsWrapper>
  </Wrapper>
);

ConfirmationScreen.propTypes = {
  message: PropTypes.string.isRequired,
  cancelConfirmationAction: PropTypes.func.isRequired,
  confirmConfirmationAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  message: state.levelManager.confirmationMessage,
});

const mapDispatchToProps = dispatch => ({
  cancelConfirmationAction: bindActionCreators(cancelConfirmation, dispatch),
  confirmConfirmationAction: bindActionCreators(confirmConfirmation, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationScreen);
