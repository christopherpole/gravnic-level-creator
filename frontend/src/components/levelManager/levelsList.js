import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SortableContainer } from 'react-sortable-hoc';

import Level from './level';
import { getSortedLevels } from '../../selectors';
import { retrieveLevels, reorderLevels } from '../../actions/levelManager';
import LoadingIcon from '../common/loadingIcon';
import WarningIcon from '../common/warningIcon';

export const Wrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const ScrollableArea = styled.div`
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: absolute;
`;

export const ListWrapper = SortableContainer(styled.ul`
  padding: ${props => props.theme.structureSpacing};
  overflow-y: scroll;
  max-height: 100%;
`);

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
  componentDidMount() {
    this.props.retrieveLevelsAction();
  }

  render() {
    const {
      loading,
      error,
      sortedLevels,
      selectedLevelId,
      currentLevelId,
      renamingLevelId,
      renamingLevelName,
      reorderLevelsAction,
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

    if (!sortedLevels.length) {
      return (
        <Wrapper>
          <NoLevelsContainer>
            <NoLevelsCopy className="no-levels">No levels found</NoLevelsCopy>
          </NoLevelsContainer>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ScrollableArea>
          <ListWrapper
            lockAxis="y"
            helperClass="drag-cursor"
            lockToContainerEdges
            distance={5}
            onSortEnd={({ oldIndex, newIndex }) => {
              reorderLevelsAction(oldIndex, newIndex);
            }}
          >
            {sortedLevels.map((level, index) => (
              <Level
                {...level}
                key={level.id}
                index={index}
                isSelected={selectedLevelId && level.id === selectedLevelId}
                isCurrent={currentLevelId && level.id === currentLevelId}
                renamingValue={
                  renamingLevelId && level.id === renamingLevelId ? renamingLevelName : null
                }
              >
                {level.name}
              </Level>
            ))}
          </ListWrapper>
        </ScrollableArea>
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
  sortedLevels: PropTypes.array.isRequired,
  selectedLevelId: PropTypes.string,
  currentLevelId: PropTypes.string,
  renamingLevelId: PropTypes.string,
  renamingLevelName: PropTypes.string,
  retrieveLevelsAction: PropTypes.func.isRequired,
  reorderLevelsAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.levelManager.loading,
  error: state.levelManager.error,
  selectedLevelId: state.levelManager.selectedLevelId,
  currentLevelId: state.levelManager.currentLevelId,
  renamingLevelId: state.levelManager.renamingLevelId,
  renamingLevelName: state.levelManager.renamingLevelName,
  sortedLevels: getSortedLevels(state),
});

const mapDispatchToProps = dispatch => ({
  retrieveLevelsAction: bindActionCreators(retrieveLevels, dispatch),
  reorderLevelsAction: bindActionCreators(reorderLevels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelsList);
