import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '../common/button';
import { resetGrid } from '../../actions/levelEditor';
import { previewLevel } from '../../actions/levelPreview';

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

export const EditorToolbar = ({ resetGridAction, previewLevelAction }) => (
  <Wrapper id="editor-toolbar">
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
  </Wrapper>
);

EditorToolbar.propTypes = {
  resetGridAction: PropTypes.func.isRequired,
  previewLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  resetGridAction: bindActionCreators(resetGrid, dispatch),
  previewLevelAction: bindActionCreators(previewLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(EditorToolbar);
