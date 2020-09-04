import React from 'react';
import {shallow} from 'enzyme';
import Checkbox from './Checkbox.jsx';

describe('Checkbox', () => {
  let props;
  let subject;

  beforeEach(() => {
    props = {
      value: true,
      onChange: jest.fn(),
      disabled: true,
      indeterminate: true
    };

    subject = shallow(<Checkbox {...props}>label</Checkbox>);
  });

  it('binds value to the checked property of the checkbox', () => {
    expect(subject.find('input[type="checkbox"]').props().checked).toBe(props.value);
  });

  it('binds disabled to the disabled property of the checkbox', () => {
    expect(subject.find('input[type="checkbox"]').props().disabled).toBe(props.disabled);
  });

  it('binds handleChange to the onChange prop of the checkbox', () => {
    expect(subject.find('input[type="checkbox"]').props().onChange).toBe(subject.instance().handleChange);
  });

  describe('handleChange', () => {
    let event;
    beforeEach(() => {
      event = {
        target: {checked: true}
      };
    });

    it('calls the onChange prop with the new checked value', () => {
      subject.instance().handleChange(event);

      expect(props.onChange).toHaveBeenCalledWith(event.target.checked);
    });
  });
});