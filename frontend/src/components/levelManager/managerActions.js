import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  createNewLevel,
  loadLevel,
  saveLevel,
  deleteSelectedLevel,
  copyLevel,
  beginRenameLevel,
  finishRenameLevel,
} from '../../actions/levelManager';
import Button from '../common/button';
import { getLevelManagerButtonDisabledStates } from '../../selectors';

export const Wrapper = styled.div`
  border-top: 1px solid white;
  padding: calc(${props => props.theme.structureSpacing} / 2);
`;

export const Toolbar = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(${props => props.theme.structureSpacing} / 2);
`;

export const ToolbarAction = styled.li`
  list-style-type: none;
  flex-grow: 1;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const ManagerActions = ({
  renamingLevelId,
  createLevelAction,
  loadLevelAction,
  saveLevelAction,
  deleteSelectedLevelAction,
  copyLevelAction,
  beginRenameLevelAction,
  finishRenameLevelAction,
  buttonDisabledStates,
}) => (
  <Wrapper>
    <Toolbar>
      <ToolbarAction>
        <StyledButton
          disabled={buttonDisabledStates.btnNew}
          onClick={createLevelAction}
          id="btn-new"
        >
          <span>New</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton
          disabled={buttonDisabledStates.btnLoad}
          onClick={loadLevelAction}
          id="btn-load"
        >
          <span>Load</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton
          disabled={buttonDisabledStates.btnSave}
          onClick={saveLevelAction}
          id="btn-save"
        >
          <span>Save</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton
          disabled={buttonDisabledStates.btnDelete}
          onClick={deleteSelectedLevelAction}
          id="btn-delete"
        >
          <span>Delete</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton
          disabled={buttonDisabledStates.btnCopy}
          onClick={copyLevelAction}
          id="btn-copy"
        >
          <span>Copy</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        {!renamingLevelId && (
          <StyledButton
            disabled={buttonDisabledStates.btnRename}
            onClick={beginRenameLevelAction}
            id="btn-rename"
          >
            <span>Rename</span>
          </StyledButton>
        )}
        {renamingLevelId && (
          <StyledButton onClick={finishRenameLevelAction} id="btn-done">
            <span>Done</span>
          </StyledButton>
        )}
      </ToolbarAction>
    </Toolbar>
  </Wrapper>
);

ManagerActions.defaultProps = {
  renamingLevelId: null,
};

ManagerActions.propTypes = {
  createLevelAction: PropTypes.func.isRequired,
  loadLevelAction: PropTypes.func.isRequired,
  saveLevelAction: PropTypes.func.isRequired,
  deleteSelectedLevelAction: PropTypes.func.isRequired,
  copyLevelAction: PropTypes.func.isRequired,
  beginRenameLevelAction: PropTypes.func.isRequired,
  finishRenameLevelAction: PropTypes.func.isRequired,
  renamingLevelId: PropTypes.string,
  buttonDisabledStates: PropTypes.shape({
    btnNew: PropTypes.bool.isRequired,
    btnLoad: PropTypes.bool.isRequired,
    btnSave: PropTypes.bool.isRequired,
    btnDelete: PropTypes.bool.isRequired,
    btnCopy: PropTypes.bool.isRequired,
    btnRename: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  renamingLevelId: state.levelManager.renamingLevelId,
  buttonDisabledStates: getLevelManagerButtonDisabledStates(state),
});

const mapDispatchToProps = dispatch => ({
  createLevelAction: bindActionCreators(createNewLevel, dispatch),
  loadLevelAction: bindActionCreators(loadLevel, dispatch),
  saveLevelAction: bindActionCreators(saveLevel, dispatch),
  deleteSelectedLevelAction: bindActionCreators(deleteSelectedLevel, dispatch),
  copyLevelAction: bindActionCreators(copyLevel, dispatch),
  beginRenameLevelAction: bindActionCreators(beginRenameLevel, dispatch),
  finishRenameLevelAction: bindActionCreators(finishRenameLevel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerActions);
