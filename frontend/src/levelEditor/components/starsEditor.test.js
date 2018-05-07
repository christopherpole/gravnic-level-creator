import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { StarsEditor, ButtonDecrement, ButtonIncrement } from './starsEditor';

configure({ adapter: new Adapter() });

const props = {
  stars: [1, 2, 3],
  setStarsAction: () => {},
  previewing: false,
  movesMade: 0,
};

describe('<StarsEditor />', () => {
  it('Renders without exploding', () => {
    const starsEditor = shallow(<StarsEditor {...props} />);

    expect(starsEditor).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const starsEditor = shallow(<StarsEditor {...props} />);

    expect(toJson(starsEditor)).toMatchSnapshot();
  });

  it('Matches the current snapshot if some moves have been made', () => {
    const starsEditor = shallow(<StarsEditor {...props} movesMade={3} />);

    expect(toJson(starsEditor)).toMatchSnapshot();
  });

  it('Matches the current snapshot if entities are moving', () => {
    const starsEditor = shallow(<StarsEditor {...props} previewing />);

    expect(toJson(starsEditor)).toMatchSnapshot();
  });

  it('Fires the set stars action when clicking on the "decrement" button', () => {
    const setStarsSpy = spy();
    const starsEditor = shallow(<StarsEditor {...props} setStarsAction={setStarsSpy} />);
    starsEditor
      .find(ButtonDecrement)
      .at(1)
      .simulate('click');

    expect(setStarsSpy.calledOnce).toBe(true);
    expect(setStarsSpy.calledWith(1, props.stars[1] - 1)).toBe(true);
  });

  it('Fires the set stars action when clicking on the "increment" button', () => {
    const setStarsSpy = spy();
    const starsEditor = shallow(<StarsEditor {...props} setStarsAction={setStarsSpy} />);
    starsEditor
      .find(ButtonIncrement)
      .at(1)
      .simulate('click');

    expect(setStarsSpy.calledOnce).toBe(true);
    expect(setStarsSpy.calledWith(1, props.stars[1] + 1)).toBe(true);
  });
});
