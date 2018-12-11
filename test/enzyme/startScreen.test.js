import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ShotMeStartScreen from './../../src/components/shot-me/sections/ShotMeStartScreen'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('component: ShotMeStartScreen', () => {
  test('Links to gif preview screen', ()=>{
    const wrapper = shallow(<ShotMeStartScreen/>);
    expect(wrapper.exists()).toBe(true);
  });
});