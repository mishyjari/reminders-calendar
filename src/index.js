import React from 'react';
import ReactDOM from 'react-dom';
import CalendarContainer from './components/Calendar.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './reducers/reducers.js';

ReactDOM.render(
  <Provider store={ createStore(reducer) }>
    <CalendarContainer />
  </Provider>,
  document.getElementById('root')
);

