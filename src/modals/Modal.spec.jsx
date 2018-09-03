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

  it('renders the modal as a div by default', () => {
    subject = shallow(<Modal />);
    expect(subject.find("div[className='modal']").length).toBe(1);
  });

  it('renders the modal as passed in modalComponent if given', () => {
    subject = shallow(<Modal modalElement='h1' />);
    expect(subject.find(".modal").type()).toBe('h1');
  });

  it('renders passthrough props on the modal', () => {
    subject = shallow(<Modal prop1="herp" prop2="derp" />);

    expect(subject.find('.modal').props()).toEqual(jasmine.objectContaining({
      prop1: 'herp',
      prop2: 'derp'
    }));
  });

  it('concatenates classnames on the modal', () => {
    subject = shallow(<Modal className="floop" />);

    expect(subject.find('.modal').props().className).toBe('modal floop');
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