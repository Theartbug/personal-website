import React from 'react';
import { shallow } from 'enzyme';
import { ScrollButtons } from './ScrollButtons';

describe('ScrollButton render tests', () => {
  const setCurrentSectionByButtons = jest.fn();
  const component = shallow(<ScrollButtons setCurrentSectionByButtons={setCurrentSectionByButtons}/>);
  
  it('should render correctly', () => {
    
    expect(component).toMatchSnapshot();
  });
  
  it('should change when hovering', () => {
    component.find('.up').simulate('mouseover');

    expect(component).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    component.find('.up').simulate('click');
    component.find('.down').simulate('click');

    expect(setCurrentSectionByButtons).toHaveBeenCalled();
    expect(setCurrentSectionByButtons).toHaveBeenCalled();
  });
  
});