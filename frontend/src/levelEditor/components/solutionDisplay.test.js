import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { SolutionDisplay } from './solutionDisplay';

configure({ adapter: new Adapter() });

const props = {};

describe('<SolutionDisplay />', () => {
  it('Renders without exploding', () => {
    const solutionDisplay = shallow(<SolutionDisplay {...props} />);

    expect(solutionDisplay).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const solutionDisplay = shallow(<SolutionDisplay {...props} />);

    expect(toJson(solutionDisplay)).toMatchSnapshot();
  });

  it('Matches the current snapshot when a solution is present', () => {
    const solutionDisplay = shallow(<SolutionDisplay {...props} solution={['UP', 'DOWN']} />);

    expect(toJson(solutionDisplay)).toMatchSnapshot();
  });
});
