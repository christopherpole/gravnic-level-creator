import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Button from 'common/button';
import { previewLevel } from 'levelPreview/actions';
import { solveLevel, cancelSolveLevel } from 'levelSolver/actions';
import { resetGrid } from '../actions';
import {
  getLevelEditorButtonDisabledStates,
  convertTileDataToGravnicGameStateString,
} from '../selectors';

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
  resetGridAction,
  previewLevelAction,
  solveLevelAction,
  cancelSolveLevelAction,
  buttonDisabledStates,
  gameStateString,
  solving,
}) => (
  <Wrapper id="editor-toolbar">
    <Toolbar>
      <ActionContainer>
        <Button
          id="btn-preview"
          onClick={previewLevelAction}
          disabled={buttonDisabledStates.btnPreview}
        >
          Preview
        </Button>
      </ActionContainer>
      <ActionContainer>
        <Button id="btn-reset" onClick={resetGridAction} disabled={buttonDisabledStates.btnReset}>
          Reset
        </Button>
      </ActionContainer>
      {!solving && (
        <ActionContainer>
          <Button
            id="btn-solve"
            onClick={solveLevelAction}
            disabled={buttonDisabledStates.btnSolve}
          >
            Solve
          </Button>
        </ActionContainer>
      )}
      {solving && (
        <ActionContainer>
          <Button id="btn-cancel-solve" onClick={cancelSolveLevelAction}>
            Cancel
          </Button>
        </ActionContainer>
      )}
      <ActionContainer>
        <CopyToClipboard text={gameStateString}>
          <Button id="btn-export" disabled={buttonDisabledStates.btnExport}>
            Export
          </Button>
        </CopyToClipboard>
      </ActionContainer>
    </Toolbar>
  </Wrapper>
);

EditorToolbar.defaultProps = {
  gameStateString: null,
};

EditorToolbar.propTypes = {
  resetGridAction: PropTypes.func.isRequired,
  previewLevelAction: PropTypes.func.isRequired,
  solveLevelAction: PropTypes.func.isRequired,
  cancelSolveLevelAction: PropTypes.func.isRequired,
  buttonDisabledStates: PropTypes.object.isRequired,
  gameStateString: PropTypes.string,
  solving: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  buttonDisabledStates: getLevelEditorButtonDisabledStates(state),
  gameStateString: convertTileDataToGravnicGameStateString(state),
  solving: state.levelSolver.loading,
});

const mapDispatchToProps = dispatch => ({
  resetGridAction: bindActionCreators(resetGrid, dispatch),
  previewLevelAction: bindActionCreators(previewLevel, dispatch),
  solveLevelAction: bindActionCreators(solveLevel, dispatch),
  cancelSolveLevelAction: bindActionCreators(cancelSolveLevel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar);
