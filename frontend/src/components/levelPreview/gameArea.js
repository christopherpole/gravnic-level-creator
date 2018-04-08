import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MOVE_LEFT, MOVE_UP, MOVE_RIGHT, MOVE_DOWN } from 'gravnic-game';

import Entity from './entity';
import { makeMove } from '../../actions/levelPreview';
import { getEntitiesData } from '../../selectors';

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
      <Wrapper>
        {Object.keys(entitiesData).map(key => (
          <Entity
            xPos={entitiesData[key].xPos}
            yPos={entitiesData[key].yPos}
            key={key}
            id={key}
            entityId={entitiesData[key].entityId}
          />
        ))}
      </Wrapper>
    );
  }
}

GameArea.propTypes = {
  entitiesData: PropTypes.array.isRequired,
  makeMoveAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entitiesData: getEntitiesData(state),
});

const mapDispatchToProps = dispatch => ({
  makeMoveAction: bindActionCreators(makeMove, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
