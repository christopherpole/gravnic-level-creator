import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Grid } from './grid';
import { initialState as levelEditorInitialState } from '../../reducers/levelEditor';

configure({ adapter: new Adapter() });

describe('The editor grid', () => {
  it('Renders without exploding', () => {
    const grid = shallow(<Grid tiles={levelEditorInitialState.tiles} />);

    expect(grid).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const grid = shallow(<Grid tiles={levelEditorInitialState.tiles} />);

    expect(toJson(grid)).toMatchSnapshot();
  });
});
