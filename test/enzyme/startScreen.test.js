import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ShotMeStartScreen from './../../src/components/shot-me/sections/ShotMeStartScreen'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('component: ShotMeStartScreen', () => {
  test('Should check exists of ShotMeStartScreen', ()=>{
    const wrapper = shallow(<ShotMeStartScreen/>);
    expect(wrapper.exists()).toBe(true);
  });

  test('Should check two types of intro: loading and lack of internet', ()=> {
    const wrapper = shallow(<ShotMeStartScreen/>);
    const loadingText = wrapper.find('div').children().length;
    console.log(loadingText);

    expect(loadingText).toEqual(2);
  });
});