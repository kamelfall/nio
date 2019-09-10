import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import BookingComponent from './BookingComponent';
import FormComponent from '../FormComponent/FormComponent';

configure({adapter: new Adapter()});

describe('BookingComponent', () => {
  
  it('should contain <FormComponent />', () => {
    const wrapper = shallow(<BookingComponent />);
    expect(wrapper.find(FormComponent)).toBeTruthy();
  })

  it('should call disableUnavailableDates function on mount', () => {
    const spy = jest.spyOn(BookingComponent.prototype, 'disableUnavailableDates');
    const wrapper = shallow(<BookingComponent />);
    wrapper.instance().disableUnavailableDates();
    expect(spy).toHaveBeenCalled();
  })
})

describe('getGuestId', () => {
  it('should be able to run', () => {
    const getGuestId = jest.fn(() => '33');
    getGuestId();
    expect(getGuestId).toHaveBeenCalled();
    expect(getGuestId).toHaveBeenCalledTimes(1);
    expect(getGuestId).toReturnWith('33');
  })
})