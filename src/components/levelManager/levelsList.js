import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Level from './level';
import { retrieveLevels } from '../../actions/levelManager';
import LoadingIcon from '../common/loadingIcon';

export const Wrapper = styled.ul`
  padding: ${props => props.theme.structureSpacing};
  flex-grow: 1;
  position: relative;
`;

export class LevelsList extends Component {
  componentWillMount() {
    this.props.retrieveLevels();
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
          <LoadingIcon />
        </Wrapper>
      );
    }

    if (error) {
      return <Wrapper>Error</Wrapper>;
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
  error: null,
};

LevelsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
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
  retrieveLevels: bindActionCreators(retrieveLevels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelsList);
