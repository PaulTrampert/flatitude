import React from 'react';
import {shallow} from 'enzyme';
import Alert from './Alert.jsx';

describe('Alert', () => {

  describe('render', () => {
    describe('when actions are passed in', () => {
      let actions;

      beforeEach(() => {
        actions = [
          {
            label: 'herp',
            onClick: jest.fn()
          },
          {
            label: 'derp',
            onClick: jest.fn()
          }
        ];
      });

      it('renders the action links', () => {
        const subject = shallow(<Alert type="info" actions={actions}>hi</Alert>);
        expect(subject).toMatchSnapshot();
      });
    });

    it('renders info style', () => {
      const subject = shallow(<Alert type="info">hi</Alert>);
      expect(subject).toMatchSnapshot();
    });

    it('renders warning style', () => {
      const subject = shallow(<Alert type="warning">hi</Alert>);
      expect(subject).toMatchSnapshot();
    });

    it('renders danger style', () => {
      const subject = shallow(<Alert type="danger">hi</Alert>);
      expect(subject).toMatchSnapshot();
    });

    it('renders success style', () => {
      const subject = shallow(<Alert type="success">hi</Alert>);
      expect(subject).toMatchSnapshot();
    });

    it('renders primary style', () => {
      const subject = shallow(<Alert type="success">hi</Alert>);
      expect(subject).toMatchSnapshot();
    });
  });
});