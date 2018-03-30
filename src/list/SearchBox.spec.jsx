import React from 'react';
import {shallow} from 'enzyme';
import SearchBoxLoader from 'inject-loader!./SearchBox.jsx';

describe('SearchBox', () => {
  let SearchBox;
  let window;
  let props;

  beforeEach(() => {
    props = {
      onChange: jasmine.createSpy('onChange'),
      onSearch: jasmine.createSpy('onSearch'),
      value: 'derp'
    };

    window = {
      setTimeout: jasmine.createSpy('setTimeout').and.returnValue({}),
      clearTimeout: jasmine.createSpy('clearTimeout')
    };

    SearchBox = SearchBoxLoader({
      '../util/window.js': window
    }).default;
  });

  describe("handleSearch", () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<SearchBox {...props} />);
    });

    it('fires the onSearch event', () => {
      subject.instance().handleSearch();
      expect(props.onSearch).toHaveBeenCalled();
    });

    describe("when an event is passed in", () => {
      it("calls preventDefault on the event", () => {
        let event = jasmine.createSpyObj(['preventDefault']);
        subject.instance().handleSearch(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });

    describe("when there is a pending timeout", () => {
      it("clears the pending timeout", () => {
        let timeout = {};
        subject.instance().timeout = timeout;
        subject.instance().handleSearch();
        expect(window.clearTimeout).toHaveBeenCalledWith(timeout);
        expect(subject.instance().timeout).not.toBeDefined();
      });
    });
  });

  describe('handleChange', () => {
    let event;
    let subject;

    beforeEach(() => {
      event = {
        target: {
          value: 'blorp'
        }
      };

      subject = shallow(<SearchBox {...props} />);
    });

    it('fires the onChange event with the new value', () => {
      subject.instance().handleChange(event);
      expect(props.onChange).toHaveBeenCalledWith(event.target.value);
    });

    describe('when autosearch is not enabled', () => {
      it('does not set a timeout', () => {
        subject.instance().handleChange(event);
        expect(window.setTimeout).not.toHaveBeenCalled();
        expect(subject.instance().timeout).not.toBeDefined();
      });
    });

    describe('when autosearch is enabled', () => {
      beforeEach(() => {
        subject.setProps({autosearch: true, autosearchDelayMs: 42});
      });

      it("sets a timeout", () => {
        subject.instance().handleChange(event);
        expect(window.setTimeout).toHaveBeenCalledWith(subject.instance().handleSearch, 42);
      });

      describe("when there is already a timeout pending", () => {
        let timeout;
        beforeEach(() => {
          subject.instance().handleChange(event);
          timeout = subject.instance().timeout;
        });

        it('clears the original timeout', () => {
          subject.instance().handleChange(event);
          expect(window.clearTimeout).toHaveBeenCalledWith(timeout);
        });

        it('sets a new timeout', () => {
          subject.instance().handleChange(event);
          expect(window.setTimeout).toHaveBeenCalledWith(subject.instance().handleSearch, 42);
        });
      });
    });
  });

  describe('render', () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<SearchBox {...props} />);
    });

    it("binds this.handleChange to the input's onChange event", () => {
      expect(subject.find('input').props().onChange).toBe(subject.instance().handleChange);
    });

    it("binds this.handleSearch to the form's onSubmit event", () => {
      expect(subject.find('form').props().onSubmit).toBe(subject.instance().handleSearch);
    });

    it("binds props.value to the input's value prop", () => {
      expect(subject.find('input').props().value).toBe(props.value);
    });
  });
});