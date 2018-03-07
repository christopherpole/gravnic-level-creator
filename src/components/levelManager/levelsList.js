import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Level from './level';

export const Wrapper = styled.ul``;

const LevelsList = ({ levels, selectedLevelId }) => (
  <Wrapper>
    {levels.map(level => (
      <Level {...level} key={level.id} isSelected={selectedLevelId && level.id === selectedLevelId}>
        {level.name}
      </Level>
    ))}
  </Wrapper>
);

LevelsList.defaultProps = {
  selectedLevelId: null,
};

LevelsList.propTypes = {
  levels: PropTypes.array.isRequired,
  selectedLevelId: PropTypes.number,
};

const mapStateToProps = state => ({
  selectedLevelId: state.levelManager.selectedLevelId,
  levels: state.levelManager.levels,
});

export default connect(mapStateToProps)(LevelsList);
