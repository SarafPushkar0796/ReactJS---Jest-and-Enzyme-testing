import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';

// tells Enzyme what code to expect 'from react 17'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

// configure Enzyme to use the adapter
Enzyme.configure({ adapter: new Adapter() });

// making the code less repitetive
/**
 * Factory function to create ShallowWrapper for App component.
 * Is a function.
 * Takes parameter as {objects} for Components props.
 * And takes parametr as {any} for Initial state
 * Returns ShallowWrapper
*/
const setup = (props={}) => {
  
  // assign whatever props received and turn into individual props using the spread operator(...)
  const wrapper = shallow(<App {...props}/>);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given 'data-test' attribute.
 * Takes parameter 'wrapper' as {ShallowWrapper} which is Enzyme shallow wrapper to search.
 * Takes parameter 'val' as {string} which is value of 'data-test' attribute.
 * Returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

//  cleanup is passed as a parameter to afterEach to just clean up everything after each test to avoid memory leaks.
afterEach(cleanup);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app')

  // to find atleast one node with data-test attribute
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () =>{
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'btn-incr')

  // to find atleast one node with data-test attribute
  expect(button.length).toBe(1);
});

test('renders decrement button', () =>{
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'btn-decr')

  // to find atleast one node with data-test attribute
  expect(button.length).toBe(1);
});

test('renders counter display', () =>{
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'display-count');

  // to find atleast one node with data-test attribute
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () =>{  
  const initialCounterState = 0;  

  /**
   * since we cannot access the initial state of functional component
   * we mock the useState Hook
   */
  React.useState = jest.fn().mockReturnValue([initialCounterState, {}]);  
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () =>{
  const initialCount = 0;

  // passing initialCount as props
  const wrapper = setup({ initialCount });  

  // find button and click
  const button = findByTestAttr(wrapper, "btn-incr");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "display-count");
  expect(counterDisplay.text()).toContain(initialCount + 1);    
});
