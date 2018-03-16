import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectLevel,
  loadLevel,
  changeRenameLevel,
  finishRenameLevel,
} from '../../actions/levelManager';
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

export const Name = styled.p`
  user-select: none;
`;

export const Input = styled.input`
  width: 100%;
  background: none;
  border: none;
  color: inherit;

  &:focus {
    outline: none;
  }
`;

export class Level extends Component {
  constructor(props) {
    super(props);

    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    //  If started to edit the name
    if (this.props.renamingValue) {
      if (this.nameInput) {
        this.nameInput.focus();
        this.nameInput.select();
      }

      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  componentDidUpdate(prevProps) {
    //  If started to edit the name
    if (!prevProps.renamingValue && this.props.renamingValue !== null) {
      if (this.nameInput) {
        this.nameInput.focus();
        this.nameInput.select();
      }

      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  handleKeydown(event) {
    //  "Enter" key
    if (event.keyCode === 13) {
      this.props.finishRenameLevelAction();
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  render() {
    const {
      id,
      name,
      tiles,
      isSelected,
      isCurrent,
      renamingValue,
      selectLevelAction,
      loadLevelAction,
      changeRenameLevelAction,
    } = this.props;

    return (
      <Wrapper
        onClick={() => {
          selectLevelAction(id);
        }}
        onDoubleClick={() => {
          loadLevelAction();
        }}
        isSelected={isSelected}
        isCurrent={isCurrent}
      >
        <LevelPreview tiles={tiles} />
        {renamingValue !== null ? (
          <Input
            innerRef={input => {
              this.nameInput = input;
            }}
            onChange={event => {
              changeRenameLevelAction(event.target.value);
            }}
            value={renamingValue}
          />
        ) : (
          <Name>{name}</Name>
        )}
      </Wrapper>
    );
  }
}

Level.defaultProps = {
  isSelected: false,
  isCurrent: false,
  renamingValue: null,
};

Level.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tiles: PropTypes.array.isRequired,
  isSelected: PropTypes.bool,
  isCurrent: PropTypes.bool,
  renamingValue: PropTypes.string,
  selectLevelAction: PropTypes.func.isRequired,
  loadLevelAction: PropTypes.func.isRequired,
  changeRenameLevelAction: PropTypes.func.isRequired,
  finishRenameLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  selectLevelAction: bindActionCreators(selectLevel, dispatch),
  loadLevelAction: bindActionCreators(loadLevel, dispatch),
  changeRenameLevelAction: bindActionCreators(changeRenameLevel, dispatch),
  finishRenameLevelAction: bindActionCreators(finishRenameLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(Level);
