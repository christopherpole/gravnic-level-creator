import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SortableElement } from 'react-sortable-hoc';

import StarIcon from 'common/icons/starIcon';
import { selectLevel, loadLevel, changeRenameLevel, finishRenameLevel } from '../actions';
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
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.foregroundColor}; //  Hard-coded for reordering functionality
  font-family: ${props => props.theme.fontFamily}; //  Hard-coded for reordering functionality

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

export const NameWrapper = styled.div`
  margin-bottom: 0.2em;
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

export const StarsList = styled.ul`
  display: flex;
`;

export const StarListItem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-right: 0.8em;
`;

export const Star = styled(StarIcon)``;

export const StarsLabel = styled.span`
  margin-left: 0.3em;
  user-select: none;
`;

export class Level extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentKeydown = this.handleDocumentKeydown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    //  If started to edit the name
    if (this.props.renamingValue) {
      this.beginRename();
    }
  }

  componentDidUpdate(prevProps) {
    //  If started to edit the name
    if (!prevProps.renamingValue && this.props.renamingValue !== null) {
      this.beginRename();
    } else if (prevProps.renamingValue && this.props.renamingValue === null) {
      document.removeEventListener('keydown', this.handleDocumentKeydown);
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeydown);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  beginRename() {
    if (this.nameInput) {
      this.nameInput.focus();
      this.nameInput.select();
    }

    document.addEventListener('keydown', this.handleDocumentKeydown);
    document.addEventListener('click', this.handleDocumentClick);
  }

  handleDocumentKeydown(event) {
    //  "Enter" key
    if (event.keyCode === 13) {
      this.props.finishRenameLevelAction();
    }
  }

  handleDocumentClick() {
    this.props.finishRenameLevelAction();
  }

  render() {
    const {
      id,
      name,
      tiles,
      stars,
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
        className="level"
      >
        <LevelPreview tiles={tiles} />

        <div>
          <NameWrapper>
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
          </NameWrapper>

          <StarsList className="stars-list">
            <StarListItem>
              <Star />
              <Star />
              <Star />
              <StarsLabel>{stars[0]}</StarsLabel>
            </StarListItem>
            <StarListItem>
              <Star />
              <Star />
              <StarsLabel>{stars[1]}</StarsLabel>
            </StarListItem>
            <StarListItem>
              <Star />
              <StarsLabel>{stars[2]}</StarsLabel>
            </StarListItem>
          </StarsList>
        </div>
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
  stars: PropTypes.array.isRequired,
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

export default SortableElement(connect(null, mapDispatchToProps)(Level));
