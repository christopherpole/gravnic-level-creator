import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LinkDisplay } from './linkDisplay';

configure({ adapter: new Adapter() });

describe('<LinkDisplay />', () => {
  let props;

  beforeEach(() => {
    props = {
      formattedLinks: [
        { x1: '10%', y1: '10%', x2: '20%', y2: '20%' },
        { x1: '20%', y1: '30%', x2: '40%', y2: '50%' },
      ],
      linkingMode: false,
    };
  });

  it('Renders without exploding', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} />);

    expect(linkDisplay).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} />);

    expect(toJson(linkDisplay)).toMatchSnapshot();
  });

  it('Matches the current snapshot without links', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} formattedLinks={[]} />);

    expect(toJson(linkDisplay)).toMatchSnapshot();
  });

  it('Matches the current snapshot when linking', () => {
    const linkDisplay = shallow(<LinkDisplay {...props} linkingMode />);

    expect(toJson(linkDisplay)).toMatchSnapshot();
  });
});
