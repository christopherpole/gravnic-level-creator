import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectLevel } from '../../actions/levelManager';
import LevelPreview from './levelPreview';

export const Wrapper = styled.li`
  border: 2px solid #999;
  cursor: pointer;
  list-style-type: none;
  margin-bottom: calc(${props => props.theme.structureSpacing} / 2);
  padding: calc(${props => props.theme.structureSpacing} / 2);
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: calc(${props => props.theme.structureSpacing} / 2);
  align-items: center;
  min-height: 0;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.isCurrent &&
    css`
      border-color: white;
    `};

  ${props =>
    props.isSelected &&
    css`
      border-color: yellow;
    `};
`;

export const Name = styled.p``;

export const Level = ({ id, name, tiles, isSelected, isCurrent, selectLevelAction }) => (
  <Wrapper
    onClick={() => {
      selectLevelAction(id);
    }}
    isSelected={isSelected}
    isCurrent={isCurrent}
  >
    <LevelPreview tiles={tiles} />
    <Name>{name}</Name>
  </Wrapper>
);

Level.defaultProps = {
  isSelected: false,
  isCurrent: false,
};

Level.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tiles: PropTypes.array.isRequired,
  isSelected: PropTypes.bool,
  isCurrent: PropTypes.bool,
  selectLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  selectLevelAction: bindActionCreators(selectLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(Level);
