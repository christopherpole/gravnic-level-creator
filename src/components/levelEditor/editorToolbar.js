import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { resetGrid, previewLevel, editLevel } from '../../actions/levelEditor';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  grid-column: 1 / 2;
  padding: calc(${props => props.theme.structureSpacing} / 2);
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

export const ActionButton = styled.button`
  padding: calc(${props => props.theme.structureSpacing} / 4)
    calc(${props => props.theme.structureSpacing} / 2);
  cursor: pointer;
`;

export const EditorToolbar = ({
  previewing,
  resetGridAction,
  previewLevelAction,
  editLevelAction,
}) => (
  <Wrapper id="editor-toolbar">
    {!previewing && (
      <Toolbar>
        <ActionContainer>
          <ActionButton
            id="btn-preview"
            onClick={() => {
              previewLevelAction();
            }}
          >
            Preview
          </ActionButton>
        </ActionContainer>
        <ActionContainer>
          <ActionButton
            id="btn-reset"
            onClick={() => {
              resetGridAction();
            }}
          >
            Reset
          </ActionButton>
        </ActionContainer>
      </Toolbar>
    )}
    {previewing && (
      <Toolbar>
        <ActionContainer>
          <ActionButton
            id="btn-edit"
            onClick={() => {
              editLevelAction();
            }}
          >
            Edit
          </ActionButton>
        </ActionContainer>
      </Toolbar>
    )}
  </Wrapper>
);

EditorToolbar.propTypes = {
  previewing: PropTypes.bool.isRequired,
  resetGridAction: PropTypes.func.isRequired,
  previewLevelAction: PropTypes.func.isRequired,
  editLevelAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  previewing: state.levelEditor.previewing,
});

const mapDispatchToProps = dispatch => ({
  resetGridAction: bindActionCreators(resetGrid, dispatch),
  previewLevelAction: bindActionCreators(previewLevel, dispatch),
  editLevelAction: bindActionCreators(editLevel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar);
