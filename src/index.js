import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { applyMiddleware, createStore } from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { allReducers } from './reducers';
import { getAllUsers } from './Actions/usersActions';
import { getAllChannels } from './Actions/channelsActions';

const store = createStore(allReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getAllUsers())
store.dispatch(getAllChannels())

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);