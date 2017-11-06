import withValidation from './withValidation.jsx';
import jasmineAsync from '../testUtil/jasmineAsync.js';
import React from 'react';
import {shallow} from 'enzyme';

describe('withValidation', () => {
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

      expect(result.find('input').props().validationState).toBe(result.state());
    });

    it("validates the component's value onChange by default", jasmineAsync(async () => {
      let Component = withValidation('input');
      let validate = jasmine.createSpy('validate');
      let subject = shallow(<Component validators={[validate]}/>);

      await subject.props().onChange({target:{value: 'herp'}});

      expect(validate).toHaveBeenCalledWith('herp');
    }));

    it("still calls the original onChange prop if passed", jasmineAsync(async () => {
      let Component = withValidation('input');
      let onChange = jasmine.createSpy('onChange');
      let subject = shallow(<Component onChange={onChange}/>);
      let event = {target:{value: 'herp'}};

      await subject.props().onChange(event);

      expect(onChange).toHaveBeenCalledWith(event);
    }));

    describe('when the onChange event and valueProp are changed', () => {
      it("validates the component's validationValue onClick", jasmineAsync(async () => {
        let Component = withValidation('input', {
          validationEvent: 'onClick', 
          validationValue: 'checked'
        });
        let validate = jasmine.createSpy('validate');
        let subject = shallow(<Component validators={[validate]}/>);
  
        await subject.props().onClick({target:{checked: true}});
  
        expect(validate).toHaveBeenCalledWith(true);
      }));

      it ('still calls the passed in handler for the given event',jasmineAsync(async () => {
        let Component = withValidation('input', {
          validationEvent: 'onClick', 
          validationValue: 'checked'
        });
        let onClick = jasmine.createSpy('onClick');
        let event = {target: {checked: true}};
        let subject = shallow(<Component onClick={onClick} />);

        await subject.props().onClick(event);

        expect(onClick).toHaveBeenCalledWith(event);
      }));
    });

    describe('validate', () => {
      let Component;
      let validator1;
      let validator2;
      let onValidate;
      let subject;
      beforeEach(() => {
        Component = withValidation('input');
        validator1 = jasmine.createSpy('validator1');
        validator2 = jasmine.createSpy('validator2');
        onValidate = jasmine.createSpy('onValidate');
        subject = shallow(<Component onValidate={onValidate} validators={[validator1, validator2]} />);
      });

      it('calls each validator', jasmineAsync(async () => {
        await subject.instance().validate({target:{value: 'herp'}});

        expect(validator1).toHaveBeenCalledWith('herp');
        expect(validator2).toHaveBeenCalledWith('herp');
      }));

      it('sets the results of each validator in validationErrors', jasmineAsync(async () => {
        validator1.and.returnValue('error 1');
        validator2.and.returnValue(Promise.resolve('error 2'));

        await subject.instance().validate({target:{value: 'herp'}});

        expect(subject.state().validationErrors).toEqual(['error 1', 'error 2']);
      }));

      it('fires the onValidate prop with the validation results', jasmineAsync(async () => {
        validator1.and.returnValue('error 1');
        validator2.and.returnValue(Promise.resolve('error 2'));

        await subject.instance().validate({target:{value: 'herp'}});

        expect(onValidate).toHaveBeenCalledWith(['error 1', 'error 2']);
      }));
    });
  });
});