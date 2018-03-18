import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button.jsx';

describe('Button', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<Button className="derp" type="primary" random="random">derp</Button>);
  });

  it('renders a button with the correct classes', () => {
    expect(subject.at(0).props().className).toBe('primary derp');
  });

  it('adds arbitrary properties to the button', () => {
    expect(subject.at(0).props().random).toBe('random');
  });

  it('renders the children', () => {
    expect(subject.text()).toBe('derp');
  });
}); 