import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { loadingBarMiddleware } from "react-redux-loading-bar";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, loadingBarMiddleware()))
);



ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider> , document.getElementById('root')
)