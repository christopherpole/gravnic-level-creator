import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Level from './level';

export const Wrapper = styled.ul`
  padding: ${props => props.theme.structureSpacing};
  flex-grow: 1;
`;

const LevelsList = ({ levels, selectedLevelId, currentLevelId }) => (
  <Wrapper>
    {levels.map(level => (
      <Level
        {...level}
        key={level.id}
        isSelected={selectedLevelId && level.id === selectedLevelId}
        isCurrent={currentLevelId && level.id === currentLevelId}
      >
        {level.name}
      </Level>
    ))}
  </Wrapper>
);

LevelsList.defaultProps = {
  selectedLevelId: null,
  currentLevelId: null,
};

LevelsList.propTypes = {
  levels: PropTypes.array.isRequired,
  selectedLevelId: PropTypes.number,
  currentLevelId: PropTypes.number,
};

const mapStateToProps = state => ({
  selectedLevelId: state.levelManager.selectedLevelId,
  currentLevelId: state.levelManager.currentLevelId,
  levels: state.levelManager.levels,
});

export default connect(mapStateToProps)(LevelsList);
