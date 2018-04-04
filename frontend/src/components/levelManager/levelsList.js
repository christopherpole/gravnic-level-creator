import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SortableContainer } from 'react-sortable-hoc';

import Level from './level';
import { getSortedLevels } from '../../selectors';
import { reorderLevels } from '../../actions/levelManager';

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

export const NoLevelsContainer = styled(FullContainer)``;

export const NoLevelsCopy = styled.p``;

export const LevelsList = ({
  sortedLevels,
  selectedLevelId,
  currentLevelId,
  renamingLevelId,
  renamingLevelName,
  reorderLevelsAction,
}) => {
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
};

LevelsList.defaultProps = {
  selectedLevelId: null,
  currentLevelId: null,
  renamingLevelId: null,
  renamingLevelName: null,
};

LevelsList.propTypes = {
  sortedLevels: PropTypes.array.isRequired,
  selectedLevelId: PropTypes.string,
  currentLevelId: PropTypes.string,
  renamingLevelId: PropTypes.string,
  renamingLevelName: PropTypes.string,
  reorderLevelsAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedLevelId: state.levelManager.selectedLevelId,
  currentLevelId: state.levelManager.currentLevelId,
  renamingLevelId: state.levelManager.renamingLevelId,
  renamingLevelName: state.levelManager.renamingLevelName,
  sortedLevels: getSortedLevels(state),
});

const mapDispatchToProps = dispatch => ({
  reorderLevelsAction: bindActionCreators(reorderLevels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelsList);
