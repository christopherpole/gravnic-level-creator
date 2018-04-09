import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '../common/button';
import { editLevel } from '../../actions/levelPreview';

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

export const PreviewToolbar = ({ editLevelAction }) => (
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
    </Toolbar>
  </Wrapper>
);

PreviewToolbar.propTypes = {
  editLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  editLevelAction: bindActionCreators(editLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(PreviewToolbar);
