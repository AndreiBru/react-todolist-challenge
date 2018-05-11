import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Input from './';

describe('Input', () => {
  it('renders and matches snapshot', () => {
    const comp = renderer.create(
      <Input
        name="email"
        value="name@gmail.com"
        placeholder="Your email address"
        className="one two"
      />,
    );

    expect(comp.toJSON()).toMatchSnapshot();
  });

  it('calls the onChange handler with the correct value', () => {
    const onChangeSpy = jest.fn();
    const comp = shallow(
      <Input
        name="email"
        value="name@gmail.com"
        placeholder="Your email address"
        className="one two"
        onChange={onChangeSpy}
      />,
    );

    const newValue = 'hey';

    expect(onChangeSpy).not.toHaveBeenCalled();

    comp.find('input').simulate('change', { target: { value: newValue } });

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith(newValue);
  });
});
