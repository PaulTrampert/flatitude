import React from 'react';
import {shallow} from 'enzyme';
import AlertAction from './AlertAction.jsx';

describe('AlertAction', () => {
  let subject;
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    subject = shallow(<AlertAction label="herp" onClick={onClick} alertId={4} />);
  });

  describe('handleActionClick', () => {
    it('calls props.onClick with the action id', () => {
      subject.instance().handleActionClick();

      expect(onClick).toHaveBeenCalledWith({alertId: 4});
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('render', () => {

    it('renders the link', () => {
      expect(subject).toMatchSnapshot();
    });

    it('binds handleActionClick to the onClick event of the a tag', () => {
      expect(subject.find('a').props().onClick).toBe(subject.instance().handleActionClick);
    });
  });
});