import React from 'react'
import axios from 'axios'
import {render, fireEvent, waitForElement} from '@testing-library/react';
import BookingComponent from './BookingComponent';

test('Fetch makes an API call and displays the greeting', async () => {
  const fakeAxios = {
    get: jest.fn(() => Promise.resolve({data: {greeting: 'hello there'}})),
  }
  const url = 'https://example.com/get-hello-there'
  //const {getByText, getByTestId} = render(<BookingComponent url={url} axios={fakeAxios} />)
  //fireEvent.click(getByText(/fetch/i))

  const greetingNode = await waitForElement(() => getByTestId('greeting'))

  expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  expect(fakeAxios.get).toHaveBeenCalledWith(url)
  expect(greetingNode).toHaveTextContent('hello there')
})