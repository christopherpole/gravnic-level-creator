import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LinkDisplay } from './linkDisplay';

configure({ adapter: new Adapter() });

describe('<LinkDisplay />', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  it('Renders without exploding', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} />);

    expect(linkDisplay).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} />);

    expect(toJson(linkDisplay)).toMatchSnapshot();
  });

  it('Matches the current snapshot when linking from a tile', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} linkFromTilePos={2} />);

    expect(toJson(linkDisplay)).toMatchSnapshot();
  });
});
