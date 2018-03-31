import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '../common/button';
import { resetGrid, previewLevel, editLevel } from '../../actions/levelEditor';

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
          <Button
            id="btn-preview"
            onClick={() => {
              previewLevelAction();
            }}
          >
            Preview
          </Button>
        </ActionContainer>
        <ActionContainer>
          <Button
            id="btn-reset"
            onClick={() => {
              resetGridAction();
            }}
          >
            Reset
          </Button>
        </ActionContainer>
      </Toolbar>
    )}
    {previewing && (
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
