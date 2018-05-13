import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import { ENTITIES } from 'gravnic-game';

import { initialState } from '../reducer';
import { LevelEditor, TilesWrapper, TileWrapper } from './index';

configure({ adapter: new Adapter() });

describe('<LevelEditor />', () => {
  let props;

  beforeEach(() => {
    props = {
      selectedTileId: ENTITIES.FLOOR,
      dragging: false,
      tiles: initialState.tiles,
      updateTileAction: () => {},
      startDragAction: () => {},
      stopDragAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const grid = shallow(<LevelEditor {...props} />);

    expect(grid).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const grid = shallow(<LevelEditor {...props} />);

    expect(toJson(grid)).toMatchSnapshot();
  });

  it('Fires the update tile action when clicking on a tile', () => {
    const tileClickSpy = spy();
    const grid = shallow(<LevelEditor {...props} updateTileAction={tileClickSpy} />);
    const tile = grid.find(TileWrapper).at(44);
    tile.simulate('click');

    expect(tileClickSpy.calledOnce).toBe(true);
    expect(tileClickSpy.calledWith(44)).toBe(true);
  });

  it('Fires start dragging action when the user begins to drag on the grid', () => {
    const startDragActionSpy = spy();
    const grid = shallow(<LevelEditor {...props} startDragAction={startDragActionSpy} />);
    const tilesWrapper = grid.find(TilesWrapper);
    tilesWrapper.simulate('mouseDown');

    expect(startDragActionSpy.calledOnce).toBe(true);
  });

  it('Fires stop dragging action when the stops dragging anywhere on the document');

  it(
    'Fires the update tile action if dragging over a tile that is not the same as the selectedtile',
  );

  it(
    'Does not fires the update tile action if dragging over a tile that is the same as the selectedtile',
  );
});
