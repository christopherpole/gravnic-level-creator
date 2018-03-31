import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { selectTile } from '../../actions/levelEditor';
import Tile from '../common/tile';
import tiles from '../../config/tiles.json';

export const Wrapper = styled.div`
  position: relative;
  grid-row: 1 / 3;
  grid-column: 2 / 3;
`;

export const WrapperInner = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  padding: ${props => props.theme.structureSpacing};
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-content: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const TileWrapper = styled.div`
  width: 25%;
  height: 0;
  padding-bottom: 25%;
  position: relative;
  cursor: pointer;

  ${props =>
    props.isSelected &&
    css`
      &:before {
        border: 2px solid yellow;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        content: '';
        z-index: 2;
      }
    `};
`;

export const TileSelector = ({ selectedTileId, selectTileAction }) => (
  <Wrapper id="tile-selector">
    <WrapperInner>
      {tiles.map(tile => (
        <TileWrapper
          className="tile"
          isSelected={tile.id === selectedTileId}
          onClick={() => {
            selectTileAction(tile.id);
          }}
          key={tile.id}
        >
          <Tile tileId={tile.id} isSelected={tile.id === selectedTileId} />
        </TileWrapper>
      ))}
    </WrapperInner>
  </Wrapper>
);

TileSelector.defaultProps = {
  selectedTileId: null,
};

TileSelector.propTypes = {
  selectedTileId: PropTypes.number,
  selectTileAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedTileId: state.levelEditor.selectedTileId,
});

const mapDispatchToProps = dispatch => ({
  selectTileAction: bindActionCreators(selectTile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TileSelector);
