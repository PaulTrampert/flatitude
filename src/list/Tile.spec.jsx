import React from 'react';
import {shallow} from 'enzyme';
import Tile from './Tile.jsx';
import DropdownArea from '../util/DropdownArea.jsx';
import Checkbox from '../forms/Checkbox.jsx';

describe("Tile", () => {
  let props;
  beforeEach(() => {
    props = {
      children: 'hurrdeblerr'
    };
  });

  it('renders children in the tile body', () => {
    let subject = shallow(<Tile {...props} />);
    expect(subject.find('.tile-body').text()).toBe('hurrdeblerr');
  });

  describe('when no props are set', () => {
    it('does not render the header', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').length).toBe(0);
    });

    it('renders a div for the tile-body', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-body').type()).toBe('div');
    });
  });

  describe('when onClick is set', () => {
    beforeEach(() => {
      props.onClick = () => {};
    });

    it('renders an anchor for the tile-body', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-body').type()).toBe('a');
    });

    it("binds the anchor's onClick event", () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-body').props().onClick).toBe(props.onClick);
    });
  });

  describe('when onSelect is set', () => {
    beforeEach(() => {
      props.onSelect = jasmine.createSpy('onSelect');
      props.isSelected = true;
    });

    it('renders the tile-head', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').length).toBe(1);
    });

    it('renders a checkbox in tile-head', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').find(Checkbox).length).toBe(1);
    });

    it('binds the isSelected prop to the checkbox checked prop', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').find(Checkbox).props().value).toBe(true);
    });

    it('binds the onChange event of the checkbox', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').find(Checkbox).props().onChange).toBe(subject.instance().handleSelectorClick);
    });

    describe('handleSelectorClick', () => {
      it('calls onSelect with the value passed to handleSelectorClick', () => {
        let subject = shallow(<Tile {...props} />).instance();
        subject.handleSelectorClick(false);
        expect(props.onSelect).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('when actions is set', () => {
    beforeEach(() => {
      props.actions = [
        <a key="Action1">Action1</a>,
        <a key="Action2">Action2</a>
      ];
    });

    it('renders the tile-head', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').length).toBe(1);
    });

    it('renders a dropdown area in the tile-head', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').find(DropdownArea).length).toBe(1);
    });

    it('binds actions to the DropdownArea', () => {
      let subject = shallow(<Tile {...props} />);
      expect(subject.find('.tile-head').find(DropdownArea).props().dropdown).toBe(props.actions);
    });
  });
});