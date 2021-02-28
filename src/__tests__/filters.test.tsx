import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, shallow } from 'enzyme';
import { Filters } from '../components/filters';

Enzyme.configure({ adapter: new Adapter() });

describe('Filters', () => {
  it('should render correctly', () => {
    shallow(<Filters onFilter={() => {}} />);
  });

  it('should execute onFilter on submit', () => {
    const onFilter = jest.fn((data) => {
      return data;
    });

    const wrapper = mount(<Filters onFilter={onFilter} />);
    const formEl = wrapper.find('#filters_form').at(0);
    formEl.simulate('submit');
    expect(onFilter).toBeCalledTimes(1);
  });
});
