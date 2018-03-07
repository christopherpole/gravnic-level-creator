import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { loadLevel } from '../../actions/levelManager';

export const Wrapper = styled.div`
  border-top: 1px solid white;
  padding: ${props => props.theme.structureSpacing};
`;

export const Toolbar = styled.ul`
  display: flex;
`;

export const ToolbarAction = styled.li`
  list-style-type: none;
  flex-grow: 1;
  margin-right: 0.5em;

  &:last-child {
    margin-right: 0;
  }
`;

export const Button = styled.button`
  padding: 0.25em 0.5em;
  width: 100%;
  cursor: pointer;
`;

export const ManagerActions = ({ loadLevelAction }) => (
  <Wrapper>
    <Toolbar>
      <ToolbarAction>
        <Button onClick={loadLevelAction}>Load</Button>
      </ToolbarAction>
      <ToolbarAction>
        <Button>Save</Button>
      </ToolbarAction>
    </Toolbar>
  </Wrapper>
);

ManagerActions.propTypes = {
  loadLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadLevelAction: bindActionCreators(loadLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(ManagerActions);
