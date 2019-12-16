import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  mount(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  )
});
