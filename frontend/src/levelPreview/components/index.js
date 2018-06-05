import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MOVE_LEFT, MOVE_UP, MOVE_RIGHT, MOVE_DOWN } from 'gravnic-game';

import Entity from './entity';
import { makeMove } from '../actions';
import { getEntitiesData } from '../selectors';

export const Wrapper = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const LevelCompleteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2em;
  z-index: 1;
`;

export const EntitiesWrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export class LevelPreview extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (this.props.entitiesMoving) return;

    switch (event.keyCode) {
      case 37:
        this.props.makeMoveAction(MOVE_LEFT);
        break;
      case 38:
        this.props.makeMoveAction(MOVE_UP);
        break;
      case 39:
        this.props.makeMoveAction(MOVE_RIGHT);
        break;
      case 40:
        this.props.makeMoveAction(MOVE_DOWN);
        break;
      default:
    }
  }

  render() {
    const { entitiesData, levelComplete } = this.props;

    return (
      <Wrapper id="level-preview">
        <EntitiesWrapper>
          {Object.keys(entitiesData).map(key => (
            <Entity
              xPos={entitiesData[key].xPos}
              yPos={entitiesData[key].yPos}
              fading={entitiesData[key].fading}
              key={key}
              entityId={entitiesData[key].entityId}
              isMovableEntity={entitiesData[key].isMovableEntity}
            />
          ))}
        </EntitiesWrapper>

        {levelComplete && (
          <LevelCompleteOverlay id="level-complete-overlay">
            <p>Level Complete!</p>
          </LevelCompleteOverlay>
        )}
      </Wrapper>
    );
  }
}

LevelPreview.propTypes = {
  entitiesData: PropTypes.object.isRequired,
  makeMoveAction: PropTypes.func.isRequired,
  entitiesMoving: PropTypes.bool.isRequired,
  levelComplete: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  entitiesData: getEntitiesData(state),
  entitiesMoving: state.levelPreview.entitiesMoving,
  levelComplete: state.levelPreview.levelComplete,
});

const mapDispatchToProps = dispatch => ({
  makeMoveAction: bindActionCreators(makeMove, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelPreview);
