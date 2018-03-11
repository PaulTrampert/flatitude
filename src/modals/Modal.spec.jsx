import React from 'react';
import {shallow} from 'enzyme';
import RenderInBody from '../util/RenderInBody.jsx';
import Modal from './Modal.jsx';

describe('Modal', () => {
  let subject;

  it('renders in body', () => {
    subject = shallow(<Modal/>);
    expect(subject.first().type()).toBe(RenderInBody);
  });
});