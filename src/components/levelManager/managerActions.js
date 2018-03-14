import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  createLevel,
  loadLevel,
  saveLevel,
  deleteLevel,
  copyLevel,
  beginRenameLevel,
  finishRenameLevel,
} from '../../actions/levelManager';

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

export const Button = styled.button`
  padding: calc(${props => props.theme.structureSpacing} / 4)
    calc(${props => props.theme.structureSpacing} / 2);
  width: 100%;
  cursor: pointer;
`;

export const ManagerActions = ({
  selectedLevelId,
  renamingLevelId,
  createLevelAction,
  loadLevelAction,
  saveLevelAction,
  deleteLevelAction,
  copyLevelAction,
  beginRenameLevelAction,
  finishRenameLevelAction,
}) => (
  <Wrapper>
    <Toolbar>
      <ToolbarAction>
        <Button disabled={renamingLevelId} onClick={createLevelAction}>
          <span>New</span>
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId || renamingLevelId} onClick={loadLevelAction}>
          <span>Load</span>
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId || renamingLevelId} onClick={saveLevelAction}>
          <span>Save</span>
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId || renamingLevelId} onClick={deleteLevelAction}>
          <span>Delete</span>
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId || renamingLevelId} onClick={copyLevelAction}>
          <span>Copy</span>
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        {!renamingLevelId && (
          <Button disabled={!selectedLevelId} onClick={beginRenameLevelAction}>
            <span>Rename</span>
          </Button>
        )}
        {renamingLevelId && (
          <Button onClick={finishRenameLevelAction}>
            <span>Done</span>
          </Button>
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
  deleteLevelAction: PropTypes.func.isRequired,
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
  createLevelAction: bindActionCreators(createLevel, dispatch),
  loadLevelAction: bindActionCreators(loadLevel, dispatch),
  saveLevelAction: bindActionCreators(saveLevel, dispatch),
  deleteLevelAction: bindActionCreators(deleteLevel, dispatch),
  copyLevelAction: bindActionCreators(copyLevel, dispatch),
  beginRenameLevelAction: bindActionCreators(beginRenameLevel, dispatch),
  finishRenameLevelAction: bindActionCreators(finishRenameLevel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerActions);
