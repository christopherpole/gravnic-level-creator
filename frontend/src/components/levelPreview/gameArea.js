import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Entity from './entity';
import { GRID_SIZE } from '../../config/settings';

export const Wrapper = styled.div``;

export const GameArea = ({ gameState }) => (
  <Wrapper>
    {gameState.map((gameStateRow, i) =>
      gameStateRow.map((entityId, j) => (
        <Entity
          xPos={j * (100 / GRID_SIZE)}
          yPos={i * (100 / GRID_SIZE)}
          key={i + j}
          entityId={entityId}
        />
      )),
    )}
  </Wrapper>
);

GameArea.propTypes = {
  gameState: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  gameState: state.levelPreview.gameState,
});

export default connect(mapStateToProps)(GameArea);
