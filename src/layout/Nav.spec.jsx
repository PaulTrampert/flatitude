import React from 'react';
import {shallow} from 'enzyme';
import Nav from './Nav.jsx';

describe('Nav', () => {

  it('adds the collapsed class to nav when collapsed', () => {
    let subject = shallow(<Nav collapsed className="some-class"></Nav>);

    expect(subject.find('nav').props().className).toEqual('some-class collapsed');
  });

  it("doesn't add the collapsed class when not collapsed", () => {
    let subject = shallow(<Nav className="some-class"></Nav>);

    expect(subject.find('nav').props().className).toEqual('some-class');
  });

  describe('children', () => {
    let subject;
    let linkOnClick;
    let requestCollapseHandler;

    beforeEach(() => {
      linkOnClick = jest.fn();
      requestCollapseHandler = jest.fn();
      subject = shallow(
        <Nav onRequestCollapse={requestCollapseHandler}>
          <a onClick={linkOnClick}>Some Link</a>
          <hr />
          <a href="#/somewhere">SomeOtherLink</a>
        </Nav>
      );
    });

    it('calls the original onClick handler of links', () => {
      let link = subject.childAt(0);
      link.simulate('click');
      expect(linkOnClick).toHaveBeenCalled();
    });

    it('does not request collapse for clicks on <hr /> elements', () => {
      let hr = subject.childAt(1);
      hr.simulate('click');
      expect(requestCollapseHandler).not.toHaveBeenCalled();
    });

    it('requests collapse when a link is clicked', () => {
      let link = subject.childAt(0);
      link.simulate('click');
      expect(requestCollapseHandler).toHaveBeenCalled();
      let link2 = subject.childAt(2);
      link2.simulate('click');
      expect(requestCollapseHandler).toHaveBeenCalledTimes(2);
    });
  });
});