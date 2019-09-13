import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure, mount} from 'enzyme';
import BookingComponent from './BookingComponent';
import FormComponent from '../FormComponent/FormComponent';
import Calendar from 'react-calendar';

configure({adapter: new Adapter()});

describe('BookingComponent', () => {
  
  it('should contain <FormComponent />', () => {
    const wrapper = shallow(<BookingComponent />);
    expect(wrapper.find(FormComponent)).toBeTruthy();
  })

  it('should contain <Calendar />', () => {
    const wrapper = shallow(<BookingComponent />);
    expect(wrapper.find(Calendar)).toBeTruthy();
  })

  it('should call disableUnavailableDates function on mount', async () => {
    const wrapper = mount(<BookingComponent />);
    const spy = jest.spyOn(BookingComponent.prototype, 'disableUnavailableDates');
    setTimeout(function(){ expect(spy).toHaveBeenCalled(); }, 300);
  })
})

describe('checkIfGuestAlreadyExists', () => {
  it('should run 1 time when submitBoocking function is called', async () => {
    let spy = jest.spyOn(BookingComponent.prototype, 'checkIfGuestAlreadyExists');
  
    const wrapper = shallow<BookingComponent>(<BookingComponent />);
    wrapper.instance().setState({
      dateString: "2019-09-20 00:00:00",
      form: {
        emailAddress: "mail",
        firstName: "för",
        lastName: "eft",
        phoneNumber: "000",
        time: "21:00"
      },
      seats: 2,
    })
    
    await wrapper.instance().submitBooking();

    expect(spy).toHaveBeenCalledTimes(1);
  })
})

describe('getGuestId', () => {
  it('should run 1 time when submitBoocking function is called', async () => {
    let spy = jest.spyOn(BookingComponent.prototype, 'getGuestId');
  
    const wrapper = shallow<BookingComponent>(<BookingComponent />);
    wrapper.instance().setState({
      dateString: "2019-09-20 00:00:00",
      form: {
        emailAddress: "mail",
        firstName: "för",
        lastName: "eft",
        phoneNumber: "000",
        time: "21:00"
      },
      seats: 2,
    })
    
    await wrapper.instance().submitBooking();

    expect(spy).toHaveBeenCalledTimes(1);
  })
})
