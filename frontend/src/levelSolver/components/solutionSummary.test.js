import React from 'react';
import { MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } from 'gravnic-game';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { SolutionSummary } from './solutionSummary';

configure({ adapter: new Adapter() });

describe('<SolutionSummary />', () => {
  let props;

  beforeEach(() => {
    props = {
      solution: [MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT],
    };
  });

  it('Renders without exploding', () => {
    const solutionSummary = shallow(<SolutionSummary {...props} />);

    expect(solutionSummary).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const solutionSummary = shallow(<SolutionSummary {...props} />);

    expect(toJson(solutionSummary)).toMatchSnapshot();
  });

  it('Matches the current snapshot when the level is solved by default', () => {
    const solutionSummary = shallow(<SolutionSummary solution={[]} {...props} />);

    expect(toJson(solutionSummary)).toMatchSnapshot();
  });
});
