import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { store } from '../store';
import { Provider } from 'react-redux';

describe('rendering components', () => {
  it("renders App component without crashing", () => {
    shallow(<Provider store={store}><App /></Provider>)
  })
});
