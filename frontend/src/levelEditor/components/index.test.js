import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import availableTiles from 'config/tiles';

import { initialState } from '../reducer';
import { LevelEditor, TileWrapper } from './index';

configure({ adapter: new Adapter() });

describe('<LevelEditor />', () => {
  let props;

  beforeEach(() => {
    props = {
      tiles: initialState.tiles,
      updateTileAction: () => {},
      startDragAction: () => {},
      stopDragAction: () => {},
      mouseoverTileAction: () => {},
      linkFromTilePos: null,
      availableTiles,
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

  it('Matches the current snapshot when linking tiles', () => {
    const grid = shallow(<LevelEditor {...props} linkFromTilePos={2} />);

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

  it('Fires the mouseover tile action when mousing over a tile', () => {
    const mouseoverTileSpy = spy();
    const grid = shallow(<LevelEditor {...props} mouseoverTileAction={mouseoverTileSpy} />);
    const tile = grid.find(TileWrapper).at(44);
    tile.simulate('mousemove');

    expect(mouseoverTileSpy.calledOnce).toBe(true);
    expect(mouseoverTileSpy.calledWith(44)).toBe(true);
  });

  it('Fires start dragging action when the user begins and finishes dragging on a non-linked tile', () => {
    const startDragActionSpy = spy();
    const stopDragActionSpy = spy();
    const grid = shallow(
      <LevelEditor
        {...props}
        stopDragAction={stopDragActionSpy}
        startDragAction={startDragActionSpy}
      />,
    );
    const tilesWrapper = grid.find(TileWrapper).at(2);

    //  Start dragging
    expect(startDragActionSpy.calledOnce).toBe(false);
    tilesWrapper.simulate('mouseDown');
    expect(startDragActionSpy.calledOnce).toBe(true);
    expect(startDragActionSpy.calledWith(2)).toBe(true);
  });
});
