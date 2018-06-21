import React from 'react';
import { MOVE_UP, MOVE_DOWN } from 'gravnic-game';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { SolutionStatus } from './solutionStatus';

configure({ adapter: new Adapter() });

describe('<SolutionStatus />', () => {
  let props;

  beforeEach(() => {
    props = {
      solution: null,
      loading: false,
      error: false,
    };
  });

  it('Renders without exploding', () => {
    const level = shallow(<SolutionStatus {...props} />);

    expect(level).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const level = shallow(<SolutionStatus {...props} />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot when loading', () => {
    const level = shallow(<SolutionStatus {...props} loading />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot when a solution is present', () => {
    const level = shallow(<SolutionStatus {...props} solution={[MOVE_UP, MOVE_DOWN]} />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot when a solution of length 0 is present', () => {
    const level = shallow(<SolutionStatus {...props} solution={[]} />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot when a level is unsolvable', () => {
    const level = shallow(<SolutionStatus {...props} solution={false} maxMoves={5} />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot when loading', () => {
    const level = shallow(<SolutionStatus {...props} loading />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot when there is an error', () => {
    const level = shallow(<SolutionStatus {...props} error />);

    expect(toJson(level)).toMatchSnapshot();
  });
});
