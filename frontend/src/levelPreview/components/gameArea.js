import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MOVE_LEFT, MOVE_UP, MOVE_RIGHT, MOVE_DOWN } from 'gravnic-game';

import Entity from './entity';
import { makeMove } from '../actions';
import { getEntitiesData } from '../selectors';

export const Wrapper = styled.div``;

export class GameArea extends Component {
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
    const { entitiesData } = this.props;

    return (
      <Wrapper id="tiles-container">
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
      </Wrapper>
    );
  }
}

GameArea.propTypes = {
  entitiesData: PropTypes.object.isRequired,
  makeMoveAction: PropTypes.func.isRequired,
  entitiesMoving: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  entitiesData: getEntitiesData(state),
  entitiesMoving: state.levelPreview.entitiesMoving,
});

const mapDispatchToProps = dispatch => ({
  makeMoveAction: bindActionCreators(makeMove, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
