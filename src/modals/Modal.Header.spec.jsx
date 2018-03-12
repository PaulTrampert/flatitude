import React from 'react';
import {shallow} from 'enzyme';
import Header from './Modal.Header.jsx';

describe('Modal.Header', () => {
  let subject;

  it("renders the title", () => {
    subject = shallow(<Header title="test" />);

    expect(subject.find('.modal-title').text()).toBe('test');
  });

  it('renders close button if requested', () => {
    subject = shallow(<Header showClose />);

    expect(subject.find('.close').type()).toBe('button');
  });

  it("doesn't render close if not requested", () => {
    subject = shallow(<Header />);

    expect(subject.find('.close').length).toBe(0);
  });

  it("binds onClose", () => {
    let onClose = () => {};
    subject = shallow(<Header showClose onClose={onClose}/>);

    expect(subject.find('.close').props().onClick).toBe(onClose);
  });
});