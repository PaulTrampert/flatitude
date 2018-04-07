import React from 'react';
import {shallow} from 'enzyme';
import RadioButton from './RadioButton.jsx';

describe('RadioButton', () => {
  let props;
  let subject;

  beforeEach(() => {
    props = {
      value: 'somevalue',
      onChange: jasmine.createSpy('onChange'),
      disabled: true,
      selected: true
    };

    subject = shallow(<RadioButton {...props}>label</RadioButton>);
  });

  it('binds value to the value property of the RadioButton', () => {
    expect(subject.find('input[type="radio"]').props().value).toBe(props.value);
  });

  it('binds disabled to the disabled property of the RadioButton', () => {
    expect(subject.find('input[type="radio"]').props().disabled).toBe(props.disabled);
  });

  it('binds the selected property to the checked property of the RadioButton', () => {
    expect(subject.find('input[type="radio"]').props().checked).toBe(props.selected);
  });

  it('binds handleChange to the onChange prop of the RadioButton', () => {
    expect(subject.find('input[type="radio"]').props().onChange).toBe(subject.instance().handleChange);
  });

  describe('handleChange', () => {
    let event;
    beforeEach(() => {
      event = {
        target: {value: 'somevalue2'}
      };
    });

    it('calls the onChange prop with the new checked value', () => {
      subject.instance().handleChange(event);

      expect(props.onChange).toHaveBeenCalledWith(event.target.value);
    });
  });
});