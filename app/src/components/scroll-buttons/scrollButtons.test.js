import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'test-utils';
import { StateMock } from '@react-mock/state';
import { AppContext } from '../app-context/AppContext.js';
import 'jest-dom/extend-expect';
import { ScrollButtons } from './ScrollButtons';

describe('ScrollButton tests', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup)

  const setCurrentSectionByButtons = jest.fn();

  const renderComponent = () => render(
    <ScrollButtons setCurrentSectionByButtons={setCurrentSectionByButtons}/>
  );
  
  it('should render correctly', () => {
    
    expect(container.firstChild).toMatchSnapshot();
  });
  
  // it('should change when hovering', () => {
  //   component.find('.up').simulate('mouseover');

  //   expect(component).toMatchSnapshot();
  // });

  // it('should handle clicks', () => {
  //   component.find('.up').simulate('click');
  //   component.find('.down').simulate('click');

  //   expect(setCurrentSectionByButtons).toHaveBeenCalled();
  //   expect(setCurrentSectionByButtons).toHaveBeenCalled();
  // });
  
});