import React from 'react';
import {shallow} from 'enzyme';
import RenderInBody from '../util/RenderInBody.jsx';
import Modal from './Modal.jsx';
import Header from './Modal.Header.jsx';
import Footer from './Modal.Footer.jsx';
import Body from './Modal.Body.jsx';

describe('Modal', () => {
  let subject;

  it('renders in body', () => {
    subject = shallow(<Modal/>);
    expect(subject.first().type()).toBe(RenderInBody);
  });

  it('exposes Header', () => {
    expect(Modal.Header).toBe(Header);
  });
  it('exposes Footer', () => {
    expect(Modal.Footer).toBe(Footer);
  });
  it('exposes Header', () => {
    expect(Modal.Body).toBe(Body);
  });
});