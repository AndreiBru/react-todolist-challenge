import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Button from './';

const types = ['add', 'edit', 'default'];

describe('Button', () => {
  types.forEach(type => {
    it(`renders and matches snapshot for type=${type}`, () => {
      const comp = renderer.create(
        <Button type={type}>Button type {type}</Button>,
      );

      expect(comp.toJSON()).toMatchSnapshot();
    });
  });

  it('calls the onClick handler', () => {
    const onClickSpy = jest.fn();
    const comp = shallow(
      <Button type="edit" onClick={onClickSpy}>
        Click me
      </Button>,
    );

    expect(onClickSpy).not.toHaveBeenCalled();
    comp.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
