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
  selectedLevelId,
  renamingLevelId,
  createLevelAction,
  loadLevelAction,
  saveLevelAction,
  deleteSelectedLevelAction,
  copyLevelAction,
  beginRenameLevelAction,
  finishRenameLevelAction,
}) => (
  <Wrapper>
    <Toolbar>
      <ToolbarAction>
        <StyledButton disabled={renamingLevelId} onClick={createLevelAction}>
          <span>New</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton disabled={!selectedLevelId || renamingLevelId} onClick={loadLevelAction}>
          <span>Load</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton disabled={!selectedLevelId || renamingLevelId} onClick={saveLevelAction}>
          <span>Save</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton
          disabled={!selectedLevelId || renamingLevelId}
          onClick={deleteSelectedLevelAction}
        >
          <span>Delete</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        <StyledButton disabled={!selectedLevelId || renamingLevelId} onClick={copyLevelAction}>
          <span>Copy</span>
        </StyledButton>
      </ToolbarAction>
      <ToolbarAction>
        {!renamingLevelId && (
          <StyledButton disabled={!selectedLevelId} onClick={beginRenameLevelAction}>
            <span>Rename</span>
          </StyledButton>
        )}
        {renamingLevelId && (
          <StyledButton onClick={finishRenameLevelAction}>
            <span>Done</span>
          </StyledButton>
        )}
      </ToolbarAction>
    </Toolbar>
  </Wrapper>
);

ManagerActions.defaultProps = {
  selectedLevelId: null,
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
  selectedLevelId: PropTypes.string,
  renamingLevelId: PropTypes.string,
};

const mapStateToProps = state => ({
  selectedLevelId: state.levelManager.selectedLevelId,
  renamingLevelId: state.levelManager.renamingLevelId,
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
