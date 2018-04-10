import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '../common/button';
import { editLevel, restartLevel, undoMove } from '../../actions/levelPreview';

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

export const PreviewToolbar = ({
  editLevelAction,
  restartLevelAction,
  undoMoveAction,
  gameHistory,
}) => (
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
      <ActionContainer>
        <Button
          id="btn-restart"
          onClick={() => {
            restartLevelAction();
          }}
        >
          Restart
        </Button>
      </ActionContainer>
      <ActionContainer>
        <Button
          disabled={gameHistory.length <= 1}
          id="btn-undo"
          onClick={() => {
            undoMoveAction();
          }}
        >
          Undo
        </Button>
      </ActionContainer>
    </Toolbar>
  </Wrapper>
);

PreviewToolbar.propTypes = {
  editLevelAction: PropTypes.func.isRequired,
  restartLevelAction: PropTypes.func.isRequired,
  undoMoveAction: PropTypes.func.isRequired,
  gameHistory: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  gameHistory: state.levelPreview.gameHistory,
});

const mapDispatchToProps = dispatch => ({
  editLevelAction: bindActionCreators(editLevel, dispatch),
  restartLevelAction: bindActionCreators(restartLevel, dispatch),
  undoMoveAction: bindActionCreators(undoMove, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewToolbar);
