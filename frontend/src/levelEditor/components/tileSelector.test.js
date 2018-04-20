import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import { ENTITIES } from 'gravnic-game';

import tiles from 'config/tiles';
import { TileSelector, TileWrapper } from './tileSelector';

configure({ adapter: new Adapter() });

const props = {
  selectTileAction: () => {},
  selectedTileId: null,
};

describe('<TileSelector />', () => {
  it('Renders without exploding', () => {
    const tileSelector = shallow(<TileSelector {...props} />);

    expect(tileSelector).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tileSelector = shallow(<TileSelector {...props} />);

    expect(toJson(tileSelector)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a tile is selected', () => {
    const tileSelector = shallow(<TileSelector {...props} selectedTileId={ENTITIES.BLOCK} />);

    expect(toJson(tileSelector)).toMatchSnapshot();
  });

  it('Fires the select tile action when clicking on a tile', () => {
    const tileClickSpy = spy();
    const tileSelector = shallow(<TileSelector {...props} selectTileAction={tileClickSpy} />);
    const tile = tileSelector.find(TileWrapper).at(2);
    tile.simulate('click');

    expect(tileClickSpy.calledOnce).toBe(true);
    expect(tileClickSpy.calledWith(tiles[2].id)).toBe(true);
  });
});
