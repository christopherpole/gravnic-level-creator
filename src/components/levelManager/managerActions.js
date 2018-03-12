import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { loadLevel, saveLevel, deleteLevel, copyLevel } from '../../actions/levelManager';

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
  loadLevelAction,
  saveLevelAction,
  deleteLevelAction,
  selectedLevelId,
  copyLevelAction,
}) => (
  <Wrapper>
    <Toolbar>
      <ToolbarAction>
        <Button disabled={!selectedLevelId} onClick={loadLevelAction}>
          Load
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId} onClick={saveLevelAction}>
          Save
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId} onClick={deleteLevelAction}>
          Delete
        </Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button disabled={!selectedLevelId} onClick={copyLevelAction}>
          Copy
        </Button>
      </ToolbarAction>
    </Toolbar>
  </Wrapper>
);

ManagerActions.defaultProps = {
  selectedLevelId: null,
};

ManagerActions.propTypes = {
  loadLevelAction: PropTypes.func.isRequired,
  saveLevelAction: PropTypes.func.isRequired,
  deleteLevelAction: PropTypes.func.isRequired,
  copyLevelAction: PropTypes.func.isRequired,
  selectedLevelId: PropTypes.string,
};

const mapStateToProps = state => ({
  selectedLevelId: state.levelManager.selectedLevelId,
});

const mapDispatchToProps = dispatch => ({
  loadLevelAction: bindActionCreators(loadLevel, dispatch),
  saveLevelAction: bindActionCreators(saveLevel, dispatch),
  deleteLevelAction: bindActionCreators(deleteLevel, dispatch),
  copyLevelAction: bindActionCreators(copyLevel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerActions);
