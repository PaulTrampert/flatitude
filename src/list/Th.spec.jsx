import React from 'react';
import {shallow} from 'enzyme';
import Th from './Th.jsx';

describe('Th', () => {
  let props;

  beforeEach(() => {
    props = {
      className: 'herp derp',
      arbitrary: 'prop'
    };
  });

  describe('render', () => {
    it('renders a th with the provided children', () => {
      let subject = shallow(<Th {...props}>derp</Th>);
      expect(subject.at(0).type()).toBe('th');
      expect(subject.at(0).text()).toBe('derp');
    });

    it('renders the provided className', () => {
      let subject = shallow(<Th {...props}>derp</Th>);
      expect(subject.at(0).props().className).toBe('herp derp');
    });

    it('passes through any other provided properties', () => {
      let subject = shallow(<Th {...props}>derp</Th>);
      expect(subject.at(0).props().arbitrary).toBe('prop');
    });

    it('binds handleClick to the onClick event of the th', () => {
      let subject = shallow(<Th></Th>);
      expect(subject.at(0).props().onClick).toBe(subject.instance().handleClick);
    });

    it('applies sortDirection as a className', () => {
      props.sortDirection = 'asc';
      let subject = shallow(<Th {...props}></Th>);
      expect(subject.at(0).props().className).toContain('asc');
    });

    describe('when the column is not sortable', () => {
      it('does not apply sorting classes', () => {
        let subject = shallow(<Th {...props}>derp</Th>);
        expect(subject.at(0).props().className).not.toContain('sortable');
      });
    });

    describe('when the column is sortable', () => {
      beforeEach(() => {
        props.onSort = () => {};
      });

      it('applies the sortable class', () => {
        let subject = shallow(<Th {...props}>derp</Th>);
        expect(subject.at(0).props().className).toContain('sortable');
      });
    });
  });

  describe('handleClick', () => {
    describe('when the column is sortable', () => {
      let subject;
      let instance;

      beforeEach(() => {
        props.onSort = jest.fn();
        props.name = 'derp';
        subject = shallow(<Th {...props}></Th>);
        instance = subject.instance();
      });

      describe('when the current sort direction is unset', () => {
        it('calls onSort with asc', () => {
          instance.handleClick();
          expect(props.onSort).toHaveBeenCalledWith('asc', 'derp');
        });
      });

      describe('when the current sort direction is asc', () => {
        it('calls onSort with desc', () => {
          subject.setProps({sortDirection: 'asc'});
          instance.handleClick();
          expect(props.onSort).toHaveBeenCalledWith('desc', 'derp');
        });
      });

      describe('when the current sort direction is desc', () => {
        it('calls onSort with asc', () => {
          props.sortDirection = 'desc';
          instance.handleClick();
          expect(props.onSort).toHaveBeenCalledWith('asc', 'derp');
        });
      });
    });
  });
});