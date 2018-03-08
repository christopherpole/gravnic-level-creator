import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { loadLevel, saveLevel, deleteLevel } from '../../actions/levelManager';

export const Wrapper = styled.div`
  border-top: 1px solid white;
  padding: calc(${props => props.theme.structureSpacing} / 2);
`;

export const Toolbar = styled.ul`
  display: flex;
`;

export const ToolbarAction = styled.li`
  list-style-type: none;
  flex-grow: 1;
  margin-right: calc(${props => props.theme.structureSpacing} / 2);

  &:last-child {
    margin-right: 0;
  }
`;

export const Button = styled.button`
  padding: calc(${props => props.theme.structureSpacing} / 4)
    calc(${props => props.theme.structureSpacing} / 2);
  width: 100%;
  cursor: pointer;
`;

export const ManagerActions = ({ loadLevelAction, saveLevelAction, deleteLevelAction }) => (
  <Wrapper>
    <Toolbar>
      <ToolbarAction>
        <Button onClick={loadLevelAction}>Load</Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button onClick={saveLevelAction}>Save</Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button onClick={deleteLevelAction}>Delete</Button>
      </ToolbarAction>
    </Toolbar>
  </Wrapper>
);

ManagerActions.propTypes = {
  loadLevelAction: PropTypes.func.isRequired,
  saveLevelAction: PropTypes.func.isRequired,
  deleteLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadLevelAction: bindActionCreators(loadLevel, dispatch),
  saveLevelAction: bindActionCreators(saveLevel, dispatch),
  deleteLevelAction: bindActionCreators(deleteLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(ManagerActions);
