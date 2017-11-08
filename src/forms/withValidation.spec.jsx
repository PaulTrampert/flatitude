import withValidationInjector from 'inject-loader!./withValidation.jsx';
import jasmineAsync from '../testUtil/jasmineAsync.js';
import React from 'react';
import {shallow} from 'enzyme';

class FakeDebouncer {
  debounce(f) {
    return f();
  }
}

describe('withValidation', () => {
  let withValidation;

  beforeEach(() => {
    withValidation = withValidationInjector({
      '../util/Debouncer.js': FakeDebouncer
    }).default;
  });

  it('returns a component', () => {
    let result = withValidation("input");
    expect(typeof result).toBe('function');
  });

  describe('the returned component', () => {
    
    it('renders the wrapped component', () => {
      let Component = withValidation('input');
      let result = shallow(<Component />);
      expect(result.type()).toBe('input');
    });

    it('passes through undefined props', () => {
      let Component = withValidation('input');
      let result = shallow(<Component prop1="herp" prop2="derp" />);

      expect(result.find('input').props().prop1).toBe('herp');
      expect(result.find('input').props().prop2).toBe('derp');
    });

    it('passes the state as validationState to the wrapped component', () => {
      let Component = withValidation('input');
      let result = shallow(<Component />);

      expect(result.find('input').props().isSubmitting).toBe(result.state().isSubmitting);
      expect(result.find('input').props().needsValidation).toBe(result.state().needsValidation);
      expect(result.find('input').props().validating).toBe(result.state().validating);
      expect(result.find('input').props().validationErrors).toBe(result.state().validationErrors);
    });

    it("still calls the original onChange prop if passed", jasmineAsync(async () => {
      let Component = withValidation('input');
      let onChange = jasmine.createSpy('onChange');
      let subject = shallow(<Component onChange={onChange}/>);
      let event = {target:{value: 'herp'}};

      await subject.props().onChange(event);

      expect(onChange).toHaveBeenCalledWith(event);
    }));

    describe('validate', () => {
      let Component;
      let validator1;
      let validator2;
      let subject;
      beforeEach(() => {
        Component = withValidation('input');
        validator1 = jasmine.createSpy('validator1');
        validator2 = jasmine.createSpy('validator2');
        subject = shallow(<Component validators={[validator1, validator2]} value="herp" />);
      });

      it('calls each validator', jasmineAsync(async () => {
        await subject.instance().validate();

        expect(validator1).toHaveBeenCalledWith('herp');
        expect(validator2).toHaveBeenCalledWith('herp');
      }));

      it('returns the results of each validator', jasmineAsync(async () => {
        validator1.and.returnValue('error 1');
        validator2.and.returnValue(Promise.resolve('error 2'));

        let results = await subject.instance().validate();

        expect(results).toEqual(['error 1', 'error 2']);
      }));
    });
  });
});