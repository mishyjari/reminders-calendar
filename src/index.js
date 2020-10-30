import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './reducers/reducers.js';
import './stylesheets/style.min.css';

ReactDOM.render(
  <Provider store={ createStore(reducer) }>
    <Calendar />
  </Provider>,
  document.getElementById('root')
);

