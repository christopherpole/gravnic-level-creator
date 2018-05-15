import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from 'common/button';
import { editLevel, restartLevel, undoMove, setFastMode } from '../actions';
import { getLevelPreviewButtonDisabledStates } from '../selectors';

export const Wrapper = styled.div`
  grid-column: 1 / 2;
  margin-top: ${props => props.theme.structureSpacing};
`;

export const Toolbar = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
`;

export const ActionContainer = styled.li`
  list-style-type: none;
  margin-right: calc(${props => props.theme.structureSpacing} / 2);

  &:last-child {
    margin-right: 0;
  }
`;

export const PreviewToolbar = ({
  editLevelAction,
  restartLevelAction,
  undoMoveAction,
  setFastModeAction,
  buttonDisabledStates,
  fastMode,
}) => (
  <Wrapper id="editor-toolbar">
    <Toolbar>
      <ActionContainer>
        <Button
          id="btn-edit"
          onClick={() => {
            editLevelAction();
          }}
        >
          Edit
        </Button>
      </ActionContainer>
      <ActionContainer>
        <Button
          disabled={buttonDisabledStates.btnRestart}
          id="btn-restart"
          onClick={() => {
            restartLevelAction();
          }}
        >
          Restart
        </Button>
      </ActionContainer>
      <ActionContainer>
        <Button
          disabled={buttonDisabledStates.btnUndo}
          id="btn-undo"
          onClick={() => {
            undoMoveAction();
          }}
        >
          Undo
        </Button>
      </ActionContainer>
      <ActionContainer>
        <Button
          id="btn-set-fast-mode"
          onClick={() => {
            setFastModeAction(!fastMode);
          }}
        >
          Speed: {fastMode ? 'FAST' : 'NORMAL'}
        </Button>
      </ActionContainer>
    </Toolbar>
  </Wrapper>
);

PreviewToolbar.propTypes = {
  editLevelAction: PropTypes.func.isRequired,
  restartLevelAction: PropTypes.func.isRequired,
  undoMoveAction: PropTypes.func.isRequired,
  buttonDisabledStates: PropTypes.object.isRequired,
  setFastModeAction: PropTypes.func.isRequired,
  fastMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  fastMode: state.levelPreview.fastMode,
  buttonDisabledStates: getLevelPreviewButtonDisabledStates(state),
});

const mapDispatchToProps = dispatch => ({
  editLevelAction: bindActionCreators(editLevel, dispatch),
  restartLevelAction: bindActionCreators(restartLevel, dispatch),
  undoMoveAction: bindActionCreators(undoMove, dispatch),
  setFastModeAction: bindActionCreators(setFastMode, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewToolbar);
