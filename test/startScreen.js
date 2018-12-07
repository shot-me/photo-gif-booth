import React from 'react';
import expect from 'expect';
import { Shallow } from 'enzyme';
import ShotMeStartScreen from './../src/components/shot-me/sections/ShotMeStartScreen'

describe('component: ShotMeStartScreen', () => {
  it('Links to gif preview screen', ()=>{
    const wrapper = Shallow(<ShotMeStartScreen/>).length
    expect(wrapper.find(ShotMeStartScreen)).toEqual(4);
  });
});