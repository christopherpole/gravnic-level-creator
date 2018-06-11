import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from 'common/button';
import { editLevel } from 'levelPreview/actions';
import { findQuickestSolution } from '../actions';

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

export const SolverToolbar = ({ editLevelAction, findQuickestSolutionAction, loading }) => (
  <Wrapper id="solver-toolbar">
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
          id="btn-find-quickest-solution"
          onClick={() => {
            findQuickestSolutionAction();
          }}
          disabled={loading}
        >
          Find Quickest Solution
        </Button>
      </ActionContainer>
    </Toolbar>
  </Wrapper>
);

SolverToolbar.propTypes = {
  editLevelAction: PropTypes.func.isRequired,
  findQuickestSolutionAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.levelSolver.loading,
});

const mapDispatchToProps = dispatch => ({
  editLevelAction: bindActionCreators(editLevel, dispatch),
  findQuickestSolutionAction: bindActionCreators(findQuickestSolution, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SolverToolbar);
