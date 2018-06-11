import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { SolverToolbar } from './SolverToolbar';

configure({ adapter: new Adapter() });

describe('<SolverToolbar />', () => {
  let props;

  beforeEach(() => {
    props = {
      editLevelAction: () => {},
      findQuickestSolutionAction: () => {},
      loading: false,
    };
  });

  it('Renders without exploding', () => {
    const solverToolbar = shallow(<SolverToolbar {...props} />);

    expect(solverToolbar).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const solverToolbar = shallow(<SolverToolbar {...props} />);

    expect(toJson(solverToolbar)).toMatchSnapshot();
  });

  it('Matches the current snapshot when loading', () => {
    const solverToolbar = shallow(<SolverToolbar loading {...props} />);

    expect(toJson(solverToolbar)).toMatchSnapshot();
  });

  it('Fires the "editLevel" action when the edit level button is clicked', () => {
    const editLevelSpy = spy();
    const solverToolbar = shallow(<SolverToolbar {...props} editLevelAction={editLevelSpy} />);
    const btnEditLevel = solverToolbar.find('#btn-edit');

    expect(editLevelSpy.calledOnce).toBe(false);
    btnEditLevel.simulate('click');
    expect(editLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the "findQuickSolution" action when the edit level button is clicked', () => {
    const findQuickestSolutionSpy = spy();
    const solverToolbar = shallow(
      <SolverToolbar {...props} findQuickestSolutionAction={findQuickestSolutionSpy} />,
    );
    const btnfindQuickestSolution = solverToolbar.find('#btn-find-quickest-solution');

    expect(findQuickestSolutionSpy.calledOnce).toBe(false);
    btnfindQuickestSolution.simulate('click');
    expect(findQuickestSolutionSpy.calledOnce).toBe(true);
  });
});
