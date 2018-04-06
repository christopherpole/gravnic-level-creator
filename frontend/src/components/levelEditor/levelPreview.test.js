import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LevelPreview } from './levelPreview';

configure({ adapter: new Adapter() });

describe('The tile selector', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  it('Renders without exploding', () => {
    const levelPreview = shallow(<LevelPreview {...props} />);

    expect(levelPreview).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelPreview = shallow(<LevelPreview {...props} />);

    expect(toJson(levelPreview)).toMatchSnapshot();
  });
});
