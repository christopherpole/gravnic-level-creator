import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { Grid, TileWrapper } from './grid';
import { initialState } from '../../reducers/levelEditor';

configure({ adapter: new Adapter() });

describe('The editor grid', () => {
  let props;

  beforeEach(() => {
    props = {
      tiles: initialState.tiles,
      updateTileAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const grid = shallow(<Grid {...props} />);

    expect(grid).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const grid = shallow(<Grid {...props} />);

    expect(toJson(grid)).toMatchSnapshot();
  });

  it('Fires the update tile action when clicking on a tile', () => {
    const tileClickSpy = spy();
    const tileSelector = shallow(<Grid {...props} updateTileAction={tileClickSpy} />);
    const tile = tileSelector.find(TileWrapper).at(44);
    tile.simulate('click');

    expect(tileClickSpy.calledOnce).toBe(true);
    expect(tileClickSpy.calledWith(44)).toBe(true);
  });
});
