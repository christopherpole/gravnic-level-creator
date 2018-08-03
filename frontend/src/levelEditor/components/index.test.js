import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { LevelEditor, TileWrapper } from './index';

configure({ adapter: new Adapter() });

describe('<LevelEditor />', () => {
  let props;

  beforeEach(() => {
    props = {
      tilesWithDarkenedStates: [
        { selectedTileId: '1', position: 0, darkened: false },
        { selectedTileId: '1', position: 1, darkened: false },
        { selectedTileId: '2', position: 2, darkened: false },
      ],
      updateTileAction: () => {},
      startDragAction: () => {},
      stopDragAction: () => {},
      mouseoverTileAction: () => {},
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

  it('Matches the current snapshot with darkened tiles', () => {
    const grid = shallow(
      <LevelEditor
        {...props}
        tilesWithDarkenedStates={[
          ...props.tilesWithDarkenedStates,
          { selectedTileId: '4', position: 3, darkened: true },
        ]}
      />,
    );

    expect(toJson(grid)).toMatchSnapshot();
  });

  it('Fires the update tile action when clicking on a tile', () => {
    const tileClickSpy = spy();
    const grid = shallow(<LevelEditor {...props} updateTileAction={tileClickSpy} />);
    const tile = grid.find(TileWrapper).at(2);
    tile.simulate('click');

    expect(tileClickSpy.calledOnce).toBe(true);
    expect(tileClickSpy.calledWith(2)).toBe(true);
  });

  it('Fires the mouseover tile action when mousing over a tile', () => {
    const mouseoverTileSpy = spy();
    const grid = shallow(<LevelEditor {...props} mouseoverTileAction={mouseoverTileSpy} />);
    const tile = grid.find(TileWrapper).at(2);
    tile.simulate('mousemove');

    expect(mouseoverTileSpy.calledOnce).toBe(true);
    expect(mouseoverTileSpy.calledWith(2)).toBe(true);
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
