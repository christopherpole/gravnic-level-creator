import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import BlockTile from './block';

configure({ adapter: new Adapter() });

describe('<BlockTile />', () => {
  let props;

  beforeEach(() => {
    props = {
      color: '#ff0000',
    };
  });

  it('Renders without exploding', () => {
    const blockTile = shallow(<BlockTile {...props} />);

    expect(blockTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const blockTile = shallow(<BlockTile {...props} />);
    expect(toJson(blockTile)).toMatchSnapshot();
  });
});
