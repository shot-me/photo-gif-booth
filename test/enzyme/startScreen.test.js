import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ShotMeStartScreen from './../../src/components/shot-me/sections/ShotMeStartScreen'
import Adapter from 'enzyme-adapter-react-16';
import  config from './../config'

Enzyme.configure({adapter: new Adapter()});
window.config=config;

describe('component: ShotMeStartScreen', () => {
  test('Should check exists of ShotMeStartScreen', ()=>{
    const wrapper = shallow(<ShotMeStartScreen/>);
    expect(wrapper.exists()).toBe(true);
  });

  test('Should check two types of intro: loading and lack of internet', ()=> {
    const wrapper = shallow(<ShotMeStartScreen/>);
    const loadingText = wrapper.find('div').children().length;

    expect(loadingText).toEqual(2);
  });

  test('Should check state loading before and after calling checkConnection()', ()=> {
    const wrapper = shallow(<ShotMeStartScreen/>);
    const instance = wrapper.instance();
    expect(wrapper.state().loading).toEqual(true);  // before componentDidMount
    instance.componentDidMount();
    setTimeout(()=>expect(wrapper.state().loading).toEqual(false), 1000); // waiting for next interval
  });
});