import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Level from './level';
import { retrieveLevels } from '../../actions/levelManager';
import LoadingIcon from '../common/loadingIcon';
import WarningIcon from '../common/warningIcon';

export const Wrapper = styled.ul`
  padding: ${props => props.theme.structureSpacing};
  flex-grow: 1;
  position: relative;
`;

export const FullContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: ${props => props.theme.structureSpacing};
  left: ${props => props.theme.structureSpacing};
  bottom: ${props => props.theme.structureSpacing};
  right: ${props => props.theme.structureSpacing};
`;

export const LoadingContainer = styled(FullContainer)``;

export const ErrorContainer = styled(FullContainer)``;

export const NoLevelsContainer = styled(FullContainer)``;

export const NoLevelsCopy = styled.p``;

export const ErrorMessage = styled.p`
  margin-top: calc(${props => props.theme.structureSpacing} / 2);
`;

export class LevelsList extends Component {
  componentWillMount() {
    this.props.retrieveLevelsAction();
  }

  render() {
    const {
      loading,
      error,
      levels,
      selectedLevelId,
      currentLevelId,
      renamingLevelId,
      renamingLevelName,
    } = this.props;

    if (loading) {
      return (
        <Wrapper>
          <LoadingContainer>
            <LoadingIcon />
          </LoadingContainer>
        </Wrapper>
      );
    }

    if (error) {
      return (
        <Wrapper>
          <ErrorContainer>
            <WarningIcon />
            <ErrorMessage>There was a problem communicating with the server</ErrorMessage>
          </ErrorContainer>
        </Wrapper>
      );
    }

    if (!levels.length) {
      return (
        <Wrapper>
          <NoLevelsContainer>
            <NoLevelsCopy>No levels found</NoLevelsCopy>
          </NoLevelsContainer>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        {levels.map(level => (
          <Level
            {...level}
            key={level.id}
            isSelected={selectedLevelId && level.id === selectedLevelId}
            isCurrent={currentLevelId && level.id === currentLevelId}
            renamingValue={
              renamingLevelId && level.id === renamingLevelId ? renamingLevelName : null
            }
          >
            {level.name}
          </Level>
        ))}
      </Wrapper>
    );
  }
}

LevelsList.defaultProps = {
  selectedLevelId: null,
  currentLevelId: null,
  renamingLevelId: null,
  renamingLevelName: null,
};

LevelsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  levels: PropTypes.array.isRequired,
  selectedLevelId: PropTypes.string,
  currentLevelId: PropTypes.string,
  renamingLevelId: PropTypes.string,
  renamingLevelName: PropTypes.string,
  retrieveLevels: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.levelManager.loading,
  error: state.levelManager.error,
  selectedLevelId: state.levelManager.selectedLevelId,
  currentLevelId: state.levelManager.currentLevelId,
  renamingLevelId: state.levelManager.renamingLevelId,
  renamingLevelName: state.levelManager.renamingLevelName,
  levels: state.levelManager.levels,
});

const mapDispatchToProps = dispatch => ({
  retrieveLevelsAction: bindActionCreators(retrieveLevels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelsList);
